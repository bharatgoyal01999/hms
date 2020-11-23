import React ,{useState,useEffect}  from 'react';
import {View,ScrollView,TouchableOpacity, Modal,Image,Button} from 'react-native'
import Colors from  '../../Theme/Color'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ficon from 'react-native-vector-icons/FontAwesome5'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Text} from 'react-native-elements'
import * as firebase from 'firebase'
import { Container, Header, Content, Form, Item, Input, Label , Textarea} from 'native-base';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import PatientHistory from './PatientHistory'
import ImagePicker from 'react-native-image-picker'

import BandData from './bmodules';

const PatientBasicInfo=(Info)=>{

   


    // const path_patient_info=firebase.database().ref('Patients')
    // path_patient_info.on('value', datasnap=>{
    //     if(datasnap.val()){
    //         console
    //         setPersonalInfo(datasnap.val());
    //     }
    // })
    // console.log(personalInfo)




    const Textstyles={
        fontSize:widthPercentageToDP("5%"),
        fontWeight:'bold'
        
    }

    return (
        <View style={{flex:0.15 , elevation:3, borderWidth:2,padding:5,borderColor:Colors.backgroundBlue ,justifyContent:'space-between', flexDirection:'row'}}>
           <View>
            <View style={{flexDirection:'row'}}>
                <Text style={Textstyles}>Name: </Text>
                <Text style={Textstyles}>{Info.Name}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={Textstyles}>Gender: </Text>
    <Text style={Textstyles} >{Info.Gender}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={Textstyles}>Age: </Text>
    <Text style={Textstyles}>{Info.Age}</Text>
            </View>
            </View>
            <View  >
                <Ficon name='history' color='blue' size={widthPercentageToDP("10%")} onPress={Info.onTouch} />
            </View>
        </View>
    );
}

export default class Treatment extends React.Component {

    state={
        Temp:'',
        HeartRate:'',
        Priscription:'',
        Problem:'',
        Bp:'',
        Name:'',
        Age:'',
        Gender:'',
        loding:true,
        personalInfo:{},
        Uid:'',
        historyModal:false,
        PriscriptionImage:null,
        imagePreview:false
        
    }

componentDidMount=async ()=>{
    await AsyncStorage.getItem("UID").then(val=>this.setState({Uid:val}))
    const AadharNumber=this.props.AadharNumber;
    const path_patient_info=firebase.database().ref('Patients').child(AadharNumber).child('personalInfo')
   await path_patient_info.on('value', datasnap=>{
        if(datasnap.val()){
            // console.log(datasnap.val())
            this.setState({personalInfo:datasnap.val()});
        }
    })
    var year=new Date;
    year=year.getFullYear()
    var Age= year-Number(this.state.personalInfo['DOB'].slice(0,4))
  

    var personalInfo=this.state.personalInfo
    personalInfo.Age=Age
    this.setState({personalInfo:personalInfo})
  

}

    syncWithBand=()=>{
        console.log("Start")
        this.setState({loding:true})

            try {
              var {
                HeartRate
              } = await BandData.measure();
          
              console.log(HeartRate);
            } catch (e) {
              console.error(e);
            }
          
        
        //setTimeout(()=>{
          //  this.setState({Temp:'97.5 F', HeartRate: '75 bpm', Bp:'90/60mmHg',loding:false})
        //},2000)
    }


    uploadPriscription=  async ()=>{
        const options = {
            title: 'Select Priscriptions',
          
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        ImagePicker.showImagePicker(options, async (response) => {
            // Same code as in above section!
            console.log('Response = ', response);
 
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };
 
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      PriscriptionImage: source,
     });
     const today=new Date;
     var key;
   
     const date=today.getFullYear().toString()+(today.getMonth()+1).toString()+today.getDate().toString()
     const  uri = this.state.PriscriptionImage.uri;
     console.log(uri)
    //  const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const res = await fetch(uri)
    // console.log(res)
    const blob=await res.blob();
         var storageRef = firebase.storage().ref()
         const finalref=storageRef.child('Priscription/'+date.toString()+this.props.AadharNumber.toString())
    //      // Create file metadata including the content type
        
     var metadata = {
     contentType: 'image/jpeg',
     };
     
    finalref.put(blob, metadata).then(snapshot=>{
        console.log(blob)
         let upLodingRatio=snapshot.bytesTransferred/snapshot.totalBytes
           console.log(upLodingRatio)
        //  this.setState({upLodingRatio})
 
     }).catch((err)=>{
     console.log(err)
     alert(err)
     });
   

  }
          });


    }
    
addPatientInfo=()=>{
      
        const today=new Date;
        var key;
      
        const date=today.getFullYear().toString()+(today.getMonth()+1).toString()+today.getDate().toString()
        const time=today.getHours().toString()+today.getMinutes().toString()
       console.log(date)

        const Doc_Patient_Path=firebase.database().ref('Doctor').child(this.state.Uid).child('PatientInfo').child(date)
        const push=Doc_Patient_Path.push();
        key=push.key
        Doc_Patient_Path.child(key).set(this.props.AadharNumber)
        .catch(err=>alert(err))

        const Patient_path=firebase.database().ref('Patients').child(this.props.AadharNumber).child('History').child(date).child(time)
        Patient_path.set({
            Symtoms:this.state.Problem,
            Priscription:this.state.Priscription,
            Temp:this.state.Temp,
            BP:this.state.Bp,
            HeartRate:this.state.HeartRate,
            DoctorId:this.state.Uid,
            RelationKey:key
        }).then(val=>
            Actions.DocScreen())
}

    render(){
    return (
        <ScrollView
        style={{flex:1}}
        >
            <View style={{flex:0.1,backgroundColor:Colors.backgroundBlue, alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'white', fontSize:widthPercentageToDP("10%")}} >Priscription</Text>
            </View>
            <PatientBasicInfo Name={this.state.personalInfo.Name} Age={this.state.personalInfo.Age} Gender={this.state.personalInfo.Gender} onTouch={()=>{this.setState({historyModal:true})}}/>
            <View style={{marginTop:heightPercentageToDP("3%"),flex:0.75}}>
                <Text onPress={this.syncWithBand} style={{color:'blue'}}>Sync With Band!!</Text>
                <View style={{position:'relative',width:widthPercentageToDP("100%"), marginTop:heightPercentageToDP("5%")}}>

             <Form>

             <Form>
            <Textarea rowSpan={3} onChangeText={(val)=>{this.setState({Problem:val})}} bordered placeholder="Problem/Comments"  style={{marginBottom:heightPercentageToDP("2%")}}/>
          </Form>
            <Item> 

             <Icon  size={20} name='thermometer' color={'blue'}/>

              <Input placeholder={'Temp'} onChangeText={(val)=>{this.setState({Temp:val})}} value={this.state.Temp} />

            </Item>

            <Item >
                
            <Icon size={20}name='heart' color={'red'} />
           
            <Input  placeholder={'Heart Rate'} onChangeText={(val)=>{this.setState({HeartRate:val})}} value={this.state.HeartRate}/>

            </Item>

            <Item >
                
            <Micon size={20} name='blood-bag' color={'purple'} />
           
            <Input  placeholder={'Blood Pressure'} value={this.state.Bp}/>

            </Item>
         
            <Form>
            <Textarea rowSpan={5} onChangeText={(val)=>{this.setState({Priscription:val})}} bordered placeholder="Notes" />
          </Form>

            </Form>  
            <TouchableOpacity 
            style={{flexDirection:'row',
            marginBottom:heightPercentageToDP("3%"),
            marginTop:heightPercentageToDP("3%"),
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            borderColor:'#077A4B',
            marginHorizontal:widthPercentageToDP("2%")
            }}
            onPress={this.uploadPriscription}
            >
            <Ficon name='camera' color={'#077A4B'} size={widthPercentageToDP("8%")} />
                <Text style={{fontSize:widthPercentageToDP("6%")}}>Upload  Priscriptions</Text>
        </TouchableOpacity>
                </View>
                <TouchableOpacity  
                    
                    style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, marginTop:10,width:120,height:40}} onPress={this.addPatientInfo}  >
  <Text style={{color:'white'}} h4>Add</Text> 
  </TouchableOpacity>
            </View>

            <Modal visible={this.state.historyModal} onRequestClose={()=>this.setState({historyModal:false})} animationType='slide' >
<PatientHistory AadharNumber={this.props.AadharNumber} personalInfo={this.state.personalInfo}/>
            </Modal>

            <Modal visible={this.state.imagePreview}>
{/* <View></View */}

    <View
     style={{flex:0.15,
    alignItems:'center',
    justifyContent:'space-evenly',
    backgroundColor:'#077A4B'
    }}>
    <Text style={{color:'white', fontSize:widthPercentageToDP("5%")}}>Preview</Text></View>
   
            <Image style={{flex:0.7,
            width:widthPercentageToDP("100%"),
                height:heightPercentageToDP("60%")}} source={this.state.PriscriptionImage} resizeMode={'contain'} />
                <Button color='#077A4B' title={'Done'} style={{marginTop:heightPercentageToDP("2%")}}  
                onPress={()=>{

                    this.setState({imagePreview:false})
                }}
                />
            </Modal>

        </ScrollView>
    );}
}
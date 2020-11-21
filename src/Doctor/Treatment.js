import React ,{useState,useEffect}  from 'react';
import {View,ScrollView,TouchableOpacity, Modal} from 'react-native'
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
    console.log(Age)
    var personalInfo=this.state.personalInfo
    personalInfo.Age=Age
    this.setState({personalInfo:personalInfo})
    console.log(this.state.personalInfo)

}

    syncWithBand=()=>{
        console.log("Start")
        this.setState({loding:true})
        setTimeout(()=>{
            this.setState({Temp:'97.5 F', HeartRate: '75 bpm', Bp:'90/60mmHg',loding:false})
        },2000)
    }
    
addPatientInfo=()=>{
      
        const today=new Date;
        var key;
        const date=today.getFullYear().toString()+today.getMonth().toString()+today.getDate().toString()
        const time=today.getHours().toString()+today.getMinutes().toString()
        console.log(time)
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

                </View>
                <TouchableOpacity  
                    
                    style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, marginTop:10,width:120,height:40}} onPress={this.addPatientInfo}  >
  <Text style={{color:'white'}} h4>Add</Text> 
  </TouchableOpacity>
            </View>

            <Modal visible={this.state.historyModal} onRequestClose={()=>this.setState({historyModal:false})} animationType='slide' >
<PatientHistory AadharNumber={this.props.AadharNumber} personalInfo={this.state.personalInfo}/>
            </Modal>

        </ScrollView>
    );}
}
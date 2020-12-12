import React, { Component } from 'react';
import { Container, Header, Input,Left, Body, Right, Button, Icon, Title ,Drawer} from 'native-base';
import {View,Image,ScrollView,Modal,StyleSheet,TouchableOpacity,Switch} from 'react-native'

import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome5'

import { Avatar, Accessory ,Text} from 'react-native-elements';
import Colors from '../../Theme/Color'
import ActivityTile from './Components/ActivityTile'
import * as firebase from 'firebase'
import MedicalHistory from './MedicalHistory'
import * as backend from '../backend/backend_handling'
import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import GoogleFit , { Scopes } from 'react-native-google-fit';
import * as Gfit from '../backend/GoogleFit'

export default class HeaderIconExample extends Component {
  state={
    display:'flex',
    name:null,
    weight:null,
    targetWeight:null,
    height:null,
    caloryNeededToBurn:null,
    caloryBuredToday:null,
    PreviousRecord:{},
    ifLoginUser:false,
    AadharNo:null,
    hasAadhar:false,
    Histoy:{},
    ShowHistoryPage:false,
    AskAadhar:false,
    Name:null,
    isAuthrised:false,
    GoogleFitData:{},
  }
  componentDidMount=async ()=>{
    await fetch('http://192.168.0.13:1234/getUrlTing').then(response=>{
       console.log(response)
     }).catch(err=>console.log(err))
    GoogleFit.checkIsAuthorized().then(() => {
      console.log(GoogleFit.isAuthorized)
      this.setState({isAuthorized:GoogleFit.isAuthorized}) // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
  })

        

    var UID;
   await AsyncStorage.getItem("UID").then(val=>{
      if(val){
       
        UID=val
      }
      
    })
    console.log(UID)
    const path_ref=firebase.database().ref("User").child(UID).child("personalInfo");
    path_ref.on("value",dataSnap=>{
      if(dataSnap.val()){
      var data=dataSnap.val();
      console.log(dataSnap.val())
    
      if (Number(dataSnap.val().weight)-Number(dataSnap.val().expectedWeight)>4){
        AsyncStorage.setItem("IsOverWeight",'true')
        AsyncStorage.setItem("NeededCal",((Number(data.NeededCal.ModeratlyActive)+Number(data.NeededCal.Sedentary))/2).toString())
      }
      else{
        AsyncStorage.setItem("IsOverWeight",'false')
        AsyncStorage.setItem("NeededCal",((Number(data.NeededCal.ModeratlyActive)+Number(data.NeededCal.Active))/2).toString())
      }
      AsyncStorage.setItem("weight",dataSnap.val().weight)
      AsyncStorage.setItem("Age",dataSnap.val().Age)

      AsyncStorage.setItem("ExpectedWeight",dataSnap.val().expectedWeight.toString())
      this.setState({
        name:dataSnap.val().Name
      })}
    })
    this.checkAadhar();
  }


getMedicalHistoryFromAadhar=async()=>{
  console.log("No")
  var path=firebase.database().ref('Patients').child(this.state.AadharNo).child('History')
  await path.on('value',dataSnap=>{
    if(dataSnap.val()){
      console.log(dataSnap.val())
      this.setState({Histoy:dataSnap.val(),ShowHistoryPage:true})
    }
  })
}


prdictWeight=(gender,height)=>{

 /* var FemaleData=[];
  var path=firebase.database().ref('WeightHeight/Female')
  await path.on('value',data=>{
    if(data.val()){
      console.log("HIi")
          FemaleData=data.val()
    }
  })
// console.log(FemaleData)
var height=[];
var weight=[];
FemaleData.forEach(item=>{
  height.push(item.Height*2.54);
  weight.push(item.Weight*0.4535);
})
//Linear Regression
var hw=0,h=0,w=0,hs=0
var n=height.length
for(var i=0; i<height.length ;i++){

  hw+=height[i]*weight[i];
  h+=height[i];
  w+=weight[i];
  hs+=height[i]*height[i];

}
const slope=(hw-((h*w)/n))/(hs-((h*h)/n))


const intercept= w/n-(slope*(h/n))
console.log(slope,intercept)
var predicted_weight=slope*155+intercept;
console.log(predicted_weight);

var Male=[];
var path=firebase.database().ref('WeightHeight/Male')
  await path.on('value',data=>{
    if(data.val()){
      console.log("HIi")
          Male=data.val()
    }
  })

// console.log(FemaleData)
var height=[];
var weight=[];
Male.forEach(item=>{
  
  height.push(item.Height*2.54);
  weight.push(item.Weight*0.4535);
})

//Linear Regression
// console.log(weight)
var hw=0,h=0,w=0,hs=0
var n=height.length
for(var i=0; i<height.length ;i++){

  hw+=height[i]*weight[i];
  h+=height[i];
  w+=weight[i];
  hs+=height[i]*height[i];

}
const slope1=(hw-((h*w)/n))/(hs-((h*h)/n))


const intercept1= w/n-(slope1*(h/n))
console.log(slope1,intercept1)
var predicted_weight=slope1*155+intercept1;
console.log(predicted_weight);*/


if (gender=='Female'){
  return 1.0701969054470157*height - 111.56701601604621
}
else{
  return 1.0644348125020215*height - 101.81022425996534
}
}


checkAadhar=async ()=>{
var User=await firebase.auth().currentUser;
var path=firebase.database().ref('User').child(User['uid']).child('personalInfo')
path.on('value',dataSnap=>{
  if(dataSnap.val()['Aadhar']){
    console.warn(dataSnap.val())
    this.setState({AadharNo:dataSnap.val()['Aadhar'],hasAadhar:true,Name:dataSnap.val()['Name']})
  }
  else{
    this.setState({Name:dataSnap.val()['Name']})
  }

})
  }
  render() {
  
    return (
      <Container>
  
        <Header style={{backgroundColor:Colors.backgroundBlue, height:hp("8%")}}>
       <Left>
         <Ficon name={'notes-medical'} color='white' size={wp("7%")} onPress={()=>{
           this.state.hasAadhar ? this.getMedicalHistoryFromAadhar() : this.setState({AskAadhar:true})
         }}/>
       </Left>
          <Body>
    <Title>{"Hii "+ this.state.name  }</Title>
          </Body>
          <Right>
         
     <Ficon name='user-alt' color='white' size={wp("7%")} onPress={()=>{firebase.auth().signOut();
     AsyncStorage.setItem("UID",'')
     Actions.Home();
    }
    }/>
          </Right>
        </Header>
        <View style={{ alignItems:'center',flexDirection:'row',justifyContent:'flex-start', height:hp("6%")}}>
          <Image resizeMode={'contain'} style={{width:wp("8%"), height:hp("6%")}} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/6/60/Google-Fit-Icon.png"}} />
        <Text style={{fontSize:wp("5%")}} onPress={()=>{
            Gfit.isAuthorized()
        }}>Google-Fit</Text>
<Switch style={{marginLeft:wp("50%")}} value={this.state.isAuthrised} onChange={async ()=>{
  if(this.state.isAuthrised){
    GoogleFit.unsubscribeListeners();
  }
  else{
    Gfit.isAuthorized()
  }
}}  />
          </View>
         <ScrollView style={{flex:1}}>
          <ActivityTile title={'Medicine Reminders'} Icon={<Ficon name='pills' color='#1285EA' size={wp("7%")} data="" />}
             onTouch={()=>{Actions.MR()}}
          />
          <ActivityTile title={'calories gain'} Icon={<Ficon name='fire' color='#F56E04' size={wp("7%")} />}
       onTouch={()=>Actions.CaloryCounter()}
          data=""
          />
          <ActivityTile title={'calories burn'} Icon={<Ficon name='fire' color={'#F52104'} size={wp("7%")}/>} onTouch={()=>{console.log("rr")}}  data={''} />
          <ActivityTile title={'walked-step'} Icon={<Ficon name='walking' color={'#379026'} size={wp("7%")}/>} onTouch={()=>{console.log("rr")}} data={""}/>
          <ActivityTile title={'sleep'} Icon={<Ficon name='moon' color={'purple'} size={wp("7%")}/>} onTouch={()=>{console.log("rr")}} data={""}/>
          <ActivityTile title={'Weight Log'} Icon={<Ficon name='weight' color={'#FB03B0'} size={wp("7%")}/>} onTouch={()=>{
            Actions.WeightLogs()
          }}  data=''/>
          </ScrollView>
        <Modal visible={this.state.ShowHistoryPage}  onRequestClose={()=>this.setState({ShowHistoryPage:false})}>
<MedicalHistory AadharNumber={this.state.AadharNo} Name={this.state.Name}/>
        </Modal>
        <Modal visible={this.state.AskAadhar} transparent onRequestClose={()=>this.setState({AskAadhar:false})}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={{
                        backgroundColor:Colors.backgroundBlue, 
                        width:wp("70%"), 
                        height:hp("40%"),
                        borderRadius:wp("2%"),
                        justifyContent:'center',
                        alignItems:'center'
                        }}>
                            <Text style={{color:'white', fontSize:wp("5%")}} > Enter Aadhar Number </Text>
                            <Input value={this.state.AadharNo} style={styles.UserText} keyboardType='number-pad'  maxLength={12} onChangeText={(AadharNo)=>{this.setState({AadharNo})}}/> 
                           <TouchableOpacity 
                           style={{justifyContent:'center', 
                           alignItems:'center',
                            borderColor:'white',
                            borderWidth:1, 
                            width:wp("40%"),
                            height:hp("5%"),
                             marginBottom:hp("3%")}}
                             onPress={()=>{
                              var User=firebase.auth().currentUser;
                              var path=firebase.database().ref('User').child(User['uid']).child('personalInfo/Aadhar')
                             path.set(this.state.AadharNo)
                               this.setState({hasAadhar:true,AskAadhar:false,ShowHistoryPage:true})}}
                             >
                            <Text style={{color:'white', fontSize:wp("5%")}}>Ok</Text></TouchableOpacity>
                    </View>
                    </View>
        </Modal>
      </Container>
    );
  }
}
const styles= StyleSheet.create({

  UserText:{
      color:'white',
      fontSize:wp("7%"),
      width:wp("60%"),
      height:hp("0%"),
      marginVertical:hp("10%"),
      alignSelf:'center',
      borderWidth:wp("0.5%"),
      borderColor:'white',
      borderRadius:wp("2%"),
      padding:wp("2%")
  }  ,})
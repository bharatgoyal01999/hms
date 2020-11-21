import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Drawer} from 'native-base';
import {View,Image,ScrollView} from 'react-native'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome5'
import Mcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Ionicons'
import { Avatar, Accessory ,Text} from 'react-native-elements';
import Colors from '../../Theme/Color'
import ActivityTile from './Components/ActivityTile'
import * as firebase from 'firebase'

import * as backend from '../backend/backend_handling'
import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
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
  }
  componentDidMount=async ()=>{
    

    var UID;
   await AsyncStorage.getItem("UID").then(val=>{
      if(val){
       
        UID=val
      }
      
    })
    console.log(UID)
    const path_ref=firebase.database().ref("User").child(UID).child("personalInfo");
    path_ref.on("value",dataSnap=>{
      console.log(dataSnap.val())
      this.setState({
        name:dataSnap.val().Name
      })
    })
  }
  render() {
  
    return (
      <Container>
  
        <Header style={{backgroundColor:Colors.backgroundBlue, height:hp("8%")}}>
       <Left>
         <Ficon name={'notes-medical'} color='white' size={wp("7%")}/>
       </Left>
          <Body>
    <Title>{"Hii "+ this.state.name  }</Title>
          </Body>
          <Right>
         
     <Ficon name='user-alt' color='white' size={wp("7%")} />
          </Right>
        </Header>
        <View style={{ alignItems:'center',flexDirection:'row',justifyContent:'flex-start', height:hp("6%")}}>
          <Image resizeMode={'contain'} style={{width:wp("8%"), height:hp("6%")}} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/6/60/Google-Fit-Icon.png"}} />
        <Text style={{fontSize:wp("5%")}}>Google-Fit</Text>
          </View>
         <ScrollView style={{flex:1}}>
          <ActivityTile title={'Medicine Reminders'} Icon={<Ficon name='pills' color='#1285EA' size={wp("7%")} />}
             onTouch={()=>{Actions.Reminders()}}
          />
          <ActivityTile title={'calories gain'} Icon={<Ficon name='fire' color='#F56E04' size={wp("7%")}/>}
       
          
          />
          <ActivityTile title={'calories burn'} Icon={<Ficon name='fire' color={'#F52104'} size={wp("7%")}/>}/>
          <ActivityTile title={'walked-step'} Icon={<Ficon name='walking' color={'#379026'} size={wp("7%")}/>}/>
          <ActivityTile title={'sleep'} Icon={<Mcon name='sleep' color={'purple'} size={wp("7%")}/>}/>
          <ActivityTile title={'Weight Loss'} Icon={<Ficon name='weight' color={'#FB03B0'} size={wp("7%")}/>}/>
          </ScrollView>
        
      </Container>
    );
  }
}
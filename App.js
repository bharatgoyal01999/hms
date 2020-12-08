import 'react-native-gesture-handler'
import React from 'react'
import {View ,Text,Button, TouchableOpacity,StyleSheet} from 'react-native'
import Home from './src/Home'
import DocRegister from './src/Doctor/Register'
import DocLogin from './src/Doctor/Login'
import DocScreen from './src/Doctor/DocScreen'
import {Scene, Router } from 'react-native-router-flux'
import FingerPrint from './src/Doctor/docScreenComp/FingerPrint'
import  NewPatientReg from './src/Doctor/NewPatientRegistration'
import Treatment from './src/Doctor/Treatment'
import UserHome from './src/Users/Home'
import UserRegister from './src/Users/Register'
import UserLogin from './src/Users/LoginIn'
import MedicineReminder from './src/Users/Activities/MedicineReminder'
import Calories from './src/Users/Activities/Calories'
import Reminders from './src/Users/Activities/Reminders'
import Config from './config'
import WeightLogs from './src/Users/Activities/WeightLoss'
import localNotificationService from './src/backend/LocalNotificationService'
import fcmService from './src/backend/FCMService'
import MR from './src/Users/Activities/MedicineReminder'
import * as firebase from 'firebase'
// import Call from './src/backend/CallPushNotification'



import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'


firebase.initializeApp(Config);

export default class App extends React.Component {

  componentDidMount=()=>{

       
         fcmService.registerAppWithFCM()
         fcmService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)
        localNotificationService.scheduleNotifications('Hi there how you doing',2020,11,7,14,50,0,0)
        // localNotificationService.showNotification(1,'helooo', '6666')
        function onRegister(token) {
            console.log("[App] onRegister: ",token)
        }

        function onNotification(notify) {
            console.log("[App] onNotification: ",notify)
            const options = {
                soundName: 'default',
                playSound: true
            }
            localNotificationService.showNotifiaction(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }

        function onOpenNotification(notify) {
            console.log("[App] onOpenNotification: ",notify)
            alert("Open Notification: " + notify.body)
        }

        return () => {
            console.log("[App] unRegister")
            fcmService.unRegister()
            localNotificationService.unRegister()
        }
  }


// // console.log(FemaleData)
// var height=[];
// var weight=[];
// Male.forEach(item=>{
  
//   height.push(item.Height*2.54);
//   weight.push(item.Weight*0.4535);
// })

// //Linear Regression
// // console.log(weight)
// var hw=0,h=0,w=0,hs=0
// var n=height.length
// for(var i=0; i<height.length ;i++){

//   hw+=height[i]*weight[i];
//   h+=height[i];
//   w+=weight[i];
//   hs+=height[i]*height[i];

// }
// const slope1=(hw-((h*w)/n))/(hs-((h*h)/n))


// const intercept1= w/n-(slope1*(h/n))
// console.log(slope1,intercept1)
// var predicted_weight=slope1*155+intercept1;
// console.log(predicted_weight);
// // console.log(hw,h,w,hs)
render(){

  return (
 

    // <Router>
    //   <Scene key="root">
    //   <Scene key='Home' component={Home} title='Home' initial hideNavBar />
    //   <Scene key='DocReg' component={DocRegister} hideNavBar  />
    //   <Scene key='DocLogin' component={DocLogin} hideNavBar />
    //   <Scene key='DocScreen' component={DocScreen} hideNavBar />      
    //   <Scene key='NewPatient' component={NewPatientReg} hideNavBar />
    //   <Scene key='Treatment' component={Treatment} hideNavBar />
    
    //   </Scene>
    //   </Router>
  

    <Router>
      <Scene key="root">
      <Scene key='Home' component={Home} title='Home' initial hideNavBar />
      <Scene key='DocReg' component={DocRegister} hideNavBar  />
      <Scene key='DocLogin' component={DocLogin} hideNavBar />
      <Scene key='DocScreen' component={DocScreen} hideNavBar />      
      <Scene key='NewPatient' component={NewPatientReg} hideNavBar />
      <Scene key='Treatment' component={Treatment} hideNavBar />
      <Scene key='UserHome' component={UserHome} hideNavBar />
      <Scene key='UserReg' component={UserRegister} hideNavBar />
      <Scene key='UserLogin' component={UserLogin} hideNavBar />
      <Scene key='Reminders' component={Reminders} hideNavBar />
      <Scene key='WeightLogs' component={WeightLogs} hideNavBar />
      <Scene key='MR' component={MR} hideNavBar />
      <Scene key='CaloryCounter' component={Calories} hideNavBar />
      </Scene>
      </Router>
    // <></>
   

    )

}

}


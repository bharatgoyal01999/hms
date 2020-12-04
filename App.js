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
import WeightLoss from './src/Users/Activities/WeightLoss'
// import fs from 'fs'r
import * as firebase from 'firebase'


import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'


export default class App extends React.Component{

componentDidMount=async ()=>{
  // AsyncStorage.setItem('date','');
  // AsyncStorage.setItem('TodaySelectedItem','');
// var FemaleData=[];
//   var path=firebase.database().ref('WeightHeight/Female')
//   await path.on('value',data=>{
//     if(data.val()){
//       console.log("HIi")
//           FemaleData=data.val()
//     }
//   })
// // console.log(FemaleData)
// var height=[];
// var weight=[];
// FemaleData.forEach(item=>{
//   height.push(item.Height*2.54);
//   weight.push(item.Weight*0.4535);
// })
// //Linear Regression
// var hw=0,h=0,w=0,hs=0
// var n=height.length
// for(var i=0; i<height.length ;i++){

//   hw+=height[i]*weight[i];
//   h+=height[i];
//   w+=weight[i];
//   hs+=height[i]*height[i];

// }
// const slope=(hw-((h*w)/n))/(hs-((h*h)/n))


// const intercept= w/n-(slope*(h/n))
// console.log(slope,intercept)
// var predicted_weight=slope*155+intercept;
// console.log(predicted_weight);

// var Male=[];
// var path=firebase.database().ref('WeightHeight/Male')
//   await path.on('value',data=>{
//     if(data.val()){
//       console.log("HIi")
//           Male=data.val()
//     }
//   })

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

}
  render(){

  return (
    <MedicineReminder />

    // <Router>
    //   <Scene key="root">
    //   <Scene key='Home' component={Home} title='Home' initial hideNavBar />
    //   <Scene key='DocReg' component={DocRegister} hideNavBar  />
    //   <Scene key='DocLogin' component={DocLogin} hideNavBar />
    //   <Scene key='DocScreen' component={DocScreen} hideNavBar />      
    //   <Scene key='NewPatient' component={NewPatientReg} hideNavBar />
    //   <Scene key='Treatment' component={Treatment} hideNavBar />
    //   <Scene key='UserHome' component={UserHome} hideNavBar />
    //   <Scene key='UserReg' component={UserRegister} hideNavBar />
    //   <Scene key='UserLogin' component={UserLogin} hideNavBar />
    //   <Scene key='Reminders' component={Reminders} hideNavBar />
    //   <Scene key='WeightLoss' component={WeightLoss} hideNavBar />
    //   <Scene key='CaloryCounter' component={Calories} hideNavBar />
    //   </Scene>
    //   </Router>
    // <></>
   

    )

}
}
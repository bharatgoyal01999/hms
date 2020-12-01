import 'react-native-gesture-handler'
import React from 'react'
import {View ,Text,Button, TouchableOpacity,StyleSheet} from 'react-native'
import Home from './src/Home'
import DocRegister from './src/Doctor/Regishetr'
import DocLogin from './src/Doctor/Login'
import DocScreen from './src/Doctor/DocScreen'
import {Scene, Router } from 'react-native-router-flux'
import FingerPrint from './src/Doctor/docScreenComp/FingerPrint'
import  NewPatientReg from './src/Doctor/NewPatientRegistration'
import Treatment from './src/Doctor/Treatment'
import Fitness from './src/Users/Fitness'
import UserRegister from './src/Users/Register'
import UserLogin from './src/Users/LoginIn'

// import fs from 'fs'r
import * as firebase from 'firebase'
import Call from './src/backend/CallPushNotification'


import Config from './config'
import Axios from 'axios'

// firebase.initializeApp(Config);
export default class App extends React.Component{


  render(){

  return (
 

    <Router>
      <Scene key="root">
      <Scene key='Home' component={Home} title='Home'  hideNavBar />
      <Scene key='DocReg' component={DocRegister} hideNavBar  />
      <Scene key='DocLogin' component={DocLogin} hideNavBar />
      <Scene key='DocScreen' component={DocScreen} hideNavBar />      
      <Scene key='NewPatient' component={NewPatientReg} hideNavBar />
      <Scene key='Treatment' component={Treatment} hideNavBar />
      <Scene key='PushNotification' component={Call} hideNavBar initial />
      </Scene>
      </Router>
   

    )

}
}
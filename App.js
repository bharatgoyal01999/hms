import 'react-native-gesture-handler'
import React from 'react'
import {View ,Text,Button, TouchableOpacity,StyleSheet} from 'react-native'
import Home from './src/Home'
import DocRegister from './src/Doctor/Regishetr'
import DocLogin from './src/Doctor/Login'
import {Scene, Router } from 'react-native-router-flux'

export default class App extends React.Component{
  render(){
  return (
    <Router>
      <Scene key="root">
      <Scene key='Home' component={Home} title='Home' initial hideNavBar />
      <Scene key='DocReg' component={DocRegister} hideNavBar  />
      <Scene key='DocLogin' component={DocLogin} hideNavBar />
      </Scene>
      </Router>

    )

}
}
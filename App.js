import React from 'react'
import {View ,Text,Button} from 'react-native'
import Head from './Head'
export default class App extends React.Component{
  render(){
  return (
    <View>
    
   <Head /> 
   <Button title='Press ME' ></Button></View>
  );
}}
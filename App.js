import React from 'react'
import {View ,Text,Button, TouchableOpacity,StyleSheet} from 'react-native'
import Head from './Head'
export default class App extends React.Component{
  render(){
  return (
    <View style={{flex:1, justifyContent:"center" ,backgroundColor:'#05022A',flexDirection:'row', alignItems:'center'}}>
      <View>
<TouchableOpacity style={styles.button} onPress={()=>{console.log("login As Doc")}}>
  <Text numberOfLines={2} style={styles.buttonTxt}>Doctor Login</Text>
</TouchableOpacity>
      </View>
<View>
<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonTxt}>Patient Login</Text>
</TouchableOpacity>
</View>
    </View>
  );
}}

const styles= StyleSheet.create({
  button:{
      backgroundColor:'#065D96',
      margin:10,
      elevation:5,
      width:180,
      height:100,
      padding:5,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:50

  },
  buttonTxt:{
    color:'white',
    fontSize:25,
    fontWeight:'bold'

  }

})
import React from 'react'
import {View ,Text,Button, TouchableOpacity,StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import {Actions } from 'react-native-router-flux'

export default class Home extends React.Component{
  render(){
  return (
<View style={{flex:1, justifyContent:"center" ,backgroundColor:'#05022A',flexDirection:'row', alignItems:'center'}}>
    <View>
   
<TouchableOpacity style={styles.button} onPress={()=>{ Actions.DocLogin() } }>
  <Text numberOfLines={2} style={styles.buttonTxt}>Doctor Login</Text>
</TouchableOpacity>
      </View>
<View>
<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonTxt} onPress={()=>Actions.Fitness()}>Patient Login</Text>
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
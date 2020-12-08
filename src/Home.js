import React from 'react'
import {View ,Text,Button, TouchableOpacity,StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'

import * as firebase from 'firebase'
import {Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'



export default class Home extends React.Component{

  state={
    isUserLogin:false,
    
  }
  componentDidMount=()=>{

    AsyncStorage.getItem("UID").then( async (val)=>{
      if(val){
        console.log(val)
        AsyncStorage.getItem("ISDoctor").then(vall=>{

          if (vall==='true'){
            Actions.DocScreen()
          }
          else if(vall==='false'){
            Actions.UserHome()
          }
        })
      
      }
      else{
        console.log(val)
      }
    })

  }
  render(){
  return (
<View style={{flex:1, justifyContent:"center" ,backgroundColor:'#05022A',flexDirection:'row', alignItems:'center'}}>
    <View>
   
<TouchableOpacity style={styles.button} onPress={()=>{ {

  
        Actions.DocLogin()
      

    } } }>
  <Text numberOfLines={2} style={styles.buttonTxt}>Doctor Login</Text>
</TouchableOpacity>
      </View>
<View>
<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonTxt} onPress={()=>
    {
     
        Actions.UserLogin()
      
    }
    }>Patient Login</Text>
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

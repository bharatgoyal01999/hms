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
    firebase.auth().onAuthStateChanged(user=>{
     if(user){
      var path=firebase.database().ref('User/'+user['uid']+"/personalInfo")
      path.on('value',data=>{
        // AsyncStorage.setItem("Profile",data.val())
      })
      this.setState({isUserLogin:true})
      AsyncStorage.setItem('UID',user.uid)
     }
    })
  }
  render(){
  return (
<View style={{flex:1, justifyContent:"center" ,backgroundColor:'#05022A',flexDirection:'row', alignItems:'center'}}>
    <View>
   
<TouchableOpacity style={styles.button} onPress={()=>{ {

      if(this.state.isUserLogin){
        Actions.DocScreen()
      }

      else{
        Actions.DocLogin()
      }

    } } }>
  <Text numberOfLines={2} style={styles.buttonTxt}>Doctor Login</Text>
</TouchableOpacity>
      </View>
<View>
<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonTxt} onPress={()=>
    {
      if(this.state.isUserLogin){
        Actions.UserHome()
      }
      else{
        Actions.UserLogin()
      }
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
import React from 'react'
import {View, ScrollView, TouchableOpacity , Modal} from 'react-native' ;
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input ,Text, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {handleLogin}  from '../backend/backend_handling'
import * as backend from '../backend/backend_handling'
import Colors from '../../Theme/Color'
import * as firebase from 'firebase'
export default class LogIn extends React.Component{
   constructor(props){
       super(props)
       this.state={
        Email:null,
        Password:null,
        showPass:true,
        loginModal:true
    
       }
  
   }

   /*handleLogin= async ()=>{
  
   await firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password)
   .then(()=>{
     const user=firebase.auth().currentUser;
    console.log(user.uid)
    if(user){
      AsyncStorage.setItem("UID",user.uid)
      this.setState({loginModal:false});
      Actions.DocScreen()
    }})
   .catch((e)=>alert(e))
    
  
    }*/
   
    componentDidMount=()=>{
        this.setState({loginModal:true})
    }

    render(){
       
    return (
    <View style={{flex:1 ,width:'100%'}}>

        <View style={{flex:0.15, backgroundColor:Colors.backgroundBlue,alignItems:'center'}}>
            <Text h3 style={{color:'white'}} > Hey, How You Doing</Text>
            <Text h4 style={{color:'white'}}>Please Login</Text>
        </View>
        <View style={{flex:0.5}} />
        <View style={{flex:0.35, backgroundColor:'#06314d',borderTopLeftRadius:150, borderTopRightRadius:150 }} />
       
        <Modal transparent visible={this.state.loginModal}>
        <View style={{width:300, alignSelf:'center', marginTop:270, elevation:5, borderRadius:20, paddingTop:20, height:300,backgroundColor:Colors.backgroundBlue}}>
<Input placeholder='Email' 
style={{alignItems:'center'}} 
onChangeText={val=>this.setState({Email:val})}
 keyboardType={'email-address'} 
 
 />



 <Input
  placeholder='Password' secureTextEntry={this.state.showPass}
  onChangeText={val=>this.setState({Password:val})}
  />



<TouchableOpacity  style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, width:120,height:40}}  onPress={async ()=>{
  console.log('Register')
  var {Email,Password}=this.state

  AsyncStorage.getItem("UID").then(val=>{
  if(val){
    this.setState({loginModal:false})
    Actions.UserHome();
  }
})

}}

>
  <Text style={{color:'white'}} h4>LogIn</Text> 
  </TouchableOpacity>
<Text 
style={{alignSelf:'center', fontSize:20, color:'white', marginTop:20}} 
onPress={()=>{
    this.setState({loginModal:false})
    Actions.UserReg();

   

}}

> Create new account!! </Text>
 </View>
 </Modal>
    </View>

    );
}

}
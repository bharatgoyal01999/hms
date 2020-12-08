import React from 'react'
import {View, TouchableOpacity ,ScrollView, Modal} from 'react-native' ;
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input ,Text, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {handleLogin}  from '../backend/backend_handling'
import {widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen'

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

   handleLogin= async ()=>{
  
   await firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password)
   .then(()=>{
     const user=firebase.auth().currentUser;
    console.log(user.uid)
    if(user){
      AsyncStorage.setItem("UID",user.uid)
      AsyncStorage.setItem("ISDoctor",'true')
      this.setState({loginModal:false});
      Actions.DocScreen()
    }})
   .catch((e)=>alert(e))
    

    }
  
    componentDidMount=()=>{
        this.setState({loginModal:true})
    }

    render(){
       
    return (
    <View style={{flex:1 ,width:'100%'}}>

        <View style={{flex:0.15, backgroundColor:Colors.backgroundBlue,alignItems:'center'}}>
            <Text h3 style={{color:'white'}} > Hello Doctor</Text>
            <Text h4 style={{color:'white'}}>Please Login</Text>
        </View>
        <View style={{flex:0.5}} />
        <View style={{flex:0.35, backgroundColor:'#06314d',borderTopLeftRadius:150, borderTopRightRadius:150 }} />
       
        <Modal transparent visible={this.state.loginModal}>
     
        <View style={{width:wp("70%"), alignSelf:'center', marginTop:hp("40%"), elevation:5, borderRadius:wp("5%"), paddingTop:hp("2%"), height:hp("40%"),backgroundColor:Colors.backgroundBlue,position:'relative'}}>
          <ScrollView>
<Input placeholder='Email' 
color={'white'}
style={{alignItems:'center'}} 
onChangeText={val=>this.setState({Email:val})}
 keyboardType={'email-address'} 
 
 />



 <Input
  placeholder='Password' secureTextEntry={this.state.showPass} color={'white'}
  onChangeText={val=>this.setState({Password:val})}
  />



<TouchableOpacity  style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, width:120,height:40}}  onPress={()=>{console.log('Register')}}
onPress={() => { const {Email,Password}=this.state; 
this.handleLogin({Email,Password});
this.setState({loginModal:false});}}
>
  <Text style={{color:'white'}} h4>LogIn</Text> 
  </TouchableOpacity>
<Text 
style={{alignSelf:'center', fontSize:20, color:'white', marginTop:20}} 
onPress={()=>{
    this.setState({loginModal:false})
    Actions.DocReg();

   

}}

> Create new account!! </Text>
</ScrollView>
 </View>
 </Modal>
    </View>

    );
}

}
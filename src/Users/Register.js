import React from 'react'
import {View, AsyncStorage, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native' ;
import { Input ,Text, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Colors from '../../Theme/Color'
import { firebase } from '@firebase/app';
import '@firebase/auth';
import * as backend from '../backend/backend_handling'

import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';



export default class Register extends React.Component{

 state={
        Name:null,
        Age:null,
        weight:null,
        height:null,
        Phone:null,
        Password:null,
        ConfirmPass:null,
        showPass:true,
        Email:null,
        loading:false,
        display:'none',

    }

    /*handleDocReg= async ()=>{
    
      const Email=this.state.Email;
      const Pass=this.state.Password;
      if(Email && Pass) {
      this.setState({loading:true,display:'flex'})

      await firebase.auth().createUserWithEmailAndPassword(Email,Pass).
      then(()=>{
          const user=firebase.auth().currentUser;
          if(user){
            AsyncStorage.setItem("UID",user.uid);
            const path_ref=firebase.database().ref('/Doctor').child(user.uid).child('personalInfo')
            console.log(path_ref)
            const Personal_Info={
              Name:this.state.Name ,
              Email:this.state.Email,
              LicenseNumber:this.state.License,
              Speciality:this.state.Speciality,
              Phone: this.state.Phone,
            }
            path_ref.set(Personal_Info).
            then(()=>{
              this.setState({loading:false,display:'none'})
              Actions.DocScreen()
            })
            .catch((e)=>alert(e))
          }
      }).catch((e)=>alert(e));
    
    }
      else{
        alert("Email and Password must be provide")
      }
    }*/

   
    render(){
    return (
    <View style={{flex:1}}>
        <View style={{flex:0.18, backgroundColor:Colors.backgroundBlue,alignItems:'center'}}>
            <Text h3 style={{color:'white'}} > Welcome</Text>
            <Text h4 style={{color:'white'}}>Please Register</Text>
        </View>
        <ScrollView style={{flex:1,}}>
<Input placeholder='Name' style={{alignItems:'center'}} onChangeText={val=>this.setState({Name:val})} />

<Input
  placeholder='Age(yyyy-mm-dd)'
  keyboardType='number-pad'
  onChangeText={val=>this.setState({Age:val})}
  />

<Input placeholder='weight(In kgs)' 
onChangeText={val=>this.setState({weight:val})}/>
<Input placeholder='Height(In cms)' 
onChangeText={val=>this.setState({height:val})}/>
<Input placeholder='Mobile Number'
  maxLength={10}
  
  style={{fontSize:20}}
  keyboardType={"number-pad"} 
  onChangeText={val=>this.setState({Phone:val})}/>
  <Input placeholder='Email'
  style={{fontSize:20}}
  keyboardType={"email-address"} 
  onChangeText={val=>this.setState({Email:val})}/>

 <Input
  placeholder='Set Password' secureTextEntry={this.state.showPass}
  onChangeText={val=>this.setState({Password:val})}
  />


<Input
  placeholder='Confirm Password' secureTextEntry={this.state.showPass} 
  onChangeText={val=>this.setState({ConfirmPass:val})}
  />
<TouchableOpacity  style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, width:120,height:40}} 
 onPress={()=> { const {Email,Password,Age,height,weight,Phone,Name}=this.state; 
  backend.registerUser({Email,Password,Name,Age,weight,height,Phone});
  this.setState({loading:false,display:'none'});}}>
  <Text style={{color:'white'}} h4>Register</Text> 
  </TouchableOpacity>

 </ScrollView>

    
        
    </View>

    );
}

}
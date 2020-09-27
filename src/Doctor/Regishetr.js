import React from 'react'
import {View, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native' ;
import { Input ,Text, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Colors from '../../Theme/Color'
import Icon from 'react-native-vector-icons/Entypo';

export default class Register extends React.Component{
    
    state={
        Name:null,
        License:null,
        Speciality:null,
        Phone:null,
        Password:null,
        ConfirmPass:null,
        showPass:false

    }

   
    render(){
    return (
    <View style={{flex:1}}>
        <View style={{flex:0.18, backgroundColor:Colors.backgroundBlue,alignItems:'center'}}>
            <Text h3 style={{color:'white'}} > Welcome Doctor</Text>
            <Text h4 style={{color:'white'}}>Please Register</Text>
        </View>
        <ScrollView style={{flex:1,}}>
<Input placeholder='Name' style={{alignItems:'center'}} onChangeText={val=>this.setState({Name:val})} />

<Input
  placeholder='License Number'
  onChangeText={val=>this.setState({License:val})}
  />

<Input placeholder='Speciality' 
onChangeText={val=>this.setState({Speciality:val})}/>
<Input placeholder='Mobile Number'
  style={{fontSize:20}}
  keyboardType={"number-pad"} 
  onChangeText={val=>this.setState({Phone:val})}/>

 <Input
  placeholder='Set Password' secureTextEntry={this.state.showPass}
  onChangeText={val=>this.setState({Password:val})}
  />


<Input
  placeholder='Confirm Password' secureTextEntry={this.state.showPass} 
  onChangeText={val=>this.setState({ConfirmPass:val})}
  />
<TouchableOpacity  style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, width:120,height:40}}  onPress={()=>{console.log('Register')}}>
  <Text style={{color:'white'}} h4>Register</Text> 
  </TouchableOpacity>

 </ScrollView>
       
        
    </View>

    );
}

}
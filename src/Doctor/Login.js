import React from 'react'
import {View, AsyncStorage, ScrollView, TouchableOpacity , Modal} from 'react-native' ;
import { Input ,Text, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Colors from '../../Theme/Color'
export default class LogIn extends React.Component{
   constructor(props){
       super(props)
       this.state={
        Phone:null,
        Password:null,
        showPass:false,
        loginModal:true
    
       }
       Actions.refresh({})
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
        <View style={{width:300, alignSelf:'center', marginTop:270, elevation:5, borderRadius:20, paddingTop:20, height:300,backgroundColor:Colors.backgroundBlue}}>
<Input placeholder='Number' style={{alignItems:'center'}} onChangeText={val=>this.setState({Phone:val})} />



 <Input
  placeholder='Password' secureTextEntry={this.state.showPass}
  onChangeText={val=>this.setState({Password:val})}
  />



<TouchableOpacity  style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, width:120,height:40}}  onPress={()=>{console.log('Register')}}
onPress={()=>{console.log("LOGIN");
  this.setState({loginModal:false});
  Actions.DocScreen()
  }}
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
 </View>
 </Modal>
    </View>

    );
}

}
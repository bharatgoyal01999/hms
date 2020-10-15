import React , {useState}from 'react';
import {View, Text,  TouchableOpacity, ScrollView} from 'react-native'
import Colors from '../../Theme/Color'
import {Input, CheckBox} from 'react-native-elements'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
// import {AsyncStorage} from '@react-native-community/async-storage'

export default ()=>{
var [name,setName]=useState("")
var [dob,setDob]=useState("")
var [Phone,setPhone]=useState("")
var [gender, setGender]=useState("")
var [Email,setEmail]=useState('')


const registerPatient= async()=>{
var DocId;
// await AsyncStorage.getItem('UID').then(val=>{DocId=val});
const Path=firebase.database().ref('/Patient')
const Push_Path=Path.push()
const patient_key=(await Push_Path).key
Path.child(patient_key).child("personalInfo").set({
    Name: name,
    DOB:dob,
    Gender:gender,
    Phone:Phone,
    Email:Email,

}).then(()=>console.log("Data has been uploded"),Actions.Treatment())

}
return (
    <View style={{flex:1}}>
        <View style={{flex:0.5,backgroundColor:Colors.backgroundBlue, justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white', fontSize:widthPercentageToDP("10%")}}>Personal Info</Text>
        </View>
    <ScrollView>
        <Input placeholder='Name'
  style={{fontSize:20}}
  onChangeText={val=>setName(val)}/>
  <Input placeholder='DOB(yyyy-mm-dd)'
  style={{fontSize:20}}
  onChangeText={val=>setDob(val)}/>
  <Input placeholder='Phone'
  style={{fontSize:20}}
  keyboardType={'name-phone-pad'}
  onChangeText={val=>setPhone(val)}/>
   <Input placeholder='Email'
  style={{fontSize:20}}
  keyboardType={'email-address'}
  onChangeText={val=>setEmail(val)}/>
  <View>
  <Text style={{marginLeft:10, fontSize:20}}>Gender</Text>
  <CheckBox title='Male'  checkedColor={Colors.backgroundBlue} checked={gender==='Male'} onPress={()=>setGender('Male')}/>
  <CheckBox title='Female' checkedColor={Colors.backgroundBlue} checked={gender==='Female'} onPress={()=>setGender("Female")}/>
  <CheckBox title='Others'  checkedColor={Colors.backgroundBlue} checked={gender==='Others'} onPress={()=>setGender('Others')}/>
  </View>
  

    </ScrollView>
    <TouchableOpacity  style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, width:120,height:40,justifyContent:'center'}} onPress={registerPatient} >
  <Text style={{color:'white',alignSelf:'center'}} h4>Register</Text> 
  </TouchableOpacity>
    </View>
)}

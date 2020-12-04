import React, { PureComponent ,useEffect,useState} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage'

export default ()=>{
    var [ExpectedWeight,setExpectedWeight]=useState(' ');

    useEffect(() => {

       AsyncStorage.getItem("ExpectedWeight").then(val=>setExpectedWeight(val))
    

    },[])


const LogScreen= <View style={{flex:1,width:wp("100%")}} on>

   <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#FB03B0'}}>
       <Text style={{color:'white', fontSize:wp("10%")}}>Weight Logs</Text>
       <Text style={{color:'white', fontSize:wp("6%")}}>{'Ideal Weight:'+(Number(ExpectedWeight.slice(0,3))-Number(4))+"-"+(Number(ExpectedWeight.slice(0,3))+Number(4))}</Text>
       <View style={{height:hp("10%")}} />
       <View style={{flexDirection:'row', width:wp("80%"),justifyContent:'space-between',alignItems:'space-between'}}>
           <View style={{borderBottomWidth:wp("1%"),borderBottomColor:'white'}}>
           <Text style={{color:'white', fontSize:wp("8%")}}>
               Logs
           </Text></View>
           <View>
           <Text style={{color:'white', fontSize:wp("8%")}}>
               Update 
           </Text></View> 
       </View>
   </View>
   
   <View  style={{flex:0.9}} >
       <View style={{flex:0.5}}></View>
       <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity style={styles.ControllerContainer} >
               <Text style={styles.ControllerText}>-</Text>
               </TouchableOpacity>
   <TextInput  value={"65"+' Kg'} style={{
   alignSelf:'center',
   marginHorizontal:20,
   borderRadius:20,
   width:wp("30%"),
   borderWidth:3,
   textAlign:'center',
   borderColor:'#FB03B0',
   fontWeight:'bold',
   fontSize:wp("6%")
   }} />
   <TouchableOpacity style={styles.ControllerContainer}><Text style={styles.ControllerText}>+</Text></TouchableOpacity>
   </View>
   
   </View>
   </View>

const UpdateScreen=<View style={{flex:1,width:wp('100%')}}>

<View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#FB03B0'}}>
    <Text style={{color:'white', fontSize:wp("10%")}}>Weight Logs</Text>
    <Text style={{color:'white', fontSize:wp("6%")}}>{'Ideal Weight:'+(Number(ExpectedWeight.slice(0,3))-Number(4))+"-"+(Number(ExpectedWeight.slice(0,3))+Number(4))}</Text>
    <View style={{height:hp("11%")}} />
    <View style={{flexDirection:'row', width:wp("80%"),justifyContent:'space-between',alignItems:'space-between'}}>
        <View style={{width:wp("40%")}} >
        <Text style={{color:'white', fontSize:wp("8%")}}>
            Logs
        </Text></View>
        <View style={{borderBottomWidth:wp("1%"),borderBottomColor:'white'}}>
        <Text style={{color:'white', fontSize:wp("8%")}}>
            Update 
        </Text></View> 
    </View>
</View>

<View  style={{flex:0.9}} >
    <View style={{flex:0.5}}></View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={styles.ControllerContainer} >
            <Text style={styles.ControllerText}>-</Text>
            </TouchableOpacity>
<TextInput  value={"65"+' Kg'} style={{
alignSelf:'center',
marginHorizontal:20,
borderRadius:20,
width:wp("30%"),
borderWidth:3,
textAlign:'center',
borderColor:'#FB03B0',
fontWeight:'bold',
fontSize:wp("6%")
}} />
<TouchableOpacity style={styles.ControllerContainer}><Text style={styles.ControllerText}>+</Text></TouchableOpacity>
</View>

</View>
</View>


return (
<FlatList
initialNumToRender={1}
horizontal
data={[LogScreen,UpdateScreen]}
renderItem={({item})=>{
    return item;
}}

></FlatList>
)
}




var styles=StyleSheet.create({
ControllerText:{
    fontSize:wp("6%"),
    fontWeight:'bold'
}   ,
ControllerContainer:{
    borderWidth:2,
    borderColor:'#FB03B0',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:wp("20%"),
    width:wp("10%")
}
})
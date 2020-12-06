import React, { PureComponent ,useEffect,useState} from 'react'
import {View,Text,TextInput,StyleSheet,Image,TouchableOpacity,FlatList,ScrollView} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Econ from 'react-native-vector-icons/Entypo'
import Header from './Header'
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage'


const Logs=({Weight ,Date})=>{




    return (
    <View
    style={{flex:0.15,height:hp("10%"), elevation:2, marginVertical:hp("2%"), marginHorizontal:wp("2%")}}
    >
<View style={{flex:1, flexDirection:'row', alignItems:'center', borderWidth:1,borderRadius:wp("2%")}}>
    <Image style={{height:hp("9%"), width:wp("25%"), borderRadius:wp("1.5%") }} resizeMode={'contain'}  
    source={{uri:"data:image/jpeg;base64,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"}} >

    </Image>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',padding:wp("4%")}}>
    <View style={{flex:0.5, marginLeft:wp("4%")}}>
    <Text style={{fontSize:wp("5%"), fontWeight:'bold'}}>{'Weight'}</Text>
    </View>
    <View style={{flex:0.5}}>
    <Text style={{fontSize:wp("5%"), fontWeight:'bold'}}>{'Date'}</Text>
    </View></View>
</View>
    </View>);
}


export default ()=>{

    var [ExpectedWeight,setExpectedWeight]=useState('65.0000');
    var [currentWeight,setCurrentWeight]=useState('93.000');
var [image,setImage]=useState('');
var [logs,setLogs]=useState([]);
    const ImagePick=()=>{

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            setImage(image)
          });
    }

    useEffect(() => {

       AsyncStorage.getItem("ExpectedWeight").then(val=>{
        if (val)
        setExpectedWeight(val)})
    

    },[])


const LogScreen= <View style={{flex:1,width:wp("100%")}} key ='logs'>

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
      
     <Logs />
   
   </View>
   </View>

const UpdateScreen=<View style={{flex:1,width:wp('100%')}} key='UpdatedScreen'>

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

<ScrollView  style={{flex:0.9,}} >
    <View style={{flex:0.6, alignItems:'center', justifyContent:'center',marginVertical:hp("10%")}}>


        <TouchableOpacity style={{borderWidth:1,width:wp("40%"), height:wp("40%"), borderRadius:wp("20%"), backgroundColor:'#D1D4D7',justifyContent:'center', alignItems:'center'}} onPress={ImagePick}>
            
{image ?  <View><Image source={{uri :image.path}} resizeMode='cover' style={{height:wp("40%"), backgroundColor:'white',width:wp("40%"),borderRadius:wp("20%")}} /></View>:<View><Econ name='images' size={wp("20%")} color='#6E6E6E'/>
<Text>Upload Image</Text></View>}


        </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={styles.ControllerContainer} onPress={()=>{
            
            setCurrentWeight((Number(currentWeight)-1).toString())}} >
            <Text style={styles.ControllerText}>-</Text>
            </TouchableOpacity>
<TextInput  value={currentWeight} style={{
alignSelf:'center',
marginHorizontal:20,
borderRadius:20,
width:wp("30%"),
borderWidth:3,
textAlign:'center',
borderColor:'#FB03B0',
fontWeight:'bold',
fontSize:wp("6%")
}}
keyboardType={'number-pad'}
onChangeText={(newWeight)=>{setCurrentWeight(newWeight)}}
/>
<TouchableOpacity style={styles.ControllerContainer}  onPress={()=>{
            
            setCurrentWeight((Number(currentWeight)+1).toString())}}><Text style={styles.ControllerText}>+</Text></TouchableOpacity>
</View>
<TouchableOpacity style={{alignSelf:'center',
marginTop:hp("20%"),
 backgroundColor:'#FB03B0',
  width:wp("40%"),
  height:hp("08%"),
  alignItems:'center',
  justifyContent:'center',
  borderRadius:wp("20%")}}>
    <Text style={{fontWeight:'bold', fontSize:wp("6%"), color:'white'}}>Update</Text>
</TouchableOpacity>
</ScrollView>
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
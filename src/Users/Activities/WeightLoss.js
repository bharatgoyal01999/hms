import React, { PureComponent ,useEffect,useState} from 'react'
import {View,Text,TextInput,StyleSheet,Image,TouchableOpacity,FlatList,ScrollView} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Econ from 'react-native-vector-icons/Entypo'
import Header from './Header'
import * as firebase from 'firebase'
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage'
import { Actions } from 'react-native-router-flux'


const Logs=({Weight ,Date, image})=>{
  
    var [url,setUrl]=useState('');

    useEffect(()=>{

        var ImagePath=firebase.storage().ref(image);
        ImagePath.getDownloadURL().then(function(url) {
            setUrl(url)
          }).catch(function(error) {
              console.log(error)
              })
    } ,[])



    return (
    <View
    style={{flex:0.15,height:hp("10%"),elevation:2, marginVertical:hp("2%"), marginHorizontal:wp("2%")}}
    >
<View style={{flex:1, flexDirection:'row', alignItems:'center', borderWidth:1,borderRadius:wp("2%")}}>
    <Image style={{height:hp("9%"), width:wp("25%"), borderRadius:wp("1.5%") }} resizeMode={'contain'}  
    source={{uri:url }} >
    </Image>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',padding:wp("4%")}}>
    <View style={{flex:0.5, marginLeft:wp("4%")}}>
    <Text style={{fontSize:wp("5%"), fontWeight:'bold'}}>{Weight}</Text>
    </View>
    <View style={{flex:0.5}}>
    <Text style={{fontSize:wp("5%"), fontWeight:'bold'}}>{Date}</Text>
    </View></View>
</View>
    </View>);
}


export default ()=>{

    var [ExpectedWeight,setExpectedWeight]=useState('65.0000');
    var [currentWeight,setCurrentWeight]=useState('93.000');
    var [UserId,setUserId]=useState();
    var [image,setImage]=useState('');
    var [WeightLogs,setWeightLogs]=useState([]);
    var [logs,setLogs]=useState([]);




    useEffect(() => {

       AsyncStorage.getItem("ExpectedWeight").then(val=>{
        if (val)
        setExpectedWeight(val)})
        AsyncStorage.getItem('weight').then(val=>{
            if(val)
            {
                console.log(Number(val))
                setCurrentWeight(Number(val))}
        })

        AsyncStorage.getItem("UID").then(val=>{
            if(val)
            {setUserId(val)
                const path= firebase.database().ref("User").child(val).child('WeightLogs')
       path.on('value',dataSnap=>{
           if(dataSnap.val()){
           if(dataSnap.val()){
               var keys=Object.keys(dataSnap.val())
               var LOGS=Object.values(dataSnap.val());
               
               var logs=LOGS.map(item=>{
                   return (
                       <Logs Weight={item.weight} Date={item.date} image={item.ImagePath} />
                   );
               })
               setWeightLogs(logs)}

           }
       })
    
            }
            
        })
     
       
        
    },[])

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

const updateLog=async ()=>{
    var date=new Date;
    var datestr=date.getFullYear().toString()+(Number(date.getMonth())+1).toString()+date.getDate().toString()
    var path=firebase.database().ref('User').child(UserId).child("WeightLogs").child(datestr)
    path.set({
        'weight':currentWeight,
        'date':datestr,
        'ImagePath':UserId+'/weightTile'+datestr
    });
    if(image){
        console.log(image)
        const res = await fetch(image.path)
    // console.log(res)
    const blob=await res.blob();
         var storageRef = firebase.storage().ref()
         const finalref=storageRef.child(UserId+'/weightTile'+datestr)
    //      // Create file metadata including the content type
        
     var metadata = {
     contentType: 'image/jpeg',
     };
     
    finalref.put(blob, metadata).then(snapshot=>{
        console.log(blob)
         let upLodingRatio=snapshot.bytesTransferred/snapshot.totalBytes
           console.log(upLodingRatio)
    Actions.WeightLogs()

        //  this.setState({upLodingRatio})
 
     }).catch((err)=>{
     console.log(err)
     alert(err)
     });
    }

}


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
   
   <ScrollView  style={{flex:0.9}} >
      
    {WeightLogs}
   
   </ScrollView>
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
<TextInput  value={currentWeight.toString()} style={{
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
  borderRadius:wp("20%")}}
  
  onPress={updateLog}
  >
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
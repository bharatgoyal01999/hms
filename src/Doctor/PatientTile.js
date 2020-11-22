import React,{useState,useEffect} from 'react';
import {ScrollView,Text,View,StyleSheet,Modal,Image} from 'react-native'

import Ficon from 'react-native-vector-icons/FontAwesome5'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as firebase from 'firebase'


const Priscriptions=({DrId,Notes,ImageSource})=>{
console.log(Notes)
    var [DrName,setDrName]=useState("Doctor");
    var [uri,setUrl]=useState()

        useEffect(  ()=>{

            const path=firebase.database().ref("Doctor").child(DrId).child('personalInfo')
             path.on('value',dataSnap=>{

                if(dataSnap.val()){
                    console.log(dataSnap.val().Name)
                    setDrName(dataSnap.val().Name)
                    // console.log(dataSnap.val())
                }
            })

            // Create a reference to the file we want to download
var starsRef = firebase.storage().ref().child('Priscription/'+ImageSource);

// Get the download URL
var url;
 starsRef.getDownloadURL().then(function(url) {
  setUrl(url)
}).catch(function(error) {
    console.log(error)
}
        )},[uri])

    return (
        <View style={{flex:1}}>
            <View style={{backgroundColor:'#077ACA', alignItems:'center',justifyContent:'center',flex:0.15}}>
    <Text style={{color:'white',fontSize:wp("5%")}}>{'Priscriptions By' }</Text>
    <Text style={{color:'white',fontSize:wp("5%")}}>{'Dr. '+ DrName  }</Text>
            </View>
            <View style={{flex:0.85}}>

    <ScrollView
     style={{flexDirection:'row',height:hp("30%"),width:wp("100%"),borderColor:'#077ACA', borderRadius:wp("2%"), borderWidth:2}}>
    <Text style={{fontSize:wp("5%")}}>{'Notes:'+Notes}</Text>
    </ScrollView>
    
                <Image resizeMode='contain' style={{borderColor:'#077ACA',borderWidth:1,width:wp("100%"),height:hp("70%")}} source={{uri:uri}}/>
                
            </View>
        </View>
    );
}
export default (Info)=>{
    const data=Info.History
    console.log(Info,"Infoo")
   
var [priscriptionVisibility,setPriscriptionVisibility]=useState(false)
  
    return (
        <View 
        
        style={{height:hp('24%'),

       padding:wp('4%'),
        margin:wp("2%"),
        
        flexDirection:'row',
        elevation:1,
        borderRadius:wp("3%"),
        alignItems:'center'}}
        
        
        >

        {/* <View style={{flexDirection:'row',  padding:wp("2%"), borderRadius:wp("3%"),flex:1,justifyContent:'space-between'}}> */}
            <ScrollView>
               <Text  style={styles.DiscriptionText}>{"Name-" +data.Name}</Text>
    <Text  style={styles.DiscriptionText}>{"Problem-" +data.Symtoms}</Text>
    <Text style={styles.DiscriptionText}>{"Tempreature-" +data.Temp}</Text>
    <Text style={styles.DiscriptionText}>{"HeartRate-" +data.HeartRate}</Text>
    <Text style={styles.DiscriptionText}>{"BP-" +data.BP}</Text></ScrollView>


    <View style={{alignItems:'flex-end'}}>
    <Text  style={styles.DiscriptionText}>{data.date.slice(0,4)+'-'+data.date.slice(4,6)+'-'+data.date.slice(6,8)}</Text>
    <Text style={styles.DiscriptionText}>{data.time.length ==4 ? data.time.slice(0,2)+':'+data.time.slice(2,4):data.time[0]+':'+data.time.slice(1,3)}</Text>
    <Ficon  name='notes-medical' color='#077ACA' size={wp("10%")} onPress={()=>{
setPriscriptionVisibility(true)
    }} />
    </View>
      
        <Modal visible={priscriptionVisibility} onRequestClose={()=>{setPriscriptionVisibility(false)}}>
<Priscriptions DrId={data.DoctorId} Notes={data.Priscription} ImageSource={data.date+Info.AadharNumber}/>
        </Modal>
        </View>
    );
}
const styles=StyleSheet.create({

    DiscriptionText:{
        fontSize:wp("4%"),
        margin:wp("0.5%"),
        fontWeight:'bold'
    }
})
import React from 'react'
import {View, Text, Button, Modal, FlatList,TouchableOpacity,StyleSheet,AsyncStorage} from 'react-native'
import Head from './docScreenComp/Head'
import Colors from '../../Theme/Color'
import * as firebase from 'firebase'
import {heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Icons from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-datepicker'
import PatientCard from './docScreenComp/PatientCard'
import PatientTile from './PatientTile'

import FingerPrintScanner from './docScreenComp/FingerPrint'
import { Actions } from 'react-native-router-flux'
import { Input } from 'native-base'

export default class DocScreen extends React.Component{

    state={
        ifNew:false,
        selectedDate:null,
        datepickeVisible:false,
        addPatientWindow:false,
        today:'',
        time:'',
        visibleDate:'',
        DrName:'',
        NewPatientAadharNumber:'',
        visibleFingerPrint:false,
        Uid:null,
        patientData:[],
        patientAadharData:[],
    }
    componentDidMount=async ()=>{

            var dateTime=await new Date();
            const date=dateTime.toISOString().split("T")[0];
           
            const time=dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds();
            this.setState({today:date,time:time,selectedDate:date})

            let visibleDate=date;
            visibleDate=date.split("-");
            visibleDate= visibleDate.reverse()
            visibleDate=visibleDate.join("-")
            this.setState({visibleDate})
            var Uid
           await AsyncStorage.getItem('UID').then(val=>{
                this.setState({Uid:val})
                Uid=val
            })
            console.log(Uid)
        
            
            const path=await firebase.database().ref('/Doctor').child(Uid).child('personalInfo')
            await path.on("value",(dataSnap)=>{
                if(dataSnap.val()){
                  this.setState({DrName:dataSnap.val().Name})
                  }

            })
            var date_path=date.split('-').join('')
            const path_=firebase.database().ref('Doctor').child(this.state.Uid).child('PatientInfo').child(date_path);
       
            var PatientsAadharList=[];
            await path_.on('value',dataSnap=>{

                if(dataSnap.val()){
                    console.log(dataSnap.val())
                    this.setState({patientAadharData:Object.values(dataSnap.val())})
                   
                       

                }
                else{
                    console.log("HMmm")
                }
            })
console.log(this.state.patientAadharData)
            setTimeout(()=>{
                this.getDataForSelectedDate(date)
            },2000)
            console.log(this.state.DrName);

            



           
        }

    checkPatient=()=>{

        const AadharNumber=this.state.NewPatientAadharNumber;
        const PatientPath=firebase.database().ref('Patients').child(AadharNumber)
        PatientPath.on('value',dataSnap=>{

            if(dataSnap.val()){
                console.log(AadharNumber)
                console.log("Patient Exists")
                this.setState({addPatientWindow:false})
                Actions.Treatment({AadharNumber:AadharNumber});
            }
            else{
                
                console.log("New Patient")
                this.setState({addPatientWindow:false})
                Actions.NewPatient({AadharNumber:AadharNumber});
            }
        })


        }


    getDataForSelectedDate=async (date)=>{
      var date_path=date.split('-').join('')
       
// Getting patient list
// var UID;
//  await AsyncStorage.getItem('UID').then(val=>{
                
//                 UID=val
//             })
           
            // Getting Patient Data
            
            var updatesAadharList={}
           
            this.state.patientAadharData.forEach(item=>updatesAadharList[item]=1)
            // console.log(updatesAadharList)
            updatesAadharList=Object.keys(updatesAadharList)
          
            PatientsAadharList=updatesAadharList
            // console.log(PatientsAadharList)
            
            var data_of_patient=[]
            
            PatientsAadharList.forEach(async item=>{

                var patientPersonalInfo={}

                    const path=firebase.database().ref('Patients').child(item+'/History').child(date_path)
                    const Prsonal_Info_Path=firebase.database().ref('Patients').child(item+'/personalInfo')

       await Prsonal_Info_Path.on('value',dataSnap=>{
        if(dataSnap.val()){
             patientPersonalInfo=dataSnap.val()
                                                    }
                            })

                   await path.on('value',datasnap=>{

                            if(datasnap.val()){

                                    var TotalVisitesOfSinglePatient=Object.keys(datasnap.val())
                                        TotalVisitesOfSinglePatient.forEach(time=>{
                                                data_of_patient.push({...datasnap.val()[time],...patientPersonalInfo,date:date_path,time:time,AadharNumber:item})
                                                this.setState({patientData:data_of_patient})
                                        })
                            }

                    })
            })

         



    }
    addPatient=()=>{

        this.checkPatient();
       
        
    }


    render(){
     console.log(this.state.patientData,",,,,")
        return (


            <View style={{flex:1}}>

            <View style={{flex:0.1, justifyContent:'center'}}>

             <Head  drName={this.state.DrName}/>
             
             </View>

            <View style={{flex:0.9,borderWidth:1}}>

                <View style={{flexDirection:'row', flex:0.08, justifyContent:'space-between',padding:2,borderWidth:1 ,alignItems:'center'}}>

                <Text style={styles.date}>{this.state.selectedDate}</Text>

            <View  style={{borderColor:Colors.backgroundBlue, borderWidth:2, width:70,alignItems:'center',borderRadius:35}}>
            <DatePicker
                mode='date' // The enum of date, datetime and time
                placeholder="select date"
                format="YYYY-MM-DD"
                maxDate={this.state.today}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateInput:{
              display:'none'}
         }}

         onDateChange={async (date) => {

           this.setState({selectedDate:date})
           var date_path=date.split('-').join('')
           const path_=firebase.database().ref('Doctor').child(this.state.Uid).child('PatientInfo').child(date_path);
      
           var PatientsAadharList=[];
           await path_.on('value',dataSnap=>{

               if(dataSnap.val()){
                   console.log(dataSnap.val())
                   this.setState({patientAadharData:Object.values(dataSnap.val())})
                  
                      

               }
               else{
                   console.log("HMmm")
               }
           })
console.log(this.state.patientAadharData)

           
            this.getDataForSelectedDate(date)


         }}
       /></View>
                </View>
       
                <FlatList
            
                style={{flex:0.7}}
 data={this.state.patientData}
 renderItem={({item})=>{
     return (<PatientTile History={item} keys={item.time} AadharNumber={item.AadharNumber} />)
 }}
 />

            </View>

                <Modal visible={this.state.addPatientWindow} transparent  onRequestClose={()=>this.setState({addPatientWindow:false})}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={{
                        backgroundColor:Colors.backgroundBlue, 
                        width:wp("70%"), 
                        height:hp("40%"),
                        borderRadius:wp("2%"),
                        justifyContent:'center',
                        alignItems:'center'
                        }}>
                            <Text style={{color:'white', fontSize:wp("5%")}} onPress={()=>{this.setState({addPatientWindow:false,ifNew:true,visibleFingerPrint:true})}} > Enter Aadhar Number </Text>
                            <Input value={this.state.NewPatientAadharNumber} style={styles.UserText} keyboardType='number-pad' maxLength={12} onChangeText={(NewPatientAadharNumber)=>{this.setState({NewPatientAadharNumber})}}/> 
                           <TouchableOpacity 
                           style={{justifyContent:'center', 
                           alignItems:'center',
                            borderColor:'white',
                            borderWidth:1, 
                            width:wp("40%"),
                            height:hp("5%"),
                             marginBottom:hp("3%")}}
                             onPress={this.addPatient}
                             >
                            <Text style={{color:'white', fontSize:wp("5%")}}>Ok</Text></TouchableOpacity>
                    </View>
                    </View>
                </Modal>

                {/* <Modal visible={this.state.visibleFingerPrint} transparent onRequestClose={()=>{this.setState({visibleFingerPrint:false})}}> 
                <FingerPrintScanner ifNew={this.state.ifNew} closeFingerPrintScanner={()=>{this.setState({visibleFingerPrint:false})}} />
                </Modal> */}
             <View style={{
               
                alignSelf:'flex-end',
                position:'absolute', 
                bottom:hp("3%"),
             
                backgroundColor:'rgba(0,0,0,0)',
                flexDirection:'row',
                justifyContent:'space-between'
                }}>

               <View 
               style={styles.flotingButton}>

                <Icons name='plus'  size={wp("12%")} color={'white'} onPress={()=>this.setState({addPatientWindow:true})} />
                 </View>

  
                 </View>
                </View>
            
        );
    }

}

const styles= StyleSheet.create({

  UserText:{
      color:'white',
      fontSize:wp("7%"),
      width:wp("60%"),
      height:hp("0%"),
      marginVertical:hp("10%"),
      alignSelf:'center',
      borderWidth:wp("0.5%"),
      borderColor:'white',
      borderRadius:wp("2%"),
      padding:wp("2%")
  }  ,
  flotingButton:{
    alignItems:'center',
   
    justifyContent:'center',
    backgroundColor:Colors.backgroundBlue,
    height:hp("9%"), 
    width:wp("18%"),
    borderRadius:wp("9%")
  },
  date:{
      fontSize:wp("6%"),
      color:Colors.backgroundBlue
  }
})
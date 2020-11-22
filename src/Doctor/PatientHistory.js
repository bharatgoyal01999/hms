import React, { useEffect } from 'react'
import {View,Text,Input,ScrollView, FlatList, ActivityIndicator} from 'react-native'
import * as firebase from 'firebase'
import {CheckBox} from 'native-base'
import Color from '../../Theme/Color'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import PatientTile from './PatientTile'
export default class PatientHistory extends React.Component{
  


state={

    Historydata:[],
    loading:true,
    onlyMyCases:false
}
componentDidMount=async ()=>{

    const path_to_patient=firebase.database().ref('Patients').child(this.props.AadharNumber).child('History')
    await path_to_patient.on('value',datasnap=>{
        if(datasnap.val()){
            var HistoryData=[];
            var data=datasnap.val();
            const dates=Object.keys(datasnap.val());
            dates.forEach((item)=>{
               const Times= Object.keys(data[item])
              Times.forEach((time)=>{
                HistoryData.push({...data[item][time],date:item,time:time,Name:this.props.personalInfo.Name})
                this.setState({Historydata:HistoryData, loading:false})
              })
              
                
            })
            
         
        }
    })
    console.log(this.state.Historydata)
}


render(){
    console.log(this.state.loading)
    return (
        <View style={{flex:1}}>

            <View style={{flex:0.15, 
               
                alignItems:'center',justifyContent:'center',backgroundColor:Color.backgroundBlue}}>
    <Text style={{fontSize:widthPercentageToDP("7%"), color:'white'}}>{this.props.personalInfo.Name.split(' ')[0]+"'s Medical History"}</Text>
            </View>
           
    {  this.state.loading ? <ActivityIndicator color={'blue'} size={9} /> : 
 <FlatList style={{flex:0.7}}
 data={this.state.Historydata}
 renderItem={({item})=>{
     return (<PatientTile History={item}/>)
 }}
 />}

        </View>
    );
}}
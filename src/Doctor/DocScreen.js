import React from 'react'
import {View, Text, Button, Modal ,TouchableOpacity} from 'react-native'
import Head from './docScreenComp/Head'
import Colors from '../../Theme/Color'
import {heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Icons from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-datepicker'

export default class DocScreen extends React.Component{

    state={
        selectedDate:null,
        datepickeVisible:false
    }
    render(){
        console.log(this.state.selectedDate)
        return (
            <View style={{flex:1}}>
            <View style={{flex:0.15}}>
             <Head /></View>

                {/* <Modal visible={this.state.datepickeVisible} transparent >
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={{backgroundColor:'black', width:wp("70%"), height:hp("50%")}}>
                    
                    </View>
                    </View>
                </Modal> */}
             <View style={{
                 
                 position:'absolute', 
                bottom:hp("3%"),
                width:wp("100%"),
                backgroundColor:'rgba(0,0,0,0)',
                flexDirection:'row',
                justifyContent:'space-between'
                }}>

               <View 
               style={{
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:Colors.backgroundBlue,
                height:hp("8%"), 
                width:wp("16%"),
                borderRadius:wp("8%")
                 }}>

                     <Icons name='plus'  size={wp("12%")} color={'white'} />
                 </View>

                 <View
                 
               style={{
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:Colors.backgroundBlue,
                height:hp("8%"), 
                width:wp("16%"),
                borderRadius:wp("8%"),
                 }}>

<DatePicker
    date={"10-10-2020"} 
    mode='date' // The enum of date, datetime and time
    placeholder="select date"
    format="DD-MM-YYYY"
    minDate="01-01-2016"
    maxDate="10-10-2020"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    customStyles={{
         dateInput:{
              display:'none'}
         }}
         onDateChange={(date) => {
           this.setState({selectedDate:date})
         }}
       />
                 </View>
                 </View>
                </View>
            
        );
    }

}
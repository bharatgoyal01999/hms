import AsyncStorage from '@react-native-community/async-storage';
import React, {useState,useEffect} from 'react'
import {View,ScrollView, Text, Modal,StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Mcon from 'react-native-vector-icons/Ionicons'
const ThemeColor='#1285EA';
const ReminderTile=({rem,deletItem})=>{
    return (
        <View style={{
        flexDirection:'row',
        flex:0.1,
        marginVertical:wp("2%"),
        elevation:5,
        backgroundColor:'#D2EDF9',
        borderRadius:wp("4%"),
        marginHorizontal:wp("2%"),
       
        justifyContent:'space-between',
        alignItems:'center',
        padding:wp("2%")
        }}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
<Mcon name='watch' color={ThemeColor} size={wp("10%")} />
    <Text style={styles.Tile}>{rem.Title}</Text></View>
        
        <View>
        <Text style={styles.Tile}>{rem.date.toString().split("T")[0]}</Text>
        <Text style={styles.Tile}>{rem.time.toString().split(" ")[0]}</Text></View>
            <Mcon name='delete' color='#E12F0F' size={wp("8%")} onPress={deletItem} />
        </View>
    )
}

export default ()=>{

   

var [visibleAddScreen, setAddVisiblity]=useState(false);
var [EmptyReminder,setEmptyReminder]=useState(true);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
var [medicineName,setMedicineName]=useState();
var [time,setTime]=useState();
var [date,setDate]=useState();
var [reminders,setReminders]=useState([]);




const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
      setDate(date)
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const handleTimeConfirm = (time) => {
    console.warn("A Time has been picked: ", time);
    console.log(time.toTimeString());
    setTime(time.toTimeString());
    hideTimePicker();
  };

  
useEffect(()=>{
// AsyncStorage.setItem("Reminders",'')
AsyncStorage.getItem("Reminders").then(val=>{
    if(val)
   { val=JSON.parse(val);
    if (val.length>0)
    {console.warn(val)
    setEmptyReminder(false)
    setReminders(val);
    }
    else{
setEmptyReminder(true)
    }


}
else{
    setEmptyReminder(false)
}

})
},[])
const Flex =  !EmptyReminder ? 0.15 : 1 ; 




var ReminderComponent=reminders.map(item=>{
    return <ReminderTile rem={item} key={item.Title} deletItem={()=>{
        var Reminders=reminders.filter(Item=> {return Item.Title!=item.Title})
        setReminders(Reminders);
        if(Reminders.length==0)
        setEmptyReminder(false)
        AsyncStorage.setItem('Reminders',JSON.stringify(Reminders))
    }}/>
})


    return (
<View style={{flex:1}}>
<View style={styles.header}><Text style={styles.headingText}>Medicine Reminders</Text></View>
{!EmptyReminder && <ScrollView style={{flex:0.7}}>
{ReminderComponent}


</ScrollView>}
<View style={{...styles.mainContainer,flex:Flex}}>
<TouchableOpacity style={styles.addBtn} onPress={()=>{setAddVisiblity(true)}}>

<Text style={styles.btnText}>Add</Text>

</TouchableOpacity></View>


<Modal visible={visibleAddScreen} transparent onRequestClose={()=>setAddVisiblity(false)}>
    <View style={{top:hp("20%"),left:wp("10%"),alignItems:'center',justifyContent:'center', position:'absolute'}}>
    <View style={{elevation:0.1,backgroundColor:'#EFF6FC', width:wp("80%"), height:hp("70%"), borderRadius:wp("4%")}}>
    <View style={{flex:0.05}} />
       <View style={{flex:0.7}}>

<TextInput placeholder='Medicine Name' 
onChangeText={(name)=>{setMedicineName(name)}}
style={{borderBottomColor:'black', borderBottomWidth:1}}/>
<View style={{justifyContent:'space-evenly', flex:0.8}}>
<Button title="Pick Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="Pick Time" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      /></View> 
       </View>



       <View style={{flex:0.25, flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
       <TouchableOpacity style={styles.addBtn} onPress={()=>{
var Reminders=reminders;
Reminders.push({
    'Title':medicineName,
    'date':date,
    'time':time,
})

AsyncStorage.setItem('Reminders',JSON.stringify(Reminders));
setReminders(Reminders)
setEmptyReminder(false)
setAddVisiblity(false)
       }}>

<Text style={styles.btnText}>Add</Text>

</TouchableOpacity>


<TouchableOpacity style={styles.addBtn} onPress={()=>{setAddVisiblity(false)}}>

<Text style={styles.btnText}>Cancel</Text>

</TouchableOpacity>

       </View>
       <View style={{flex:0.05}} />
    </View></View>
</Modal>
    </View>)
}



const styles=StyleSheet.create({
mainContainer:{
 
    justifyContent:'center',
    alignItems:'center'
},
addBtn:{
    width:wp("30%"),
    height:wp("15%"),

    backgroundColor:ThemeColor,
    justifyContent:'center',
    borderRadius:wp("4%")

},
btnText:{
    alignSelf:'center',
    color:'white',
    fontSize:wp("7%"),
    fontWeight:'700'
},
header:{
    flex:0.15,

    alignItems:'center',
    width:'100%',
    height:hp("12%"),
    justifyContent:'center',
    backgroundColor:ThemeColor,
},
headingText:{
    color:'white',
    fontSize:wp("10%"),
    fontWeight:'700'
},
Tile:{
    fontWeight:'bold',
    fontSize:20

}
})
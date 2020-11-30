import React, { PureComponent } from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import { widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Header from './Header'
export default ()=>{
return (

<View style={{flex:1}}>
<Header Heading={'WeightLoss'}  Color={'#FB03B0'}/>

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
</View>)
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
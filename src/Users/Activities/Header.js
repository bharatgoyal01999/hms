import React from 'react'
import {View,Text} from  'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default ({Heading,Color})=>{
return (
    <View style={{flex:0.1,backgroundColor:Color, justifyContent:'center'}}>
        <Text style={{fontSize:wp("6%"),color:'white', marginLeft:wp("2%")}}>{Heading}</Text>
    </View>
);
}
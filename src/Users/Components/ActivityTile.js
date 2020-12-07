import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default  ({title,Icon,onTouch})=>{
    return(
        <TouchableOpacity style={styles.MainTile} onPress={()=>{
           onTouch();
        }} >
        <View style={{marginLeft:widthPercentageToDP("2%")}}>{Icon}</View>    
<Text style={{marginLeft:widthPercentageToDP("3%"),fontSize:widthPercentageToDP("5%")}}>{title}</Text>
        </TouchableOpacity>
    );
}




const styles=StyleSheet.create({
    MainTile:{
        backgroundColor:'white',
        flex:0.08,
        height:heightPercentageToDP("8%") ,
        borderRadius:widthPercentageToDP("3%"),
        elevation:8,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:heightPercentageToDP("1%")
    }
})
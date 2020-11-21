
import Ficon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default  ({title,Icon,onTouch})=>{
    return(
        <View style={styles.MainTile}>
        <View style={{marginLeft:widthPercentageToDP("2%")}}>{Icon}</View>    
<Text style={{marginLeft:widthPercentageToDP("3%"),fontSize:widthPercentageToDP("5%")}}>{title}</Text>
<Ficon onPress={()=>{console.log(title)}} name='plus-circle' color={'#1285EA'} style={{position:'absolute', right:widthPercentageToDP("10%")}} size={widthPercentageToDP("6%")}/>
        </View>
    );
}




const styles=StyleSheet.create({
    MainTile:{
        backgroundColor:'white',
        flex:0.08,
        height:heightPercentageToDP("5%") ,
        borderRadius:widthPercentageToDP("3%"),
        elevation:8,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:heightPercentageToDP("1%")
    }
})
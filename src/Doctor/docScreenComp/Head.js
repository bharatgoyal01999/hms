import React from 'react'
import {View,TouchableOpacity} from 'react-native'
import { Text } from 'react-native-elements'
import Colors from '../../../Theme/Color'



export default ({drName})=>{

    
        return (
            <View style={{flex:1, backgroundColor:Colors.backgroundBlue, alignItems:'center',justifyContent:'center'}}>
            <Text h3 style={{color:'white'}}>{'Hii Dr. '+drName}</Text>
        </View>
        );
    
}
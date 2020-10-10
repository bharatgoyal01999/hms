import React from 'react'
import {View,TouchableOpacity} from 'react-native'
import { Text } from 'react-native-elements'
import Colors from '../../../Theme/Color'



export default class DocHead extends React.Component{

    render(){
        return (
            <View style={{flex:0.6, backgroundColor:Colors.backgroundBlue, alignItems:'center'}}>
            <Text h3 style={{color:'white'}}>Hii (Doctor Name)</Text>
        </View>
        );
    }
}
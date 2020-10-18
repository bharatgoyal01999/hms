import * as React from 'react'
import {View, Text, Button ,TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Foundation'
import FIcons from 'react-native-vector-icons/FontAwesome'
import {widthPercentageToDP as wp , heightPercentageToDP as hphn} from 'react-native-responsive-screen'


export default ({Name,Gender})=>{

  
    var Sex
   if (Gender==='male' || Gender==='felmale'){
    Sex=<Icons name={Gender} />
   }
   else{
       Sex=<FIcons name='transgender' />
   }
    return (
        <View style={{flex:1}}>  
           <View style={{flexDirection:'row', flex:1, height:100,width:100}}>
                {Sex}
                <Text>name</Text>
           </View>
        </View>
    );
}
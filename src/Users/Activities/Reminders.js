import React from 'react'
import {View,Text} from  'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Color from '../../../Theme/Color'
import ReminderTile from './ReminderTile'
import Header from './Header'
export default ()=>{
    return(
        <View style={{flex:1}}>
<Header Heading={'Reminders'} Color={'#1285EA'}/>
<ReminderTile title={'Medicine'} />
<ReminderTile title={'LogWeight'} />
<ReminderTile title={'Sanitize Hand'} />
<ReminderTile title={'Start Workout'} />
</View>
    );
}
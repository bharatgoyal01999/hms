import * as React from 'react';
import {View, TouchableOpacity}  from 'react-native'
import {Text} from 'react-native-elements'
import Colors from '../../../Theme/Color'
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icons from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux';


export default (props)=>{
    var [FingerColor,setFingerColor]=React.useState([1,'white'])
    var [completeScanning, setCompleteScanning]=React.useState('false')

const handleColorChanger=()=>{
    var op=0.1;
    var colorIn=setInterval(()=>{
       
        setFingerColor([op,"#3AD610"]);
        op=op+0.03;
        console.log(op)
        if (op>=1){

            clearInterval(colorIn)
            props.closeFingerPrintScanner();
            if(props.ifNew){
                Actions.NewPatient()
            }
            else{
            Actions.Treatment();}
            
        }
    
    },200)
     

   
}
    return (
<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View style={{height:hp("35%"),width:wp('80%') ,backgroundColor:Colors.backgroundBlue,borderRadius:5 ,alignItems:'center', justifyContent:'space-evenly'}}>

                    <Icons name={'fingerprint'} size={wp("25%")} style={{color:FingerColor[1],opacity:FingerColor[0]}} />
                    <TouchableOpacity  
                    onPress={handleColorChanger}
                    style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, width:120,height:40}}  >
  <Text style={{color:'white'}} h4>{props.ifNew ? 'Register' : 'Scan'}</Text> 
  </TouchableOpacity>
                </View></View>
       
    )
}
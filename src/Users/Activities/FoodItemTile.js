import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity} from 'react-native'

export default ()=>{
console.log("Hii there I am in")
    var [displayNutritions,setDisplayNutritions]=useState('none')
    var [displayIngredients,setDisplayIngredients]=useState('none')
    return(
        <View>
        <TouchableOpacity style={{elevation:5,
        flex:0.2,
        backgroundColor:'orange',
        marginTop:2}}

        onPress={()=>setDisplayNutritions("flex")}
        >

         </TouchableOpacity>
     {/*   <View style={{elevation:5,
        flex:0.2,
        backgroundColor:'orange',
        marginBottom:2,
        display:displayNutritions}}>

        </View>
     
        <View style={{elevation:5,
        flex:0.2,
        backgroundColor:'orange',
        marginBottom:2,
        display:displayIngredients}}>

        </View> */}
        </View>
    );
}
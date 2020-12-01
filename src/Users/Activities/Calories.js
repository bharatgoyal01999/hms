import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,TextInput,FlatList,TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Ficon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import FoodItemTile from './FoodItemTile'
import * as firebase from 'firebase'





export default ()=>{

 var [caloriesShouldHave,setCalories]=useState('10');
 var [addedCalories,UpdateAddedCalories]=useState(0);
 var [FoodKey,SetFoodKey]=useState('');
 var [FoodData,setFoodData]=useState([]);

    useEffect((()=>{
        AsyncStorage.getItem("NeededCal").then(val=>setCalories(val)),
        
        // UpdateAddedCalories(1000)
        console.log(addedCalories)
        console.log(Number(caloriesShouldHave))
        console.log(addedCalories/Number(caloriesShouldHave)+'%')

    }),[FoodData])


    const getFoodData=async ()=>{
        var options = {
            method: 'GET',
            url: 'https://edamam-recipe-search.p.rapidapi.com/search',
            params: {q: FoodKey},
            headers: {
              'x-rapidapi-key': 'b41abf75e8msh8f05652cbf32a05p1cedc1jsn7ae262f6ce09',
              'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              var foodData=[];
            response.data.hits.forEach((item,index)=>{
                
                var data={}
                data['Name']=item['recipe']['label']
                data['Image']=item['recipe']['image']
               data['Cautions']= item['recipe']['cautioms']
                data['Calories']=item['recipe']['calories']
                data['Ingredient']=item['recipe']['ingredientLines']
                var nutritions={}
                item['recipe']['digest'].forEach(item=>{
               nutritions[item['label']]=item['total']+item['unit'];
                
 
               
            })
            data['Nutritions']=nutritions;
            data['key']=index.toString();
            foodData.push(data)
      
        })
        // console.log(foodData)
            setFoodData(foodData) 
            //   console.log(response);
          }).catch(function (error) {
              console.error(error);
          });
    }

   
    return (
    <View style={styles.mainContainer}>
        <View style={styles.header}>
            <View style={{flexDirection:'row',flex:0.6,justifyContent:'center',alignItems:'center'}}>
            <View style={styles.InputContainer} >
           <TextInput  style={{color:'white'}} placeholderTextColor='white' value={FoodKey} placeholder={'search food item to add in diet'} onChangeText={(val)=>{SetFoodKey(val)}}/>
           
           </View>
           <Ficon name='search' style={{marginLeft:wp("2%")}} size={wp("8%")}color='white' onPress={getFoodData} /></View>
           <View style={{flex:0.4,justifyContent:'flex-end'}}>
    <Text style={{color:'white', fontSize:wp("5%")}}>{addedCalories+' cal out of '+caloriesShouldHave+' taken'}</Text>
           <View style={styles.indicator1}>
               <View style={{flex:1,
               backgroundColor:'#E96306',
               width:wp((addedCalories/Number(caloriesShouldHave))*100+'%'),
               borderRadius:wp("10%"),
               }}>

               </View>
               </View></View>
        </View>


<View style={styles.MainScreen}>
    <FlatList
    data={FoodData}
    renderItem={({item,index})=>{

            console.log(item)
        return ( 
            <View style={{flexDirection:'row',flex:1,borderRadius:wp("5%") ,padding:wp("2%") ,marginTop:5, elevation:5, backgroundColor:'#E96306',borderWidth:2,borderColor:"white"}}>
<View>
            <Image source={{uri:item.Image}}style={{width:wp("25%"), height:wp("25%"),resizeMode:'contain',borderRadius:wp("6%"), alignSelf:'center'}} />
            </View>
        <View style={{flex:0.7, marginLeft:3}}>

        <Text style={{color:'white',fontSize:wp("4%"),margin:2}} > {item['Name']}</Text>

       <Text style={{color:'white',fontSize:wp("3%"),}}>{'Calories: '+item['Calories'].toString().slice(0,6)}</Text>
       <Text style={{color:'white',fontSize:wp("3%"),}}>{'Calcium: '+item['Nutritions']["Calcium"].toString().slice(0,6)+'g'}</Text>
       <Text style={{color:'white',fontSize:wp("3%"),}}>{'Carbs: '+item['Nutritions']["Carbs"].toString().slice(0,6)+'g'}</Text>
       <Text style={{color:'white',fontSize:wp("3%"),}}>{'Fat: '+item['Nutritions']["Fat"].toString().slice(0,6)+'g'}</Text>
       <Text style={{color:'white',fontSize:wp("3%"),}}>{'Calories: '+item['Nutritions']['Protein'].toString().slice(0,6)+'g'}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',flex:0.2}}>
<Ficon name='plus-circle' size={20} color='white'onPress={()=>{UpdateAddedCalories(item['Calories'])}} />
        </View>
        </View>
        );
        }}
    
    ></FlatList>
    

</View>
    </View>);

}

var styles=StyleSheet.create({

mainContainer:{
    flex:1
},
header:{
    flex:0.2,
    padding:wp("2%"),
    backgroundColor:'#F56E04',
    alignItems:'center',
 
},
indicator1:{
width:wp("98%"),



borderRadius:wp("10%"),
borderWidth:1,
borderColor:'white',
alignSelf:'center',
height:hp("2%"),
backgroundColor:'white'

},
indicator2:{
    backgroundColor:'#F56E04',
width:wp("30%"),
position:'absolute',
bottom:wp("1%"),
right:wp("1%"),
height:hp("20%"),
borderRadius:wp("15%"),
borderWidth:1,
borderColor:'#F56E04',
alignSelf:'center',
height:wp("30%")
},
MainScreen:{
flex:0.8
},


InputContainer:{
borderColor:'white',
backgroundColor:'#E96306',
borderWidth:1.5,
borderRadius:wp("10%"),
width:wp("80%"),

}



})
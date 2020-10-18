import React  from 'react';
import {View,ScrollView,TouchableOpacity} from 'react-native'
import Colors from  '../../Theme/Color'
import Icon from 'react-native-vector-icons/FontAwesome'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Text} from 'react-native-elements'
import { Container, Header, Content, Form, Item, Input, Label , Textarea} from 'native-base';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


const PatientBasicInfo=()=>{
    const Textstyles={
        fontSize:widthPercentageToDP("5%")
    }
    return (
        <View style={{flex:0.15 , elevation:3, borderWidth:2,padding:5,borderColor:Colors.backgroundBlue }}>
            <View style={{flexDirection:'row'}}>
                <Text style={Textstyles}>Name: </Text>
                <Text style={Textstyles}>MohanLal</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={Textstyles}>Gender: </Text>
                <Text style={Textstyles} >Male</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={Textstyles}>Age: </Text>
                <Text style={Textstyles}>48</Text>
            </View>
            
        </View>
    );
}

export default class Treatment extends React.Component {

    state={
        Temp:'',
        HeartRate:'',
        Bp:'',
        loding:true,
    }
    syncWithBand=()=>{
        console.log("Start")
        this.setState({loding:true})
        setTimeout(()=>{
            this.setState({Temp:'97.5 F', HeartRate: '75 bpm', Bp:'90/60mmHg',loding:false})
        },2000)
    }
    render(){
    return (
        <View
        style={{flex:1}}
        >
            <View style={{flex:0.1,backgroundColor:Colors.backgroundBlue, alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'white', fontSize:widthPercentageToDP("10%")}} >Priscription</Text>
            </View>
            <PatientBasicInfo />
            <View style={{marginTop:heightPercentageToDP("3%"),flex:0.75}}>
                <Text onPress={this.syncWithBand} style={{color:'blue'}}>Sync With Band!!</Text>
                <View style={{position:'relative',width:widthPercentageToDP("100%"), marginTop:heightPercentageToDP("5%")}}>

             <Form>
        
            <Item> 

             <Icon  size={20} name='thermometer' />

              <Input placeholder={'Temp'} onChangeText={(val)=>{this.setState({Temp:val})}} value={this.state.Temp} />

            </Item>

            <Item >
                
            <Icon size={20}name='heart'  />
           
            <Input  placeholder={'Heart Rate'} onChangeText={(val)=>{this.setState({HeartRate:val})}} value={this.state.HeartRate}/>

            </Item>

            <Item >
                
            <Micon size={20} name='blood-bag'  />
           
            <Input  placeholder={'Blood Pressure'} value={this.state.Bp}/>

            </Item>
         
            <Form>
            <Textarea rowSpan={5} onChangeText={(val)=>{this.setState({Bp:val})}} bordered placeholder="Priscription" />
          </Form>

            </Form>  

                </View>
                <TouchableOpacity  
                    
                    style={{alignItems:'center',alignSelf:'center' ,borderRadius:10, backgroundColor:Colors.backgroundBlue, marginTop:10,width:120,height:40}}  >
  <Text style={{color:'white'}} h4>Add</Text> 
  </TouchableOpacity>
            </View>

        </View>
    );}
}
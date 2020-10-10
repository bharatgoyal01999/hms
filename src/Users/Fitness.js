import React from 'react'

import GetLocation from 'react-native-get-location'
import {Button,Text,View} from 'react-native'
import * as geolib from 'geolib';

export default class Fit extends React.Component{
    state={
      currentPosition:{},
      chanedPosition:{longitude:"", latitude:""},
      distance:0,
    }

  handleDistance=()=>{
    
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
      console.log(location);
      const obj={
        latitude:location.latitude,
        longitude:location.longitude
      }
      this.setState({currentPosition:obj})
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })

  const distance=setInterval(()=>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
     
      const obj={
        latitude:location.latitude,
        longitude:location.longitude
      }
      this.setState({chanedPosition:obj})
  })

const d=geolib.getDistance(this.state.currentPosition,this.state.chanedPosition)
console.log("Distance is ", d)
this.setState({distance:d})
  
  },2000)
  }
    render(){
      return(
<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>{"Total walked distance is "+this.state.distance}</Text>
      <Text>{"Your Position "+this.state.chanedPosition.longitude+"  "+this.state.chanedPosition.latitude}</Text>
      <Button title='Start' onPress={this.handleDistance}></Button>
</View>

      );
    }

  }
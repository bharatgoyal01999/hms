import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Drawer} from 'native-base';
import {View} from 'react-native'

import { Avatar, Accessory ,Text} from 'react-native-elements';
import Colors from '../../Theme/Color'
import { heightPercentageToDP } from 'react-native-responsive-screen';
export default class HeaderIconExample extends Component {
  state={
    display:'flex'
  }
  render() {
  
    return (
      <Container>
  
        <Header style={{backgroundColor:Colors.backgroundBlue, height:heightPercentageToDP("8%")}}>
          <Left>
            <Button transparent onPress={()=>{
               this.drawer._root.open() ,
               this.setState({display:'none'})
            }}>
              <Icon name='menu'  />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
         
          <Avatar
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
/>
          </Right>
        </Header><View style={{display:this.state.display}}>
        <Text h1>bharat</Text></View>
        <Drawer ref={(ref) => { this.drawer = ref; }} content={<View style={{backgroundColor:"white",flex:1}}><Text>Bharat</Text></View>} onClose={() =>  {this.drawer._root.close();
        this.setState({display:'flex'})
        }
        } ></Drawer>  
        
      </Container>
    );
  }
}
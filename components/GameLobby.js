import React, { Component } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';



export default class GameLobby extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData:props.userData,
      lobbyData:null
    }
  }

  componentDidMount(){
    const url = 'ws://10.150.21.103:3000/gameLobby'; 
    // this.connection = new WebSocket(url);
    console.log("HELLOOO MOUNTED")
    this.socket = io('http://10.150.30.128:3000');
    
    this.socket.on('game lobby', lobbyData =>{
      console.log("game lobby recieved")
      console.log(lobbyData)
      this.setState({lobbyData}
      )})

  }
  render() {
    return (
      <View style={{ flex:1, justifyContent:'center', alignContent:'center' , height:100, zIndex:1}}>
        <Text>This is the Game Lobby Page</Text>
      </View>
    )
  }

}

import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class GameLobby extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData:props.userData,
      lobbyData:null
    }
  }

  componentDidMount(){
    this.socket = io('http://10.150.21.103:3000');
    this.socket.on('game lobby', lobbyData =>this.setState({lobbyData}))

  }
  render() {
    return (
      <View style={{ height : 100 }}>
        <Text>This is the Users Page</Text>
      </View>
    )
  }

}

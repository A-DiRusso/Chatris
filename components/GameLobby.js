import React, { Component } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';
import io from 'socket.io-client'


export default class GameLobby extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData:props.userData,
      lobbyData:null,
    }
  }

  componentDidMount(){

    this.socket = io('http://10.150.21.157:3000');

    this.socket.emit('game lobby' )

    this.socket.on('game lobby', lobbyData =>this.setState({lobbyData}))


    this.socket.on('session id', data => {
      const {sessionID, token} = data

      this.props.setSessionID(sessionID, token)
    })



  }
  _createGame = ()=>{
    this.socket.emit('create room', this.props.userData.firstName)

    

  }
  render() {
    return (

      <View style={styles.gameLobby}>
        <Text>This is the Users Page</Text>
        <Button onPress={this._createGame} title= 'CREATE GAME'></Button>
        

      </View>
    )
  }

}

styles = StyleSheet.create({
  gameLobby:{  height:100,flex:1, justifyContent:'center', alignContent:'center'}
})

import React, { Component } from 'react';

import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import io from 'socket.io-client'
import LobbyButton from './LobbyButton'


export default class GameLobby extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData:props.userData,
      lobbyData:null,
    }
  }

  componentDidMount(){

    this.socket = io('http://10.150.21.103:3000');

    this.socket.emit('game lobby' )

    this.socket.on('game lobby', lobbyData =>{
      let lobbyArray = Object.keys(lobbyData)
      let lobby = []
      lobbyArray.forEach(key=>{
        lobby.push(lobbyData[key])
      })
      this.setState({lobbyData:lobby})
    } )


    this.socket.on('session id', data => {
      const {sessionID, token} = data

      this.props.setSessionID(sessionID, token)
    })

    this.socket.on('create token', data => {
      const {sessionID, token} = data
      console.log('session', sessionID)
      console.log('token', token)

      this.props.setSessionID(sessionID, token)
    })



  }
  _createGame = ()=>{
    this.socket.emit('create room', this.props.userData)
  }
  _enterGame = (sessionID)=>{
    console.log("CREATING TOKEN")
    this.socket.emit('create token', sessionID)
  }
  render() {
    return (

      <View style={styles.gameLobby}>
        {this.state.lobbyData ? this.state.lobbyData.map((gameObj, i) =>{
          console.log(gameObj)
          return <LobbyButton
                    key={i} 
                    sessionID={gameObj.sessionId} 
                    title={`${gameObj.userName.firstName}'s Game`} 
                    clickHandler={this._enterGame}
                  />
        }) : null}
        <Button onPress={this._createGame} title='CREATE GAME'></Button>
        

      </View>
    )
  }

}

styles = StyleSheet.create({
  gameLobby:{  height:100,flex:1, justifyContent:'center', alignContent:'center'}
})

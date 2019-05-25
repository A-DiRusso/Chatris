
import React, { Component } from "react";
// import Users from './components/Users';
// import axios from 'axios';
import io from 'socket.io-client';


import { TextInput, StyleSheet, View, Text } from 'react-native';




export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: 'hello',
        }
    }
    componentDidMount() {
        this.socket = io('http://10.150.21.103:3000');
    }
    submitChatMessage = () => {
        this.socket.emit("chat message", this.state.chatMessage);
        this.setState({
            chatMessage: ""
        })
    }
    
  render() {
     
    return (
        <View style={{ height: 100 }}>
             
             <TextInput style={{ height: 40, borderWidth: 2, marginTop: 50 }}
                        autoCorrect={false} 
                        value={this.state.chatMessage}
                        onSubmitEditing={() => this.submitChatMessage()}
                        onChangeText={(chatMessage) => {
                         this.setState({ chatMessage })
             }}/>
       </View>
       
       
       );
      }
}







  
    


import React, { Component } from "react";
import GameLobby from './components/GameLobby';
import axios from 'axios';
import LoginScreen from './components/LogInScreen'
import Tetris from './components/Tetris'
import VideoScreen from './components/VideoScreen'



import { StyleSheet, View } from 'react-native';

// import LoginScreen from "./components/LogInScreen";
import 
Chat from "./components/Chat";

// const appId = "609894231244-0qhicv602n7a56t35n4hmn4ahrd3mi7c.apps.googleusercontent.com"


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userData:null,
            sessionID:null,
            token:null
        }
    }
    componentDidMount() {


    }
    _setSessionID = (sessionID, token)=>{
      this.setState({sessionID, token})
    }
    _createView = ()=>{
      const {userData, sessionID, loggedIn, token} = this.state
      if(loggedIn && !sessionID){
        
        return <GameLobby userData={userData} setSessionID={this._setSessionID}/>
      }

      else if (loggedIn === false){ 
        return <LoginScreen logInUser={this._loginUser}/>

    }else if (loggedIn && sessionID && token){
      return <Tetris sessionID={sessionID} token={token}/>

      
    }
  }

  render() {
      
    return (
        <View style={styles.appView}>
            {this._createView()}

      </View>
    
      
      );
      }
      


  

  _loginUser = async (firstName, lastName, userName, password) => {

    let data = await axios.post('http://10.150.21.157:3000/login',  {
            firstName,
            lastName,
            userName,
            password,
        }
        
    )

    console.log(data)
    console.log(data.data)
    if(data.data){

        this.setState({
            loggedIn: true,
            userData:data.data
        })
    }
  }

//   async onFbLoginPress() {
//     try {
//         const result = await Google.logInAsync({clientId:appId})
  
//         if (result.type === "success") {
//             console.log(result.user)
//           this.setState({
//             signedIn: true,
//             name: result.user.name,
//             photoUrl: result.user.photoUrl
//           })
//         } else {
//           console.log("cancelled")
//         }
//       } catch (e) {
//         console.log("error", e)
//       }
//     }
//       console.log("FACEBOOK LOGIN")
//     const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
//       permissions: ['public_profile', 'email'],
//     });
//     console.log(type)
//     console.log(token)
//     console.log("HEY")
//     if (type === 'success') {
//       const response = await fetch(
//         `https://graph.facebook.com/me?access_token=${token}`);
//       Alert.alert(
//         'Logged in!',
//         `Hi ${(await response.json()).name}!`,
//       );
//     }
//   }
}
  const styles = StyleSheet.create({

    appView:{ flex:1},
});
  
    

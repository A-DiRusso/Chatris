
import React, { Component } from "react";
// import Users from './components/Users';
// import axios from 'axios';



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
        }
    }
    componentDidMount() {

    }

  render() {
      const {firstName, lastName, userName, password} = this.state
    return (
        <View style={{ height: 100 }}>
            
              <Chat />
       </View>
       
       
       );
      }
      // {this.state.loggedIn ? <Users /> : <LoginScreen logInUser={this._loginUser} />}


  

  _loginUser = async (firstName, lastName, userName, password) => {

    let data = await axios.post('http://localhost:31337/login',  {
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
    containerView: {
      flex: 1,
    },
    loginScreenContainer: {
      flex: 1,
      paddingBottom: 30,
    },
    logoText: {
      fontSize: 40,
      fontWeight: "800",
      marginTop: 150,
      marginBottom: 30,
      textAlign: 'center',
    },
    loginFormView: {
      flex: 1
    },
    loginFormTextInput: {
      height: 43,
      fontSize: 14,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
      marginBottom: 5,
    
    },
    loginButton: {
      backgroundColor: '#3897f1',
      borderRadius: 5,
      height: 45,
      marginTop: 10,
    },
    fbLoginButton: {
      height: 45,
      marginTop: 10,
      backgroundColor: 'transparent',
    },
});
  
    

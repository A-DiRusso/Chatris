import React, { Component } from "react";
import axios from 'axios';


import {StyleSheet, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native';

// const appId = "609894231244-0qhicv602n7a56t35n4hmn4ahrd3mi7c.apps.googleusercontent.com"


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: 'first',
            lastName: 'last',
            userName: 'email@email.com',
            password: 'password',
            signUp: false
        }
    }
    componentDidMount() {
    //   const url = 'ws://localhost:31337/chat'; 
    //   this.connection = new WebSocket(url);
    //   this.connection.onmessage = (e) => {
    //     let data = JSON.parse(e.data);
    //     data ? loggedIn : null;
    //     this.setState({
    //       userName: data.userName,
    //       password: data.password,
    //       firstName: data.firstName,
    //       lastName:data.lastName
    //     });
    //   }
    }


    _signUpScreen = ()=>{
      const {firstName, lastName, userName, password} = this.state

        return (
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Chatris</Text>
          <TextInput placeholder="First Name" 
                     placeholderColor="#c4c3cb"   
                     style={styles.loginFormTextInput}
                     onChangeText={(firstName) => this.setState({firstName})}
                     value={firstName}
                      />
          <TextInput placeholder="Last Name" 
                     placeholderColor="#c4c3cb" 
                     style={styles.loginFormTextInput} 
                     onChangeText={(lastName) => this.setState({lastName})}
                     value={lastName}
                     />
          <TextInput placeholder="Username" 
                     placeholderColor="#c4c3cb"   
                     style={styles.loginFormTextInput}
                     onChangeText={(userName) => this.setState({userName})}
                     value={userName}
                      />
          <TextInput placeholder="Password" 
                     placeholderColor="#c4c3cb" 
                     style={styles.loginFormTextInput} 
                     secureTextEntry={true}
                     onChangeText={(password) => this.setState({password})}
                     value={password}
                     />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.props.signUp(this.state.firstName, 
                                             this.state.lastName, 
                                             this.state.userName, 
                                             this.state.password)}
              title="Sign Up"
            /><Button
            buttonStyle={styles.fbLoginButton}
            title="login"
            color="#3897f1"
            onPress={this._changeScreen}
            />
            
          </View>


        )
    }


    _loginScreen = ()=>{

      const { userName, password } = this.state

      return (

        <View style={styles.loginFormView}>
        <Text style={styles.logoText}>Chatris</Text>
        <TextInput placeholder="Username" 
                   placeholderColor="#c4c3cb"   
                   style={styles.loginFormTextInput}
                   onChangeText={(userName) => this.setState({userName})}
                   value={userName}
                    />
        <TextInput placeholder="Password" 
                   placeholderColor="#c4c3cb" 
                   style={styles.loginFormTextInput} 
                   secureTextEntry={true}
                   onChangeText={(password) => this.setState({password})}
                   value={password}
                   />
          <Button
            buttonStyle={styles.loginButton}
            onPress={() => this.props.logInUser(
                                           this.state.userName, 
                                           this.state.password)}
            title="Login"
          />
           
          <Button
            buttonStyle={styles.fbLoginButton}
            title="Sign Up"
            color="#3897f1"
            onPress={this._changeScreen}
          />
         
        </View>
        


      )
    }

    _changeScreen = ()=>{

      this.setState({signUp: !this.state.signUp})
    }



  render() {
      const {firstName, lastName, userName, password} = this.state
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          {this.state.signUp ? this._signUpScreen() : this._loginScreen()}
        </View>

      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
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
  
    

import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {
  OTSession,
  OTPublisher,
  OTSubscriber,
} from 'opentok-react-native';
// import { API_KEY, SESSION_ID, TOKEN } from 'react-native-dotenv';
// ApiClient.init(API_KEY, SESSION_ID, TOKEN);



export default class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    // this.key = process.env.API_KEY;
    // this.id = process.env.SESSION_ID; 
    // this.token = process.env.TOKEN; 
   
    this.key = '46334622';
    this.id = '2_MX40NjMzNDYyMn5-MTU1ODc5ODI0NTgyMX5RZTJqbUhPMjRBMVNjTHRVUXBvaWNUYWp-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NjMzNDYyMiZzaWc9OTFhMGUyZWRhY2M3YzI4ODJlOTNjMzg4MWEwMTA4MDE1ZDk5YjBjMzpzZXNzaW9uX2lkPTJfTVg0ME5qTXpORFl5TW41LU1UVTFPRGM1T0RJME5UZ3lNWDVSWlRKcWJVaFBNalJCTVZOalRIUlZVWEJ2YVdOVVlXcC1mZyZjcmVhdGVfdGltZT0xNTU4Nzk4MzAzJm5vbmNlPTAuNTExNTA3NjQ1MTgxMjIzOSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTU4ODg0NzAyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
 
  }
  render() {
    return (
      <View style={styles.container}>
        <OTSession apiKey={this.key} sessionId={this.id} token={this.token} />
        <OTPublisher style={{ width: 100, height: 100 }} properties={{ publishAudio: false }}/>
        <OTSubscriber style={{ width: 100, height: 100 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

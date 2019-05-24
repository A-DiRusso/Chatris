import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  OTSession,
  OTPublisher,
  OTSubscriber,
} from 'opentok-react-native';
// require('dotenv').config();



type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {

    }
    // this.key = process.env.API_KEY;
    // this.id = process.env.SESSION_ID; 
    // this.token = process.env.TOKEN; 
   
    this.key = '46334622';
    this.id = '1_MX40NjMzNDYyMn5-MTU1ODcwMzQ2MDYzN35mVHBSOGQ4S0xBVEhQTEZ2Q0Rhdm9tRjl-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NjMzNDYyMiZzaWc9MmM1NjU5Njg3NDI5ZGQ2ZWFiMzc2OGUxY2NlZmU2NWEzYmNlNWNiZjpzZXNzaW9uX2lkPTFfTVg0ME5qTXpORFl5TW41LU1UVTFPRGN3TXpRMk1EWXpOMzVtVkhCU09HUTRTMHhCVkVoUVRFWjJRMFJoZG05dFJqbC1mZyZjcmVhdGVfdGltZT0xNTU4NzAzNDk1Jm5vbmNlPTAuMDQzMzA4NzIxNjc5OTA0ODUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU1ODc4OTg5NCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
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

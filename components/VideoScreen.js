import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { OTSession, OTPublisher, OTSubscriber } from "opentok-react-native";
import io from "socket.io-client";

// import { API_KEY, SESSION_ID, TOKEN } from 'react-native-dotenv';
// ApiClient.init(API_KEY, SESSION_ID, TOKEN);

export default class VideoScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null
		};

		this.key = "46334622";
		this.sessionID = this.props.sessionID;
	}
	componentWillMount() {}

	componentDidMount() {}

	render() {
		return (
			<View style={styles.container}>
				<OTSession
					apiKey={this.key}
					sessionId={this.sessionID}
					token={this.props.token}
				/>
				<OTPublisher
					style={{ width: 0, height: 0 }}
					properties={{ publishAudio: false }}
				/>
				<OTSubscriber style={{ width: 320, height: 480 }} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		flex: 0,
		zIndex: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	}
});

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
			token: null,
			width: this.props.width,
			height: this.props.height
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
				<OTSubscriber
					style={{
						width: "100%",
						height: "100%",
						insertMode: "append"
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0)",
		borderColor: "black",
		borderWidth: 5
	}
});

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { OTSession, OTPublisher, OTSubscriber } from "opentok-react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

// import { API_KEY, SESSION_ID, TOKEN } from 'react-native-dotenv';
// ApiClient.init(API_KEY, SESSION_ID, TOKEN);

export default class VideoScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null,
			width: 20,
			height: 20,
		};

		this.key = "46334622";
		this.sessionID = this.props.sessionID;
		this.videoRef = React.createRef();
	}
	componentWillMount() {}

	componentDidMount() {
		console.log(this.videoRef)
		console.log(this.state.height)


		this.setState({
			width:this.videoRef.clientWidth,
			height:this.videoRef.clientHeight

		}, ()=>{
			console.log(this.state.width)
			console.log(this.state.height)
		})
	}


	render() {
		return (
			<View ref={videoRef => this.videoRef = videoRef} style={styles.container}>
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
						width:wp('82%'),
						height: hp("60%"),

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
	}
});

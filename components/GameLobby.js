import React, { Component } from "react";

import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import io from "socket.io-client";
import LobbyButton from "./LobbyButton";

export default class GameLobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: props.userData,
			lobbyData: null
		};
	}

	componentDidMount() {
		this.socket = io("https://chatris.bugbyte.dev");
		this.socket.emit("game lobby");
		this.socket.on("game room update", data => {
			return null;
		});

		this.socket.on("game lobby", lobbyData => {
			let lobbyArray = Object.keys(lobbyData);
			let lobby = [];
			lobbyArray.forEach(key => {
				lobby.push(lobbyData[key]);
			});
			this.setState({ lobbyData: lobby });
		});

		this.socket.on("create room", data => {
			const { sessionID, token, player } = data;

			this.props.setSessionID(sessionID, token, player);
		});

		this.socket.on("create token", data => {
			const { sessionID, token, player } = data;

			this.props.setSessionID(sessionID, token, player);
		});
	}

	componentWillUnmount() {
		this.socket.close();
	}

	_createGame = () => {
		this.socket.emit("create room", this.props.userData);
	};
	_enterGame = sessionID => {
		this.socket.emit("create token", sessionID);
	};
	render() {
		return (
			<View style={styles.gameLobby}>
				{this.state.lobbyData
					? this.state.lobbyData.map((gameObj, i) => {
							return (
								<LobbyButton
									key={i}
									sessionID={gameObj.sessionId}
									title={`${
										gameObj.userName.firstName
									}'s Game`}
									clickHandler={this._enterGame}
								/>
							);
					})
					: null}
					<View style={{marginTop:25}}>

				<Button onPress={this._createGame} title="CREATE NEW GAME" />
					</View>
			</View>
		);
	}
}

styles = StyleSheet.create({
	gameLobby: {
		flex: 1,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor: "#96D2E0"
	}
});

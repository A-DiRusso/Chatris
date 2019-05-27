import React, { Component } from 'react'
import { Button, Text, TouchableOpacity} from 'react-native';


export class LobbyButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            sessionID:this.props.sessionID
        }
    }
    render() {
        return (
            <TouchableOpacity
                onPressOut={()=>{
                    this.props.clickHandler(this.state.sessionID)
                }}
                color="#841584"
            >
                <Text>
                {this.props.title}
                </Text>

            </TouchableOpacity>
        )
    }
}

export default LobbyButton

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
                style={{
                    borderWidth:1,
                    borderColor:'rgb(17,132,252)' ,
                    alignItems:'center',
                    justifyContent:'center',
                    width:200,
                    height:50,
                    marginTop:5,
                    backgroundColor:'rgb(17,132,252)',
                    borderRadius:10,
                }}
            >
                <Text style={{color:"white", fontSize:20}} >
                {this.props.title}
                </Text>

            </TouchableOpacity>
        )
    }
}
styles = {
    button:{
        flex:0,
        padding:10,
        backgroundColor:'rgba(17,132,152)'


    },

}

export default LobbyButton

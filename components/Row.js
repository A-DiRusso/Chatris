import React from 'react'
import { View } from 'react-native'

export default function Row({row}) {

    _createRow =()=>{
        return (row.map((eaItem, i)=><View key={i} style={[styles.cell, styles[eaItem.type]]}/>))
    }
    return (
        <View style={styles.row} >
            {this._createRow()}
        </View>
    )
}

const styles ={

    row:{
        flex:0,
        flexDirection:'row'
    },
    cell:{

        width:25,
        height:25,
        backgroundColor:'white',
        borderWidth: 0.5,
        borderColor:'black'
    },
    line:{
        backgroundColor:'purple'
    },
    cube:{
        backgroundColor:'yellow'
    },
    romb1:{
        backgroundColor:'blue'
    },
    romb2:{
        backgroundColor:'green'
    },
    horse:{
        backgroundColor:'orange'
    },
    triangle:{
        backgroundColor:'red'
    }
    
}



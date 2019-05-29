import React from "react";
import { View, StyleSheet } from "react-native";
const greenBase = "rgb(141, 230, 84)";
const greenBorder = "rgb(91, 160, 38)";
const redBase = "rgb(208, 77, 72)";
const redBorder = "rgb(154, 0, 0)";
const yellowBase = "rgb(243, 254, 89)";
const yellowBorder = "rgb(181, 195, 46)";
const skyBlueBase = "rgb(145, 239, 232)";
const skyBlueBorder = "rgb(99, 173, 176)";
const navyBlueBase = "rgb(74, 80, 226)";
const navyBlueBorder = "rgb(6, 7, 168)";
const orangeBase = "rgb(226, 180, 80)";
const orangeBorder = "rgb(160, 116, 28)";
const purpleBase = "rgb(157, 78, 232)";
const purpleBorder = "rgb(98, 15, 174)";

export default function Row({ row }) {
	_createRow = () => {
		return row.map((eaItem, i) => (
			<View key={i} style={[styles.cell, styles[eaItem.type]]} />
		));
	};
	return <View style={styles.row}>{this._createRow()}</View>;
}

const styles = StyleSheet.create({
	row: {
		position: "relative",
		zIndex: 1,

		flexDirection: "row"
	},
	cell: {
		width: 32,
		height: 32,
		backgroundColor: "rgba(0,0,0,0)",
		borderWidth: 0.5,
		borderColor: "#E2F5FA"
	},
	line: {
		backgroundColor: purpleBase,
		borderColor: purpleBorder,
		borderTopColor: '#E2F5FA',
		padding: 2,
		borderWidth: 2
	},
	cube: {
		backgroundColor: yellowBase,
		borderColor: yellowBorder,
		borderTopColor: '#E2F5FA',
		padding: 2,
		borderWidth: 2
	},
	romb1: {
		backgroundColor: skyBlueBase,
		borderColor: skyBlueBorder,
		borderTopColor: '#E2F5FA',
		padding: 2,
		borderWidth: 2
	},
	romb2: {
		backgroundColor: greenBase,
		borderColor: greenBorder,
		borderTopColor: '#E2F5FA',
		padding: 2,
		borderWidth: 2
	},
	horse: {
		backgroundColor: orangeBase,
		borderColor: orangeBorder,
		borderTopColor: '#E2F5FA',
		padding: 2,
		borderWidth: 2
	},
	triangle: {
		backgroundColor: redBase,
		borderColor: redBorder,
		borderTopColor: '#E2F5FA',
		padding: 2,
		borderWidth: 2
	}
});

/*
button base:
    green:141 230 84        'rgb(141, 230, 84)'
    red: 208 77 72          'rgb(208, 77, 72)'
    yellow: 243 254 89      'rgb(243, 254, 89)'
    sky blue: 145 239 232   'rgb(145, 239, 232)'
    navy blue: 74 80 226    'rgb(74, 80, 226)'
    orange: 226 180 80      'rgb(226, 180, 80)'
    purple 157 78 232       'rgb(157, 78, 232)'

button outline:
    green: 91 160 38        'rgb(91, 160, 38)'
    red: 154 0 0            'rgb(154, 0, 0)'
    yellow: 181 195 46      'rgb(181, 195, 46)'
    sky blue: 99 173 176    'rgb(99, 173, 176)'
    navy blue:6 7 168       'rgb(6, 7, 168)'
    orange: 160 116 28      'rgb(160, 116, 28)'
    purple: 98 15 174       'rgb(98, 15, 174)'

*/

import React, { Component } from 'react'
import {View, Button, Text, TouchableOpacity, Image, TouchableHighlight, StyleSheet} from 'react-native'
import Row from './Row'
import {Figures} from '../assets/figures/Figures'
import VideoScreen from './VideoScreen'
import {throttle, debounce} from 'throttle-debounce'
import lodash from 'lodash'



export class Tetris extends Component {
    constructor(props){
        super(props);
        this.state={
            board:[],
            height:15,
            width:10,
            currentFigure:null,
            nextFigure:null,
            score:0,
            isLoser:false,
            isWinner:false,
            gameSpeed:1000,
            defaultSpeed:1000,
            fastSpeed:100,
            interval:null,
            rotate:false,
            figureTypes:['horse','romb2','romb1','cube','line'],
            movingFast:false,
            movingSlow:false,
            stepCounter:0

        }
    }
    componentDidMount(){
        this._createBoard()
    }


    _mapFirstPieceToBoard= ()=>{
        const {figureTypes} = this.state

        let randomFigure = figureTypes[Math.floor(Math.random() * figureTypes.length)]

        let currentFigure = Figures.find(eaObj=> eaObj.type === randomFigure)

        let updatedBoard = this.state.board;
        currentFigure.path.forEach((eaArray)=>{
            updatedBoard[eaArray[1]][eaArray[0]] = {...randomFigure, active:'active'}
        })

        this.setState({board:updatedBoard, currentFigure:{...currentFigure}}, this._gameLoop)
    }



    _createBoard = ()=>{
        const {board, height, width} = this.state
        let newBoard = []
        for (let y = 0; y < height; y++){
            newBoard.push([])
            for (let x = 0; x< width; x++){
                newBoard[y][x] = {
                                    type:'empty',
                                    active: ''
                                }
            }
        }

        this.setState({board:newBoard}, this._mapFirstPieceToBoard)
    }
    _returnBoard = ()=>{
        return (this.state.board.map((eaRow, i)=><Row row={eaRow} key={i}/>))
    }

    _gameLoop = ()=>{
        this.setState({
            interval:setInterval(()=>{
                this._loopLogic()
                this._checkRows()
            }, this.state.gameSpeed)
        })
    }

    
    _loopLogic = ()=>{
        let isFigureMovable = this._isFigureMovable()
        if(this.state.currentFigure){
                // this._checkGameSpeed()
            this._checkForNextFigure()
            if (isFigureMovable){
                this._moveCurrentFigure()
            }else{
                let filledBoard = this.state.board.map(eaRow => eaRow.map(eaCell => eaCell.active === 'active' ? {...eaCell, active:'filled'} : eaCell))

                this.setState({
                    currentFigure:{...this.state.nextFigure, active:"active"},
                    board:filledBoard,
                    nextFigure:null
                })
            }
        } else{
            const {figureTypes} = this.state

            let randomFigure = figureTypes[Math.floor(Math.random() * figureTypes.length)]

            let currentFigure = Figures.find(eaObj=> eaObj.type === randomFigure)
            this.setState({currentFigure})
        }
        this._updateBoard()
    }

    _moveCurrentFigure = ()=>{
        let stepFigure = {...this.state.currentFigure}
        stepFigure.path = stepFigure.path.map((eaPathArray)=>{
            return [eaPathArray[0], eaPathArray[1] + 1]
        })
        this.setState({currentFigure:{...stepFigure, active:"active"}})
    }
    _checkGameSpeed = ()=>{
        const {speed, defaultSpeed} = this.state
        if (speed !== defaultSpeed){
            this.setState({gameSpeed:defaultSpeed})
            clearInterval(this.state.interval)
            this._gameLoop()
            return
        }
    }


    _checkForNextFigure = ()=>{
        if (!this.state.nextFigure){
            const {figureTypes} = this.state

            let randomFigure = figureTypes[Math.floor(Math.random() * figureTypes.length)]

            let nextFigure = Figures.find(eaObj=> eaObj.type === randomFigure)

            this.setState({nextFigure})
        }
    }

    _isFigureMovable = ()=>{
        let isMovable = true
        this.state.board.map((eaRow, rowIndex)=>{
            eaRow.map((eaCell, cellIndex)=>{
                this.state.currentFigure.path.map(activeCell =>{

                    let isBoardCellFilled = (eaCell.active === 'filled')
                    let willFigureCollide = (activeCell[0] === cellIndex && activeCell[1] + 1 === rowIndex)
                    let willBoardEnd = (activeCell[1]+1 === this.state.board.length)

                    if(willBoardEnd){
                        isMovable = false
                    }
                    if (isBoardCellFilled && willFigureCollide){
                        isMovable = false
                    }
                })
            })
        })
        return isMovable
    }
    _moveLeft = e=>{
        const {currentFigure, board} = this.state
        if(e.keyCode !== 37 || !currentFigure){
            return null
        }
        let canMoveLeft = true;
        currentFigure.path.map(eaPath =>{
            if (!(eaPath[0] - 1 >= 0)|| (board[eaPath[1]][eaPath[0] - 1].active === 'filled')){
                canMoveLeft = false;
            }
        })
        if (canMoveLeft){

            let myPath = currentFigure.path.map(eaFig=>[eaFig[0] - 1, eaFig[1]])
            this.setState({currentFigure: {...this.state.currentFigure, path:myPath, active:"active"}},this._updateBoard)
        }
    }
    _moveRight = e=>{
        const {currentFigure, board, width} = this.state

        if(e.keyCode !== 39 || !currentFigure){
            return null
        }
        let canMoveRight = true;
        currentFigure.path.map(eaPath =>{
            if (!(eaPath[0] + 1 < width)|| (board[eaPath[1]][eaPath[0] + 1].active === 'filled')){
                canMoveRight = false;
            }
            
        })
            if (canMoveRight){

            let myPath = currentFigure.path.map(eaFig=>[eaFig[0] + 1, eaFig[1]])
            this.setState({currentFigure: {...this.state.currentFigure, path:myPath, active:"active"}},this._updateBoard)
        }
    }
    _defaultSpeed = ()=>{
        const {defaultSpeed, fastSpeed, movingFast, movingSlow, stepCounter} = this.state
        if(!movingFast && !movingSlow){
            clearInterval(this.state.interval)
            this.setState({
                gameSpeed:defaultSpeed,
                movingSlow:true
            }, ()=>{
                this._gameLoop()
            })
        }else{
            this.setState({movingFast:false})
        }


    }

    _moveDown = ()=>{
        const {defaultSpeed, fastSpeed, movingSlow, movingFast, stepCounter} = this.state
        if(stepCounter > 0){
            clearInterval(this.state.interval)
            this.setState({
                gameSpeed: fastSpeed,
                stepCounter:0,
                movingFast:true
            }, ()=>{
                this._gameLoop()
            })
        }


    }

    

    _rotateFigure = ()=>{
        let isFigureMovable = this._isFigureMovable()
        if(isFigureMovable){

            const {currentFigure, width, board} = this.state
    
            let defaultFigure = Figures.find(eaFigure => (eaFigure.type === currentFigure.type && eaFigure.id === currentFigure.id))
            let offsetLeft = currentFigure.path[1][0] - defaultFigure.path[1][0]
            let offsetTop = currentFigure.path[1][1] - defaultFigure.path[1][1]
            
            let nextFigure = {...Figures.find(eaFigure => (eaFigure.type === currentFigure.type && eaFigure.id === currentFigure.id + 1))}
            if (!nextFigure.id){
                nextFigure = {...Figures.find(eaFigure => (eaFigure.type === currentFigure.type && eaFigure.id === 1))}
            }
            let canRotate = true;
    
            nextFigure.path = nextFigure.path.map(eaPath => [eaPath[0] + offsetLeft, eaPath[1] + offsetTop])
    
            nextFigure.path.map(eaPath =>{
                if (!(eaPath[0] >= 0) || !(eaPath[0] < width) || board[eaPath[1]][eaPath[0]].active === 'filled'){
                    canRotate = false
                }
            })
            if (nextFigure && canRotate){
                this.setState({
                    currentFigure:{...nextFigure, active:"active"}
                }, this._updateBoard)
            }
        }
    }

    _updateBoard = ()=>{
        const {currentFigure} = this.state
        let activeBoard = this.state.board.map(row =>{
            return row.map(eaObj => eaObj.active === 'active' ? {type:'empty', active:''} : eaObj)
        })
        let willCurrentFigureCollide = false
        this.state.currentFigure.path.map(eaPathArray=>{
            let eaCell = activeBoard[eaPathArray[1]][eaPathArray[0]]
            if(eaCell.active !== 'filled'){
                activeBoard[eaPathArray[1]][eaPathArray[0]] = {...currentFigure, active:'active'}
                
            }else{
                clearInterval(this.state.interval)
                this.setState({isLoser:true})
                willCurrentFigureCollide = true
            }
        })
        if(!willCurrentFigureCollide){
            this.setState({
                board:activeBoard,
                rotate:false,
                stepCounter: this.state.stepCounter + 1
            })
        }
        if(!this.state.movingFast){
            clearInterval(this.state.interval)
            this.setState({
                gameSpeed:this.state.defaultSpeed
            }, ()=>{
                this._gameLoop()
            })
        }
    }
    _checkRows = ()=> {
        const {board, width} = this.state
        let fullRows = []
        board.map((row, rowIndex) => {
            let eaRow = row.map(eaObj=> eaObj.active)
            if (eaRow.indexOf('') === -1 && eaRow.indexOf('active') === -1) {
                fullRows.push(rowIndex)
            }
        });
        if(fullRows.length){
            let updatedBoard = board
            fullRows.forEach(rowIndex=>{
                updatedBoard.splice(rowIndex, 1)
                let newRow = []
                for (let x = 0; x< width; x++){
                    newRow[x] = {
                                        type:'empty',
                                        active: ''
                                    }
                }
                updatedBoard.unshift(newRow)
                this.setState({score:this.state.score += 1})
            })
            this.setState({board:updatedBoard})
        }
    }



    render() {
        return (
        <View style={styles.page}>
            <View style={styles.boardContainer}>
                {this.state.board.length > 0 ? this._returnBoard() : null}
            <VideoScreen sessionID={this.props.sessionID} token={this.props.token}/>
            </View>
                <Text>score: {this.state.score}</Text>
            
            <View style={styles.controllerContainer}>
                {/* <View>
                    <Button 
                        onPress={()=>{
                            this._rotateFigure()
                        }}
                        title=" ^ "
                        color="#841584"
                        accessibilityLabel="Rotate"
                    />
                </View> */}




                {/* <Text>   </Text> */}
                <View style={styles.threeButtonContainer}>

                    {/* <Button 
                        onPress={()=>{
                            this._moveLeft({keyCode:37})
                        }}
                        title="  <  "
                        color="#841584"
                        accessibilityLabel="Move left"
                        />
                        <Text>   </Text>
                        <Button 
                        onPress={()=>{
                            this._moveRight({keyCode:39})
                        }}
                        title="  >  "
                        color="#841584"
                        accessibilityLabel="Move right"
                    /> */}
                    <TouchableOpacity style={styles.arrowButtons} onPress={()=>{this._moveLeft({keyCode:37})}}>
                        <Image
                            // style={styles.button}
                            source={(require('../assets/arrows/left-arrow-button.png'))}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowButtons} onPress={()=>{this._rotateFigure()}}>
                        <Image
                            // style={styles.button}
                            source={(require('../assets/arrows/rotate-arrow-button.png'))}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowButtons}  onPress={()=>{this._moveRight({keyCode:39})}}>
                        <Image
                            // style={styles.button}
                            source={(require('../assets/arrows/right-arrow-button.png'))}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.downButton}>
                    <TouchableOpacity 
                        onPressIn={()=>{this._moveDown()}}
                        onPressOut={()=>{this._defaultSpeed()}}
                        >
                        <Image
                            // style={styles.button}
                            source={(require('../assets/arrows/down-arrow-button.png'))}
                        />
                </TouchableOpacity>
                </View>
            </View>
            {/* <Text>   </Text> */}
        </View>
        )
    }
}

const styles =StyleSheet.create({
    page:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    boardContainer:{
        position:'relative',
        zIndex:1,
        flex:4,
        justifyContent:'center',
        alignItems:'center'
    },
    controllerContainer:{
        flex:1,
        flexDirection:'column',
        // justifyContent: 'space-around'

    },
    threeButtonContainer:{
        zIndex:1,
        flex:0,
        flexDirection:'row',
        padding: 10,
        justifyContent: 'space-evenly'

    },
    downButton:{
        zIndex:1,
        flex:0,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    arrowButtons:{
        flex: 0,
        justifyContent: 'space-around'
    },
    button:{
        backgroundColor:"#841584",
        color:"white"
    }
    

})

export default Tetris




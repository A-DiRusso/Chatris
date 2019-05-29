import React, { Component } from 'react'
import {View, Button, Text, TouchableOpacity, Image, TouchableHighlight, StyleSheet} from 'react-native'
import Row from './Row'
import {Figures} from '../assets/figures/Figures'
import VideoScreen from './VideoScreen'
import io from 'socket.io-client'


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
            stepCounter:0,
            secondBoard:null,
            secondPlayer:null,
            secondScore:null,
            videoWidth: 0,
            videoHeight: 0
            
        }
        this.boardRef = React.createRef();
    }
    componentDidMount(){
        const {userData, sessionID, player} =  this.props
        // this.socket = io("http://10.150.20.113:3000");
        this.socket = io('http://10.150.21.157:3001');
        this.socket.emit('game room setup', {userData, sessionID, player})
        this.socket.on('game room update', data =>{

            if(data[sessionID]){
                if(data[sessionID]['player2']){
                    if(player === 'player1'){
                        const {board, score, userData} = data[sessionID]['player2']
                        this.setState({
                            secondBoard:board,
                            secondScore:score,
                            secondPlayer:userData
                        })
                    }else if (player === 'player2'){
                        const {board, score, userData} = data[sessionID]['player1']
                        this.setState({
                            secondBoard:board,
                            secondScore:score,
                            secondPlayer:userData
                        })
                    }
        }}
        })




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

        this.setState({
            board:updatedBoard, 
            currentFigure:{...currentFigure},
            videoWidth: this.boardRef.current.clientWidth,
            videoHeight: this.boardRef.current.clientHeight
        }, 
            this._gameLoop)
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
                const {sessionID, player} = this.props
                const {board, score} = this.state
                this.socket.emit('game room update', {sessionID, player, board, score})
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
        const {currentFigure, score} = this.state
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
            <View style={styles.versus}>
                    <View style={styles.p1}>
                        <Text style={styles.versusText}>{this.props.userData.firstName}</Text>
                        <Text style={styles.scoreText}>{this.state.score}</Text>
                    </View>
                    <View style={styles.p2}>
                        <Text style={styles.versusText}>
                        {this.state.secondPlayer? this.state.secondPlayer.firstName: null}
                        </Text>
                        <Text style={styles.scoreText}>
                        {this.state.secondScore}
                        </Text>
                    </View>
                </View>
            <View style={styles.boardContainer} ref={this.boardRef}>
                {this.state.board.length > 0 ? this._returnBoard() : null}
                
                <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 0}}>
                    <VideoScreen width={this.state.videoWidth} height={this.state.videoHeight} sessionID={this.props.sessionID} token={this.props.token}/>
                </View>
            </View>
            


            <View style={styles.controllerContainer}>
            
                <View style={styles.threeButtonContainer}>
                    <TouchableOpacity style={styles.arrowButtons} onPress={()=>{this._moveLeft({keyCode:37})}}>
                        <Image
                            // style={styles.button}
                            source={(require('../assets/arrows/left-arrow-60.png'))}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowButtons} onPress={()=>{this._rotateFigure()}}>
                        <Image
                            // style={styles.button}
                            source={(require('../assets/arrows/rotate-button-60.png'))}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowButtons}  onPress={()=>{this._moveRight({keyCode:39})}}>
                        <Image
                            // style={styles.button}
                            source={(require('../assets/arrows/right-arrow-60.png'))}
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
                            source={(require('../assets/arrows/down-arrow-60.png'))}
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
        justifyContent:'center',
        backgroundColor: '#96D2E0',
    },
    versus:{
        flex:.8,
        zIndex:1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'flex-end',
        // backgroundColor: 'purple'
        
    },
    p1:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    p2:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    versusText:{
        color: '#E2F5FA',
        fontWeight:'bold',
        fontSize:30
    },
    scoreText:{
        color: '#177EE8',
        fontWeight:'bold',
        fontSize:30
    },
    boardContainer:{
        position:'relative',
        zIndex:1,
        flex:4,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 7,
        marginRight: 7
        },
    controllerContainer:{
        flex:1,
        flexDirection:'column',
        paddingBottom: 60
        // justifyContent: 'space-around'
    },
    threeButtonContainer:{
        zIndex:1,
        flex:0,
        width:"100%",
        flexDirection:'row',
        paddingTop: 25,
        justifyContent: 'space-evenly'
    },
    downButton:{
        zIndex:1,
        flex:0,
        marginTop:20,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    arrowButtons:{
        flex: 0,
        justifyContent: 'space-around'
    },
    emptyVersus: {
        position: 'absolute',
        flex: 1,
        zIndex: 0
    }
})

export default Tetris




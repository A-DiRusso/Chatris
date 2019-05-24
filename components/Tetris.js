import React, { Component } from 'react';
import { View, PanResponder, Dimensions, TouchableOpacity } from 'react-native';
import Row from './Row';
import { Figures } from '../assets/figures/Figures';






export class Tetris extends Component {
    constructor(props){
        super(props);
        this.position = (0, 0);
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
            defauldtSpeed:1000,
            fastSpeed:100,
            interval:null,
            rotate:false

        }
    }
    
    componentDidMount(){
        this._createBoard(),
        this._panResponder =  () => {PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
            //     this.position.setValue({x: gestureState.dx, y: gestureState.dy})
            // }, onPanResponderRelease: (evt, gestureState) => {
            //     if (gestureState.dy > -12) {
            //         console.log('swiped up');
            //     }
                console.warn("Swipe Moves", gestureState);
            
            }       
        });}
    }
    // _panResponder = PanResponder.create({
    //     onStartShouldSetPanResponder: (evt, gestureState) => true,
    //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    //     onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    //     onPanResponderGrant: (evt, gestureState) => {
    //         console.log('Grant');
    //     },
    //     onPanResponderMove: (evt, gestureState) => {
    //         console.log('Move');
    //     },
    //     onPanResponderTerminationRequest: (evt, gestureState) => true,
    //     onPanResponderRelease: (evt, gestureState) => {
    //         console.log('Release');
    //     },
    //     onPanResponderTerminate: (evt, gestureState) => {
    //         return true;
    //     }
    // })


    _mapFirstPieceToBoard= ()=>{

        let randomFigure = Figures[Math.floor(Math.random() * Figures.length)]

        let updatedBoard = this.state.board;
        randomFigure.path.forEach((eaArray)=>{
            updatedBoard[eaArray[1]][eaArray[0]] = {...randomFigure, active:'active'}
        })

        this.setState({board:updatedBoard, currentFigure:randomFigure}, this._gameLoop)
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
                this._moveRight({keyCode:39})
                this._loopLogic()
            }, this.state.gameSpeed)
        })
    }

    
    _loopLogic = ()=>{
        let isFigureMovable = this._isFigureMovable()
        if(this.state.currentFigure){
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
            let randomFigure = Figures[Math.floor(Math.random() * Figures.length)]
            this.setState({currentFigure:randomFigure})
        }
        if (this.state.rotate) {
            this._rotateFigure()
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


    _checkForNextFigure = ()=>{
        if (!this.state.nextFigure){

            let randomFigure = Figures[Math.floor(Math.random() * Figures.length)]

            this.setState({nextFigure:{...randomFigure}})
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

    _rotateFigure = ()=>{
        const {currentFigure, width, board} = this.state

        let defaultFigure = Figures.find(eaFigure => (eaFigure.type === currentFigure.type && eaFigure.id === currentFigure.id))

        let offsetLeft = currentFigure.path[0][0] - defaultFigure.path[0][0]
        let offsetTop = currentFigure.path[0][1] - defaultFigure.path[0][1]

        let nextFigure = {...Figures.find(eaFigure => (eaFigure.type === currentFigure.type && eaFigure.id === currentFigure.id + 1))}
        if (!nextFigure.id){
            nextFigure = {...Figures.find(eaFigure => (eaFigure.type === currentFigure.type && eaFigure.id === 1))}
        }
        let canRotate = false;

        nextFigure.path = nextFigure.path.map(eaPath => [eaPath[0] + offsetLeft, eaPath[1] + offsetTop])

        nextFigure.path.map(eaPath =>{
            if ((eaPath[0] >= 0) || (eaPath[0] < width) || !board[eaPath[1]][eaPath[0]].active === 'filled'){
                canRotate = true;
            }
        })

        if (nextFigure && canRotate){
            this.setState({
                currentFigure:{...nextFigure, active:"active"}
            })
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
                rotate:false
            })
        }



    }

    // _moveFast = (e) => {
    //     // if they swipe down
    //     //then gameSpeed = this.state.fastSpeed
    // }
    


    render() {
        return (
        // <View style={styles.boardContainer} {...this._panResponder.panHandlers}>
        <View style={styles.boardContainer} >
            {this.state.board.length > 0 ? this._returnBoard() : null}
            {/* <View {...this._panResponder.panHandlers}> */}
            
                 
            {/* </View> */}
         {/* <TouchableOpacity  onPress={() => {
                console.log('you pressed the Touch');
            }}>
                <Image style={styles.img} source={require('../images/robots-dev.png')}/>
            </TouchableOpacity> */}
        </View>
        )
    }
}

const styles ={
    boardContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
}

export default Tetris




import React, { useEffect, useState } from 'react'
import Chessboard from '../components/Chessboard.jsx'
import useSocket from '../hooks/useSocket.jsx'
import {Chess} from 'chess.js'
import "./Game.css"


export const INIT_GAME = "init"
export const MOVE = 'move'
export const GAME_OVER = 'gameover'


const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const [isStarted, setIsStarted] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)
    const [c,setC] = useState(null)
    const [alert,setAlert] = useState(null)

    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage=(event)=>{
            const message= JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board())
                    console.log("GAME INITIALIZED")
                    setIsStarted(true);
                    setC(message.payload.color)
                    console.log(c)
                    setAlert(`You are ${message?.payload?.color ==="w" ? "White":"Black"}`)
                    break;
                case MOVE:
                    chess.move(message.move)
                    setAlert(message.move.from + " " + message.move.to )
                    setBoard(chess.board())
                    if(chess.isCheck()){
                        setAlert("Check")
                    }
                    break;
                case GAME_OVER:
                    console.log("Game over")
                    setAlert("Game Over")
                    break;
                default:
                    break;
            }
        }
    },[socket])


    const initHandler=()=>{
        socket.send(JSON.stringify({
            type: INIT_GAME
        }))
        setIsWaiting(true)
    }


    if(!socket) return <div>Connecting...</div>
    return (
    <div className='justify-center flex p-4'>
            <div className='game-container flex gap-[10vw]'>
                <div className='board'>
                    <Chessboard className='chessboard' chess={chess} board={board} socket={socket} setBoard={setBoard} c={c} setAlert={setAlert}/>
                </div>
                <div>
                {!isStarted && <div className='bg-blue-400 w-5 px-8 py-8 flex justify-center h-4 align-center items-center' >
                    {isWaiting === false ? <button onClick={initHandler}>PLAY</button> : <h4>Finding...</h4>}
                </div>}
                {<h1 className='p-5 text-center text-zinc-300  text-xl'> {alert}</h1>}
                </div>
            </div>
        </div>
  )
}

export default Game
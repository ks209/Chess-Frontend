import React, { useEffect, useState } from 'react'
import Chessboard from '../components/Chessboard.jsx'
import useSocket from '../hooks/useSocket.jsx'
import {Chess} from 'chess.js'


export const INIT_GAME = "init"
export const MOVE = 'move'
export const GAME_OVER = 'gameover'


const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const [isStarted, setIsStarted] = useState(false)
    const [c,setC] = useState(null)

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
                    console.log(message.payload)
                    break;
                case MOVE:
                    chess.move(message.move)
                    setBoard(chess.board())
                    console.log(board)
                    break;
                case GAME_OVER:
                    console.log("Game over")
                        break;
                default:
                    break;
            }
        }
    },[socket])


    if(!socket) return <div>Connecting...</div>
    return (
    <div className='justify-center flex'>
        <div className='pt-8 w-screen'>
            <div className='grid grid-cols-2 gap-4'>
                <div className=' w-full flex'>
                    <Chessboard chess={chess} board={board} socket={socket} setBoard={setBoard} c={c}/>
                </div>
                {!isStarted && <div className='bg-blue-400 w-5 px-8 py-8 flex justify-center h-4 align-center items-center' >
                    <button onClick={()=>{
                        socket.send(JSON.stringify({
                            type: INIT_GAME
                        }))
                    }}>PLAY</button>
                </div>}
            </div>
        </div>
        </div>
  )
}

export default Game
import React, { useEffect, useState } from 'react'

const WS_URL = "wss://chess-backend-1-rxuc.onrender.com"
// const WS_URL = "ws://localhost:3000"

//ws://chess-backend-1-rxuc.onrender.com

const useSocket = () => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
      
      const ws = new WebSocket(WS_URL)

      ws.onerror = (err) => {
        console.log(err)
      }

      ws.onopen = () =>{
        console.log("connected",ws);
        setSocket(ws);
      }

      ws.onclose = () => {
        console.log("disconnected",ws)
      }
    
      return () => {

      }
    }, [])
    
  return socket;
}

export default useSocket

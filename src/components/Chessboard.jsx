import React, { useState } from 'react';
import "./Chessboard.css"

function ChessBoard({ board, socket, chess, setBoard,c }) {
  const [from, setFrom] = useState(null);

  const handleClick = (rowIndex, colIndex) => {
    const to = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
    
    if (!from) {
      setFrom(to);
    } else {
      const move = { from, to };
      try {
        if(chess.turn() !== c ){
          console.log(c)
          return
        }
        chess.move(move);
        setBoard(chess.board());
        socket.send(JSON.stringify({ type: 'move', move }));
      } catch (error) {
        console.error('Error:', error.message);
        setFrom(null);
        return;
      }
      setFrom(null);
    }
  };
  

  return (
    <div className= {`chess-board h-screen w-full ${c==='b' ? "rotate-180 -mt-20" : "rotate-0"}`}>
      {board.map((row, rowIndex) => (
        <div className="flex items-center justify-center w-full" key={rowIndex}>
          {row.map((square, colIndex) => (
            <div
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`square ${
                !chess.inCheck() || (square?.type !== "k")
                  ? ((rowIndex + colIndex) % 2 === 0 ? 'bg-green-300' : 'bg-green-600')
                  : 'bg-red-500'
              } border border-black w-[80px] h-[80px] flex items-center justify-center`}
              key={`${rowIndex}-${colIndex}`}
            >
              {square && <img className={`w-18 ${c==='b' ? "rotate-180" : "rotate-0"} `}  src={`./${square?.color==='b' ? 'b'+square.type : 'w'+square.type}.png`}></img>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;

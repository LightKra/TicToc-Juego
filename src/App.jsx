import { useEffect, useState } from 'react'
import './App.css'
import { Square } from './components/Square.jsx';
import { WINNER_COMBOS, TURNS } from './constants.js';
import { checkWinner } from './logic/checkWinner.js';
import { WinnerModel } from './components/Board.jsx';
import { checkEndGame } from './components/Board.jsx';

function App() {
 const [board, setBoard] = useState(()=>{
  const boardFromStorage = window.localStorage.getItem("board");
  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
 });

 const [turn, setTurn] = useState(()=>{
  const turnFromStorage = window.localStorage.getItem("turn");
  return turnFromStorage ? turnFromStorage : TURNS.X;
 });
 const [winner, setWinner] = useState(null);

 const updateBoard = (index)=>{
  if(board[index] || winner) return;
  //actualziar tablero
  const newBoard = [...board];
  newBoard[index] = turn;
  setBoard(newBoard);
  //actualizar turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);
  //guardar patidad
  window.localStorage.setItem("board", JSON.stringify(newBoard));
  window.localStorage.setItem("turn", newTurn);
  //revisar ganador
  const newWinner = checkWinner(newBoard);
  if(newWinner){
    setWinner(newWinner);
  }else if(checkEndGame(newBoard)){
    setWinner(false);
  }

 }
 const resetGame = ()=>{
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
 }
  return (
    <main className='board'>
      <h1>TIC TAC</h1>
      <button onClick={resetGame}>Resete Juego</button>
      <section className='game'>
        {board.map((item, index)=>{
          return(
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {item}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModel winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App

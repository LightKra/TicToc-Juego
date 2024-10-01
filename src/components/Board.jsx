import { Square } from "./Square.jsx";

export const WinnerModel = ({winner, resetGame})=>{
    if(winner === null) return;
    const winnerText = winner === false ? "Empate" : "Gano";
    
    return (
        <section className='winner'>
              <div className='text'>
                <h2>
                  {winnerText}
                </h2>
                <header className='win'>
                  {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar De Nuevo</button>
                </footer>
              </div>
        </section>
    )
}

export  const checkEndGame = (boardToCheck)=>{
  return boardToCheck.every(item=> item !== null);
 }
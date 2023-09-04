import { useState } from 'react'

const TURNS = {
  X: '×',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className= `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBINATIONS = [
  [0, 1, 2], // primera fila
  [3, 4, 5], // segunda fila
  [6, 7, 8], // tercera fila
  [0, 3, 6], // primera columna
  [1, 4, 7], // segunda columna
  [2, 5, 8], // tercera columna
  [0, 4, 8], // diagonal izquierda
  [2, 4, 6] // diagonal derecha
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // recorremos las combinaciones ganadoras
    for (const combo of WINNER_COMBINATIONS) {
      const [a, b, c] = combo
      // si las tres casillas de la combinación actual son iguales
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a] // retornamos el simbolo ganador
      }
    }
    return null // si no hay ganador
  }


  
  const updateBoard = (index) => {
    // actualizamos el tablero solo si la casilla está vacía
    if (board[index] || winner ) return

    // copiamos el tablero actual y actualizamos la casilla seleccionada
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiamos el turno 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // comprobamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {  
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'> 
      {
        board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}
export default App
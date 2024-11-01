import './App.css'
import Board from './components/Board'
import { createContext } from 'react'

export const TestContext = createContext();

function App() {

  const solution = [
    [1, 1, 1, 1, 1],
    [1, 1, -1, 1, 1],
    [1, -1, 1, -1, 1],
    [-1, 1, -1, -1, 1],
    [-1, 1, 1, -1, -1]
  ]

  return (
    <>
      <Board solution={solution}/>
    </>
  )
}

export default App

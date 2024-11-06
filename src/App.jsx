import './App.css'
import Board from './components/Board'
import { createContext } from 'react'

export const TestContext = createContext();

function App() {

  const solution5 = [
    [1, 1, 1, 1, 1],
    [1, 1, -1, 1, 1],
    [1, -1, 1, -1, 1],
    [-1, 1, -1, -1, 1],
    [-1, 1, 1, -1, -1]
  ]

  const solution10 = [
    [1, 1, 1, 1, -1, 1, 1, -1, -1, 1],
    [-1, 1, 1, -1, -1, -1, 1, -1, 1, -1],
    [-1, 1, 1, 1, -1, 1, 1, 1, 1, -1],
    [1, -1, -1, 1, -1, -1, 1, 1, -1, 1],
    [-1, 1, 1, 1, -1, 1, 1, -1, -1, -1],
    [1, 1, -1, 1, 1, 1, 1, -1, 1, 1],
    [-1, 1, -1, 1, -1, 1, 1, -1, 1, 1],
    [1, -1, 1, 1, 1, 1, 1, 1, -1, 1],
    [-1, 1, -1, -1, 1, -1, -1, -1, 1, -1],
    [1, 1, 1, -1, -1, 1, 1, 1, -1, 1]
  ]

  
  return (
    <>
      <Board solution={solution5}/>
    </>
  )
}

export default App

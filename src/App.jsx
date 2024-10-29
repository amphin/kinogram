import './App.css'
import Board from './components/Board'
import { createContext } from 'react'

export const TestContext = createContext();

function App() {

  const solution = [
    [true, true, true, true, true],
    [true, true, false, true, true],
    [true, false, true, false, true],
    [false, true, false, false, true],
    [false, true, true, false, false]
  ]

  return (
    <>
      <Board solution={solution}/>
    </>
  )
}

export default App

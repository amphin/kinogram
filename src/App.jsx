import './App.css'
import Board from './components/Board'
import Grid from './components/Grid'
import HintPane from './components/HintBar'
import Test from './components/Test'
import { createContext } from 'react'

export const TestContext = createContext();

function App() {

  return (
    <>
      
      {/* <div style={{padding: '5px'}}>
        <Block x={0} y={0}/>
      </div> */}
      <Board />
      {/* <Grid dims={10}/> */}
      {/* <HintPane vertical={true}/> */}
      {/* <TestContext.Provider value="context">
        <Test/>
      </TestContext.Provider> */}
    </>
  )
}

export default App

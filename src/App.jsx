import './App.css'
import Board from './components/Board'
import Test from './components/Test'
import { useState } from 'react'

function App() {
  const [testState, setTestState] = useState(0);
  let testComponent = <Test stateProp={testState} />;
  
  const solution5 = [
    [ 1,  1,  1,  1,  1],
    [ 1,  1, -1,  1,  1],
    [ 1, -1,  1, -1,  1],
    [-1,  1, -1, -1,  1],
    [-1,  1,  1, -1, -1]
  ]

  const solution10 = [
    [ 1,  1,  1,  1, -1,  1,  1, -1, -1,  1],
    [-1,  1,  1, -1, -1, -1,  1, -1,  1, -1],
    [-1,  1,  1,  1, -1,  1,  1,  1,  1, -1],
    [ 1, -1, -1,  1, -1, -1,  1,  1, -1,  1],
    [-1,  1,  1,  1, -1,  1,  1, -1, -1, -1],
    [ 1,  1, -1,  1,  1,  1,  1, -1,  1,  1],
    [-1,  1, -1,  1, -1,  1,  1, -1,  1,  1],
    [ 1, -1,  1,  1,  1,  1,  1,  1, -1,  1],
    [-1,  1, -1, -1,  1, -1, -1, -1,  1, -1],
    [ 1,  1,  1, -1, -1,  1,  1,  1, -1,  1]
  ]

  function callTest() {
    setTestState(testState + 1);
  }
  
  return (
    <>
        <Board solution={solution10}/>
    </>

    // <div style={{height: '50px'}}
    // onClick={callTest}
    // >
    //   {/* <Board solution={solution5}/> */}
    //   {testComponent}
    // </div>
  )
}

export default App;

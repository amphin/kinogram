import './App.css'
import Board from './components/Board'
import NumberPane from './components/NumberPane'

function App() {

  return (
    <>
      
      {/* <div style={{padding: '5px'}}>
        <Block x={0} y={0}/>
      </div> */}
      <Board dims={10}/>
      <NumberPane />
      <p>end</p>
    </>
  )
}

export default App

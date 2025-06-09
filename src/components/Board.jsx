import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import HintPane from './HintPane';
import { CellState, CellStateBool as CSB, mapIntToCellState } from '../CellState.js';

Board.propTypes = {
  solution: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
}

//TODO: default solution size 20, or isRequired?
//TODO: non-square boards
function Board({ solution }) { //assumption that grid is square
  let lengths = solution.map(row => row.length);
  
  if ((solution.length !== solution[0].length) || (new Set(lengths).size !== 1)) {
    throw new Error("Grid ain't square mate");
  }

  solution = solution.map(row => row.map(x => mapIntToCellState(x)));
  console.log(solution);

  const gridState = Array.from(Array(solution.length),
     () => Array.from(Array(solution.length),
      () => CellState.EMPTY)
    );

    
    const dims = solution.length;
    
    let hints = new Array(2);
    let hintStates = new Array(2); // boolean
    let xHintStates = new Array();
    let yHintStates = new Array();
    
    const [hintsComplete, setHintsComplete] = useState(hintStates);


  function handleBlockClick(x, y, cellState) {
    console.log(`Block clicked at ${x}, ${y}: ${cellState}`);
    gridState[y][x] = cellState;

    // checkLineComplete(x, y);
  }

  //TODO: memoize/avoid calls past initial call?
    function createHints(grid, xAxis) {
    let hintsArrs = [];

    for (let i = 0; i < grid.length; i++) {
      let i_string = grid[i].map((x) => CSB[x] ? 1 : 0).join(''); // hints only count filled cells
      let i_split = i_string.split('0');

      let hints = [];
      i_split.forEach((x) => x ? hints.push(x.length) : undefined);
      hints.length === 0 ? hints = [0] : hints;

      hintsArrs.push(hints);
    }

    if (xAxis) { 
      // console.log("xAxis");
      hints[0] = hintsArrs;
      hintStates[0] = hintsArrs.map(row => row.map(x => false));
    } else {
      // console.log("yAxis");
      hints[1] = hintsArrs;
      hintStates[1] = hintsArrs.map(row => row.map(x => false));
    }
    // console.log(hints);
    // console.log(hintStates);
    return hintsArrs;
  }

  function transpose(grid){
    return grid.reduce((prev, next) =>
      next.map((item, i) =>
        (prev[i] || []).concat(item))
    , []);
  }

  return (
    <>
      <div className="board">
        <div className="board-top">
          <HintPane
            hintArrs={createHints(transpose(solution), false)} 
            horizontalHints={false} 
            hintIndex={[1,0,0]}/>
        </div>
        
        <div className="board-bottom">
          <HintPane
            hintArrs={createHints(solution, true)} 
            horizontalHints={true} 
            hintIndex={[0,0,0]}/>

          <Grid dims={dims} handleBlockClick={handleBlockClick}/>
        </div>
      </div>
    </>
  )
}


export default Board;
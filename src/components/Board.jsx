import { useState } from 'react';
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

  let horizontalHints;
  let verticalHints;

  const [horizontalHintsComplete, setHorizontalHintsComplete] = useState({});
  const [verticalHintsComplete, setVerticalHintsComplete] = useState({});
  // const hint_arrs = [
  //   [0, 1, 2, 3, 4, 5, 6],
  //   [2, 3, 4, 5, 6, 7],
  //   [2, 3, 4, 5, 6, 7, 8],
  //   [9],
  //   [4, 5, 6, 7, 8, 9, 10]
  // ]


  function checkLineComplete(y, x) {
    //check row
    let gridRow = gridState[x];
    let solutionRow = solution[x];
    let rowComplete = gridRow.map((cell, i) => CSB[cell] === CSB[solutionRow[i]]).every((cell) => cell);

    let gridCol = gridState.map(row => row[y]);
    let solutionCol = solution.map(row => row[y]);
    let colComplete = gridCol.map((cell, i) => CSB[cell] === CSB[solutionCol[i]]).every((cell) => cell);

    if (rowComplete) {
      console.log("row", x, "complete");
      //TODO: gray out all hints in x-axis hint pane, via refs
      // setHorizontalHintsComplete({x: new Array(horizontalHints[x].length).fill(true)});
    }

    if (colComplete) {
      console.log("column", y, "complete");
      //TODO: gray out all hints in y-axis hint pane, via refs
      // setVerticalHintsComplete({y: new Array(verticalHints[y].length).fill(true)});
    }

    // console.log("Grid row: " + gridRow);
    // console.log("Solution row: " + solutionRow);
    //console.log("Row complete: " + rowComplete);

    // console.log("Grid col: " + gridCol);
    // console.log("Solution col: " + solutionCol);
    //console.log("Column complete: " + colComplete);
  }

  function handleBlockClick(x, y, cellState) {
    console.log(`Block clicked at ${x}, ${y}: ${cellState}`);
    gridState[y][x] = cellState;

    checkLineComplete(x, y);
  }

  //TODO: memoize/avoid calls past initial call?
    function createHints(grid, x_axis) {
    let hints_arrs = [];

    for (let i = 0; i < grid.length; i++) {
      let i_string = grid[i].map((x) => CSB[x] ? 1 : 0).join(''); // hints only count filled cells
      let i_split = i_string.split('0');

      let hints = [];
      i_split.forEach((x) => x ? hints.push(x.length) : undefined);
      hints.length === 0 ? hints = [0] : hints;

      hints_arrs.push(hints);
    }

    if (x_axis) { horizontalHints = hints_arrs; }
    else { verticalHints = hints_arrs; }

    return hints_arrs;
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
            hint_arrs={createHints(transpose(solution), false)}
            x_axis_hints={false}
            hintsComplete={horizontalHintsComplete}/>
        </div>
        
        <div className="board-bottom">
          <HintPane
            hint_arrs={createHints(solution, true)} 
            x_axis_hints={true} 
            hintsComplete={verticalHintsComplete}/>

          <Grid dims={dims} handleBlockClick={handleBlockClick}/>
        </div>
      </div>
    </>
  )
}


export default Board;
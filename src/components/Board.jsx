import PropTypes from 'prop-types';
import Grid from './Grid';
import HintPane from './HintPane';
import { useEffect, useRef } from 'react';
import { CellState } from '../CellState.js';

Board.propTypes = {
  solution: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired
}

//TODO: default solution size 20, or isRequired?
//TODO: non-square boards
function Board({solution}) { //assumption that grid is square
  if (solution.length !== solution[0].length) throw new Error("Grid ain't square mate");
  
  const gridState = useRef(
    Array.from(Array(solution.length),
     () => Array.from(Array(solution.length),
      () => false))
  );

  const dims = solution.length;

  // const hint_arrs = [
  //   [0, 1, 2, 3, 4, 5, 6],
  //   [2, 3, 4, 5, 6, 7],
  //   [2, 3, 4, 5, 6, 7, 8],
  //   [9],
  //   [4, 5, 6, 7, 8, 9, 10]
  // ]

  function handleBlockClick(x, y, cellState) {
    console.log(`Block clicked at ${x}, ${y}: ${cellState}`);
    if (cellState === CellState.EMPTY) {
      gridState.current[y][x] = false;
    } else if (cellState === CellState.FILLED) {
      gridState.current[y][x] = true;
    }
  }

  useEffect(() => {
    console.log("gridState updated");
  }, [gridState]);

  //TODO: memoize/avoid calls past initial call?
    function createHints(grid) {
    let hints_arrs = [];

    for (let i = 0; i < grid.length; i++) {
      let i_string = grid[i].map((x) => x ? 1 : 0).join(''); //remove if solution array is 0/1
      let i_split = i_string.split('0');

      let hints = [];
      i_split.forEach((x) => x ? hints.push(x.length) : undefined);
      hints.length === 0 ? hints = [0] : hints;

      hints_arrs.push(hints);
    }

    return hints_arrs
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
          <HintPane hint_arrs={createHints(transpose(solution))} x_axis_hints={false}/>
        </div>
        
        <div className="board-bottom">
          <HintPane hint_arrs={createHints(solution)} x_axis_hints={true}/>
          <Grid dims={dims} handleBlockClick={handleBlockClick}/>
        </div>
      </div>
    </>
  )
}


export default Board;
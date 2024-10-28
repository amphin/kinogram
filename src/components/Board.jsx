import PropTypes from 'prop-types';
import HintPane from './HintPane';
import { createContext } from 'react';

Board.propTypes = {}

export const SizeContext = createContext();

function Board() {

  const hint_arrs = [
    [0, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7],
    [2, 3, 4, 5, 6, 7, 8],
    [9],
    [4, 5, 6, 7, 8, 9, 10],
    [5, 6, 7, 8, 9, 10, 11]
  ]

  return (
    <>
      <HintPane hint_arrs={hint_arrs} hints_x={true}/>
      <HintPane hint_arrs={hint_arrs} hints_x={false}/>
    </>
  )
}


export default Board;
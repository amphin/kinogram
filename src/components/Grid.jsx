import PropTypes from "prop-types";
import "./Board.css"
import Block from "./Block";
import { createContext } from "react";

Grid.propTypes = {
  dims: PropTypes.number.isRequired,
  handleBlockClick: PropTypes.func.isRequired
}

export const FirstCellContext = createContext([null, null, null]); // pre, post, button clicked
export const BlocksPressedContext = createContext([]);
export const HorizontalDragContext = createContext(null); // eliminate need for null

function Grid({dims, handleBlockClick}) { 

  function generateBlocks(dims) {
    const blocks = [];
      for (let y=0; y < dims; y++) {
        for (let x=0; x < dims; x++) {
          console.log("foring x=" + x + ", y=" + y);
          blocks.push(
            <FirstCellContext.Provider value={[null, null, null]}>
              <BlocksPressedContext.Provider value={[]}>
                <HorizontalDragContext.Provider value={[null]}>
                <Block key="${x}-${y}" x={x} y={y} handleBlockClick={handleBlockClick}/>
                </HorizontalDragContext.Provider>
              </BlocksPressedContext.Provider>
            </FirstCellContext.Provider>
          );
        }
      }
      return blocks;
  }

  //TODO: prevent right click default
  return (
    <>
    <div className="grid" style={{'--dims': dims}}>
      {generateBlocks(dims)}
    </div>
    </>
  );
}

export default Grid;
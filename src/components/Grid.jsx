import PropTypes from "prop-types";
import "./Board.css"
import Block from "./Block";
import { createContext } from "react";

Grid.propTypes = {
  dims: PropTypes.number.isRequired,
  handleBlockClick: PropTypes.func.isRequired
}

export const FirstCellContext = createContext(); // pre, post, button clicked
export const BlocksPressedContext = createContext();
export const DragDirectionContext = createContext();

function Grid({dims, handleBlockClick}) { 
   const blocks = [];
  
  // context variables for drag behaviour
  let firstCell = {preState: null, postState: null, button: null};
  firstCell.set = (pre, post, button) => {
    firstCell.preState = pre; // cell state before being clicked
    firstCell.postState = post; // cell state after being clicked
    firstCell.button = button; // button used to click cell
  };
  let blocksPressed = {x: new Set(), y: new Set()};
  blocksPressed.has = (x, y) => blocksPressed.x.has(x) || blocksPressed.y.has(y);
  blocksPressed.onlyHas = (x, y) => blocksPressed.x.has(x) != blocksPressed.y.has(y);
  blocksPressed.add = (x, y) => {blocksPressed.x.add(x); blocksPressed.y.add(y);};
  let dragDirection = {isHorizontal: null};

   function generateBlocks(dims) {
    console.trace('GENERATEBLOCKS CALLED: ');
      for (let y=0; y < dims; y++) {
        for (let x=0; x < dims; x++) {
          console.log("foring x=" + x + ", y=" + y);
          blocks.push(
            <Block key={`${x}-${y}`} x={x} y={y} handleBlockClick={handleBlockClick} />
          );
        }
      }
      return blocks;
  }

  //TODO: prevent right click default
  return (
    <div className="grid" style={{'--dims': dims}} onClick={console.log("clicked grid")}>
      <FirstCellContext.Provider value={firstCell}>
        <BlocksPressedContext.Provider value={blocksPressed}>
          <DragDirectionContext.Provider value={dragDirection}>
            {generateBlocks(dims)}
          </DragDirectionContext.Provider>
        </BlocksPressedContext.Provider>
      </FirstCellContext.Provider>
    </div>
  );
}

export default Grid;
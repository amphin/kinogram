import PropTypes from "prop-types";
import "./Board.css"
import Block from "./Block";
import HintBar from "./HintBar";
import { useState } from "react";
import { SizeContext } from "./Board.jsx";

Grid.propTypes = {
  dims: PropTypes.number,
} //TODO: move hardcoded value

function Grid({dims=3}) { //TODO: default 20, or isRequired?
  const [size, setSize] = useState("20px");

  const handleClick = (x, y, cellState) => { 
    console.log(`Block clicked at ${x}, ${y}: ${cellState}`);
  }

  function generateBlocks(dims) {
    const blocks = [];
      for (let y=0; y < dims; y++) {
        for (let x=0; x < dims; x++) {
          console.log("foring x=" + x + ", y=" + y);
          blocks.push(
          <SizeContext.Provider value="20px">
            <Block key="${x}-${y}" x={x} y={y} handleClick={handleClick}/>
          </SizeContext.Provider>
          );
        }
      }
      return blocks;
  }

  return (
    <>
    <div className="grid" style={{'--dims': dims}}>
      {generateBlocks(dims)}
    </div>
    </>
  );
}

export default Grid;
import PropTypes from "prop-types";
import "./Board.css"
import Block from "./Block";

Board.propTypes = {
  size: PropTypes.number,
}

function Board({size=3}) {

  function handleClick(x, y, cellState) { 
    console.log(`Block clicked at ${x}, ${y}: ${cellState}`);
  }

  function generateBlocks(size) {
    const blocks = [];
      for (let x=0; x < size; x++) {
        for (let y=0; y < size; y++) {
          console.log("foring x=" + x + ", y=" + y);
          blocks.push(<Block key="${x}-${y}" x={x} y={y} handleClick={handleClick}/>);
        }
      }
      return blocks;
  }

  return (
    <>
    <div className="grid-container" style={{'--size': size}}>
      {generateBlocks(size)}
    </div>
    </>
  );
}

export default Board;
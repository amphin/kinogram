import PropTypes from "prop-types";
import "./Board.css"
import Block from "./Block";

Board.propTypes = {
  dims: PropTypes.number,
}


function Board({dims=3}) {

  const handleClick = (x, y, cellState) => { 
    console.log(`Block clicked at ${x}, ${y}: ${cellState}`);
  }

  function generateBlocks(dims) {
    const blocks = [];
      for (let y=0; y < dims; y++) {
        for (let x=0; x < dims; x++) {
          console.log("foring x=" + x + ", y=" + y);
          blocks.push(<Block key="${x}-${y}" x={x} y={y} handleClick={handleClick}/>);
        }
      }
      return blocks;
  }

  return (
    <>
    <div className="grid-container" style={{'--dims': dims}}>
      {generateBlocks(dims)}
    </div>
    </>
  );
}

export default Board;
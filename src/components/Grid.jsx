import PropTypes from "prop-types";
import "./Board.css"
import Block from "./Block";

Grid.propTypes = {
  dims: PropTypes.number.isRequired,
  handleBlockClick: PropTypes.func.isRequired
}


function Grid({dims, handleBlockClick}) { 

  const handleClick = (x, y, cellState) => { 
    console.log(`Block clicked at ${x}, ${y}: ${cellState}`);
  }

  function generateBlocks(dims) {
    const blocks = [];
      for (let y=0; y < dims; y++) {
        for (let x=0; x < dims; x++) {
          console.log("foring x=" + x + ", y=" + y);
          blocks.push(
            <Block key="${x}-${y}" x={x} y={y} handleBlockClick={handleBlockClick}/>
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
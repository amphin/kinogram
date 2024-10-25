import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./Board.jsx";
import SVGCross from "./SVGCross";
import { CellState } from "../CellState.js";

Block.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
};

function Block({ x=-1, y=-1, handleClick }) {
  const [cellState, setCellState] = useState(CellState.EMPTY);

  const cellStyle = {
    [CellState.EMPTY]: "empty",
    [CellState.FILLED]: "filled",
    [CellState.CROSSED]: "crossed",
  }[cellState];

  function renderCross() {
    {/* TODO: refer to cross.svg */}
    if (cellState === CellState.CROSSED) {
      return (
        <SVGCross 
        outer={document.getElementById("button-id").offsetHeight} 
        inner={document.getElementById("button-id").clientHeight} 
        />);
      }
      return null;
    };


    useEffect(() => {
      handleClick(x, y, cellState);
    }, [cellState, handleClick, x, y]); // only on rerenders

  return (
    <>
      <div 
      type="button" id="button-id"
      className={"block " + cellStyle}

      onMouseDown={(e) => {
        if (e.button === 0) {
          console.log("left clicked");
          if (cellState === CellState.FILLED) {
            setCellState(CellState.EMPTY);
          } else {
            setCellState(CellState.FILLED);
          }
        }
        else if (e.button === 2) {
          console.log("right clicked");
          if (cellState === CellState.CROSSED) {
            setCellState(CellState.EMPTY);
          } else {
            setCellState(CellState.CROSSED);
          }
        }
      }}

      onContextMenu={(e) => {
        e.preventDefault();
      }}
      >

      {renderCross()}
      </div>
    </>
  );
}

export default Block;

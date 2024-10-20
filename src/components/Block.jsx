import PropTypes from "prop-types";
import { useState } from "react";
import "./Block.css";
import { CellState } from "../CellState.js";

Block.propTypes = {
  handleClick: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
};

function Block({ handleClick, x=-1, y=-1 }) {
  const [cellState, setCellState] = useState(CellState.EMPTY);

  const cellStyle = {
    [CellState.EMPTY]: "empty",
    [CellState.FILLED]: "filled",
    [CellState.CROSSED]: "crossed",
  }[cellState];

  let cellSize = 20;

  function renderCross() {
    {/* TODO: refer to cross.svg */}
    if (cellState === CellState.CROSSED) {
      return (
        <svg className="cross" width="18" height="18">
        <line 
        x1="0" y1="0"
        x2={document.getElementById("button-id").clientWidth} 
        y2={document.getElementById("button-id").clientHeight} 
        overflow="hidden" stroke="black" strokeWidth="1"/>

        <line 
        x1={document.getElementById("button-id").clientWidth} 
        y1={document.getElementById("button-id").clientHeight} 
        x2="0" y2="0" 
        overflow="hidden" stroke="black" strokeWidth="1" 
        transform="rotate(90 9 9)"/>
        </svg>);
      }
      return null;
    };

  return (
    <>
      <div 
      type="button" id="button-id"
      className={"block " + cellStyle}
      onClick={() => {
        handleClick(x, y);
        console.log("left clicked");
        if (cellState === CellState.FILLED) {
          setCellState(CellState.EMPTY);
        } else {
          setCellState(CellState.FILLED);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        handleClick(x, y);
        console.log("right clicked");
        if (cellState === CellState.CROSSED) {
          setCellState(CellState.EMPTY);
        } else {
          setCellState(CellState.CROSSED);
        }
      }}
      >

        {renderCross()}
      </div>
    </>
  );
}

export default Block;

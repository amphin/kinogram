import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./Board.css";
import SVGCross from "./SVGCross";
import { CellState } from "../CellState.js";

Block.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  handleBlockClick: PropTypes.func.isRequired,
};

function Block({ x=-1, y=-1, handleBlockClick }) {
  const [cellState, setCellState] = useState(CellState.EMPTY);

  const cellStyle = Object.freeze({
    [CellState.EMPTY]: "empty",
    [CellState.FILLED]: "filled",
    [CellState.CROSSED]: "crossed",
  })[cellState];

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
      handleBlockClick(x, y, cellState);
    }, [cellState, handleBlockClick, x, y]); // only on rerenders, NOT ON MOUNT


  return (
    <>
      <div 
      type="button" id="button-id"
      className={"block " + cellStyle}
      // draggable="true"

      onMouseDown={(e) => {
        if (e.button === 0) {
          // console.log("left clicked");
          if (cellState === CellState.FILLED) {
            setCellState(CellState.EMPTY);
          } else {
            setCellState(CellState.FILLED);
          }
        }
        else if (e.button === 2) {
          // console.log("right clicked");
          if (cellState === CellState.CROSSED) {
            setCellState(CellState.EMPTY);
          } else {
            setCellState(CellState.CROSSED);
          }
        }
      }}

      onContextMenu={(e) => {
        e.preventDefault();
      }}>

      {renderCross()}
      </div>
    </>
  );
}

export default Block;

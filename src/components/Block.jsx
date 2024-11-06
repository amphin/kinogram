import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import "./Board.css";
import SVGCross from "./SVGCross";
import { CellState } from "../CellState.js";
import { FirstCellContext } from "./Grid";
import { BlocksPressedContext } from "./Grid";
import { HorizontalDragContext } from "./Grid";

Block.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  handleBlockClick: PropTypes.func.isRequired,
};

function Block({ x=-1, y=-1, handleBlockClick }) {
  const [cellState, setCellState] = useState(CellState.EMPTY);
  const { firstCellPreState, firstCellPostState, firstButtonClicked } = useContext(FirstCellContext);
  const blocksPressedList = useContext(BlocksPressedContext);
  const { horizontalDrag } = useContext(HorizontalDragContext);

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

      onDragStart={(e) => e.preventDefault()}

      onMouseEnter={(e) => {
        if (e.buttons & 1) {
          if (cellState === CellState.EMPTY) {
            setCellState(CellState.FILLED);
          } else if (cellState === CellState.FILLED) {
            setCellState(CellState.EMPTY);
          }
        } else if (e.buttons & 2) {
          if (cellState === CellState.EMPTY) {
            setCellState(CellState.CROSSED);
          } else if (cellState === CellState.CROSSED) {
            setCellState(CellState.EMPTY);
          }
        }
      }}
      
      onMouseUp={(e) => {
        console.log("mouse released at " + x + ", " + y);
      }}

      onContextMenu={(e) => e.preventDefault()} // redrawn crosses?
      >
      


      {renderCross()}
      </div>
    </>
  );
}

export default Block;


//onMouseDown={(e) => {
  //   if (e.button === 0) {
  //     // console.log("left clicked");
  //     if (cellState === CellState.FILLED) {
  //       setCellState(CellState.EMPTY);
  //     } else {
  //       setCellState(CellState.FILLED);
  //     }
  //   }
  //   else if (e.button === 2) {
  //     // console.log("right clicked");
  //     if (cellState === CellState.CROSSED) {
  //       setCellState(CellState.EMPTY);
  //     } else {
  //       setCellState(CellState.CROSSED);
  //     }
  //   }
  // }}

  // onContextMenu={(e) => {
  //   e.preventDefault();
  // }}

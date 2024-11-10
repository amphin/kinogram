import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import "./Board.css";
import SVGCross from "./SVGCross";
import { CellState } from "../CellState.js";
import { FirstCellContext, BlocksPressedContext, DragDirectionContext } from "./Grid";

Block.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  handleBlockClick: PropTypes.func.isRequired,
};

function Block({ x=-1, y=-1, handleBlockClick }) {
  const [cellState, setCellState] = useState(CellState.EMPTY);
  let firstCell = useContext(FirstCellContext);
  let blocksPressed = useContext(BlocksPressedContext);
  let dragDirection = useContext(DragDirectionContext);

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

      onMouseDown={(e) => {
        console.log("mouse button is " + e.button)
          if (e.button === 0) {
            // console.log("left clicked");
            if (cellState === CellState.FILLED) {
              setCellState(CellState.EMPTY);
              firstCell.set(CellState.FILLED, CellState.EMPTY, e.button);
            } else {
              if (cellState === CellState.CROSSED) {
                firstCell.set(CellState.CROSSED, CellState.FILLED, e.button);
              } else {
                firstCell.set(CellState.EMPTY, CellState.FILLED, e.button);
              }
              setCellState(CellState.FILLED);
            }
            blocksPressed.x.add(x);
            blocksPressed.y.add(y);
            console.log("first cell: " + firstCell.preState + ", " + firstCell.postState + ", " + firstCell.button);
            console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
            console.log("drag direction is initially: " + dragDirection.isHorizontal);
          }
          else if (e.button === 2) {
            // console.log("right clicked");
            if (cellState === CellState.CROSSED) {
              setCellState(CellState.EMPTY);
              firstCell.set(CellState.CROSSED, CellState.EMPTY, e.button);
            } else {
              if (cellState === CellState.FILLED) {
                firstCell.set(CellState.FILLED, CellState.CROSSED, e.button);
              } else {
                firstCell.set(CellState.EMPTY, CellState.CROSSED, e.button);
              }
              setCellState(CellState.CROSSED);
            }
            blocksPressed.x.add(x);
            blocksPressed.y.add(y);
            console.log("first cell: " + firstCell.preState + ", " + firstCell.postState + ", " + firstCell.button);
            console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
            console.log("drag direction is initially: " + dragDirection.isHorizontal);
          }
        }}

        onMouseUp={(e) => {
          if (e.button !== 1) {
            firstCell.preState = null;
            firstCell.postState = null;
            firstCell.button = null;
            blocksPressed.x.clear();
            blocksPressed.y.clear();
            dragDirection.isHorizontal = null;
            console.log("mouse released at " + x + ", " + y);
            console.log("first cell: " + firstCell.preState + ", " + firstCell.postState + ", " + firstCell.button);
            console.log("blocks pressed: " + blocksPressed.x + ", " + blocksPressed.y);
          }
        }}

        onMouseEnter={(e) => {
          if (e.buttons & 1) {
            console.log("entered with left mouse down at " + x + ", " + y);

            if (dragDirection.isHorizontal !== null) {
              console.log("drag direction is: " + dragDirection.isHorizontal);
              //error if both x or y set lengths > 1

              if (dragDirection.isHorizontal) {
                if (blocksPressed.x.has(x)) {
                  if (blocksPressed.y.has(y)) {
                    console.log("block entered has already been entered");
                    // reverse block state depending on inital states
                  } else {
                    // ignore, diagonal block
                    // map to corresponding block in horizontal drag - reverse block state
                  }
                } else {
                  if (blocksPressed.y.has(y)) {
                    blocksPressed.add(x, y);
                    // new valid block entered - code new behaviour
                  } else {
                    // ignore, diagonal block
                    // map to corresponding block in horizontal drag - code new behaviour
                    // add to blocks pressed
                  }
                }
              }
            }
          } else {
              console.log("drag direction is: " + dragDirection.isHorizontal);
              console.log("has x: " + blocksPressed.x.has(x) + ", has y: " + blocksPressed.y.has(y));
              if (blocksPressed.onlyHas(x, y)) {
                if (blocksPressed.y.has(y)) {
                  dragDirection.isHorizontal = true;
                } else if (blocksPressed.x.has(x)) {
                  dragDirection.isHorizontal = false;
                }
                console.log("assigned drag direction: " + dragDirection.isHorizontal);

                blocksPressed.add(x, y);
                console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
              } else if (!blocksPressed.x.has(x) && !blocksPressed.y.has(y)) {
                console.log("block entered is diagonal to the previous block");
              } else if (blocksPressed.x.has(x) && blocksPressed.y.has(y)) {
                console.log("block entered has already been entered");
              } else {
                console.log("unexpected code reached");
              }
            }
          }}

      // onMouseEnter={(e) => {
      //   if (e.buttons & 1) {
      //     if (cellState === CellState.EMPTY) {
      //       setCellState(CellState.FILLED);
      //     } else if (cellState === CellState.FILLED) {
      //       setCellState(CellState.EMPTY);
      //     }
      //   } else if (e.buttons & 2) {
      //     if (cellState === CellState.EMPTY) {
      //       setCellState(CellState.CROSSED);
      //     } else if (cellState === CellState.CROSSED) {
      //       setCellState(CellState.EMPTY);
      //     }
      //   }
      // }}
      
      // onMouseUp={(e) => {
      //   console.log("mouse released at " + x + ", " + y);
      // }}

      onContextMenu={(e) => e.preventDefault()} // redrawn crosses?
      >
      


      {renderCross()}
      </div>
    </>
  );
}

export default Block;




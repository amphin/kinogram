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
  // context variables for drag behaviour
  let firstCell = useContext(FirstCellContext);
  let blocksPressed = useContext(BlocksPressedContext);
  let dragDirection = useContext(DragDirectionContext);

  const cellStyle = Object.freeze({
    [CellState.EMPTY]: "empty",
    [CellState.FILLED]: "filled",
    [CellState.CROSSED]: "crossed",
  })[cellState];

  function renderCross() {
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


    /* handle when mouse is pressed on block, behaviour dependent on mouse button */
    function handleMouseDown(mouseButton) {
      if (mouseButton === 0) {
        if (cellState === CellState.FILLED) {         // filling filled: set to empty
          setCellState(CellState.EMPTY);
          firstCell.set(CellState.FILLED, CellState.EMPTY, mouseButton);
        } else if (cellState === CellState.CROSSED) { // filling crossed: set to filled
          setCellState(CellState.FILLED);
          firstCell.set(CellState.CROSSED, CellState.FILLED, mouseButton);
        } else {                                      // filling empty: set to filled
          setCellState(CellState.FILLED);
          firstCell.set(CellState.EMPTY, CellState.FILLED, mouseButton);
        }
      } 
      else if (mouseButton === 2) {
        if (cellState === CellState.CROSSED) {        // crossing crossed: set to empty
          setCellState(CellState.EMPTY);
          firstCell.set(CellState.CROSSED, CellState.EMPTY, mouseButton);
        } else if (cellState === CellState.FILLED) {  // crossing filled: set to crossed
          setCellState(CellState.CROSSED);
          firstCell.set(CellState.FILLED, CellState.CROSSED, mouseButton);
        } else {                                      // crossing empty: set to crossed
          setCellState(CellState.CROSSED);
          firstCell.set(CellState.EMPTY, CellState.CROSSED, mouseButton);
        }
      }
      
      // initialise first cell and blocks pressed contexts
      blocksPressed.x.add(x);
      blocksPressed.y.add(y);
      firstCell.button = mouseButton;
      console.log("first cell: " + firstCell.preState + ", " + firstCell.postState + ", " + firstCell.button);
      console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
      console.log("drag direction is initially: " + dragDirection.isHorizontal);
      console.log("first cell button is: " + firstCell.button);
    }

    /* determine whether to change block state, depending on if block is valid for drag */
    function handleDrag(x, y, isInDragAxis, isInOtherAxis, dirString) {
      // check if block is adjacent to the last cell in the blocks list
      if (isInDragAxis) {
        if (isInOtherAxis) {
          console.log("block entered has already been entered");
          setCellStateOnDrag(firstCell.preState, firstCell.postState);
        } else {
          console.log("block entered is not in " + dirString + " drag")
          // ignore, diagonal block
          // map to corresponding block in horizontal drag - reverse block state
        }
      } else {
        if (isInOtherAxis) {
          console.log("new valid block entered")
          blocksPressed.add(x, y);
          setCellStateOnDrag(firstCell.preState, firstCell.postState);
        } else {
          console.log("block entered is not in " + dirString + " drag")
          // ignore, diagonal block
          // map to corresponding block in horizontal drag - code new behaviour
          // add to blocks pressed
        }
      }
    }

    /*  change cell state based on drag context */
    function setCellStateOnDrag(clickPreState, clickPostState) {
      if (clickPreState === CellState.EMPTY) {
        if (clickPostState === CellState.FILLED) { // initial cell: empty -> filled
          // fill drag ignores crossed cells
          if (cellState === CellState.EMPTY) {
            setCellState(CellState.FILLED);
          }
        } else if (clickPostState === CellState.CROSSED) { // initial cell: empty -> crossed
          // cross drag ignores filled cells
          if (cellState === CellState.EMPTY) {
            setCellState(CellState.CROSSED);
          }
        }
      } else if (clickPreState === CellState.FILLED) {
        if (clickPostState === CellState.EMPTY) { // initial cell: filled -> empty
          if (cellState !== CellState.EMPTY) {
            setCellState(CellState.EMPTY);
          }
        } else if (clickPostState === CellState.CROSSED) { // initial cell: filled -> crossed
          if (cellState !== CellState.CROSSED) {
            setCellState(CellState.CROSSED);
          }
        }
      } else if (clickPreState === CellState.CROSSED) {
        if (clickPostState === CellState.EMPTY) { // initial cell: crossed -> empty
          if (cellState !== CellState.EMPTY) {
            setCellState(CellState.EMPTY);
          }
        } else if (clickPostState === CellState.FILLED) { // initial cell: crossed -> filled
          if (cellState !== CellState.FILLED) {
            setCellState(CellState.FILLED);
          }
        }
      }
    }

    function releaseDragResources() {
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

  return (
      <div 
      type="button" id="button-id"
      className={"block " + cellStyle}

      onDragStart={(e) => e.preventDefault()}

      onMouseDown={(e) => {
        if (firstCell.button === null) {
        console.log("mouse button is " + e.button)
            if (e.button === 0 || e.button === 2) {
              handleMouseDown(e.button);
            }
          }
        }}

      onMouseUp={(e) => {
        console.log("mouse released button is " + e.button);
        if (e.button === firstCell.button) {
          releaseDragResources();
        }
      }}

      onMouseEnter={(e) => {
        console.log("buttons are " + e.buttons);
        // converts first cell mouse button to mouse buttons bitmask equivalent
        // as left mouse code is 0 for mouse button, but is 1 for mouse buttons bitmask
        const buttonsBit = !firstCell.button ? 1 : firstCell.button; // both 0 and null evaluate to true
        if (e.buttons & buttonsBit) {
          console.log("entered with drag button(s) " + e.buttons + " down at " + x + ", " + y);

          // third or more cell entered in drag
          if (dragDirection.isHorizontal !== null) {
            console.log("is drag direction horizontal? " + dragDirection.isHorizontal);
            // error if both x or y set lengths > 1
            // -> means drag context has accepted a block which is neither vertical not horizontal to the starting block

            if (dragDirection.isHorizontal) {
              handleDrag(x, y, blocksPressed.x.has(x), blocksPressed.y.has(y), "horizontal");
            } else { // vertical drag
              handleDrag(x, y, blocksPressed.y.has(y), blocksPressed.x.has(x), "vertical");
            }

          } else { // second cell entered in drag
            console.log("has x: " + blocksPressed.x.has(x) + ", has y: " + blocksPressed.y.has(y));
            
            // edge case (TODO: check if possible)
            if (blocksPressed.x.has(x) && blocksPressed.y.has(y)) {
              console.log("block entered has already been entered");
            } 
            // assign drag direction
            else if (blocksPressed.y.has(y)) {
                dragDirection.isHorizontal = true;
                console.log("assigned drag direction: " + dragDirection.isHorizontal);
                handleDrag(x, y, blocksPressed.x.has(x), blocksPressed.y.has(y), "horizontal");
            } else if (blocksPressed.x.has(x)) {
                dragDirection.isHorizontal = false;
                console.log("assigned drag direction: " + dragDirection.isHorizontal);
                handleDrag(x, y, blocksPressed.y.has(y), blocksPressed.x.has(x), "vertical");
            }
            // edge case
              else if (!blocksPressed.x.has(x) && !blocksPressed.y.has(y)) {
              console.log("block entered is diagonal to the previous block");
            } else {
              console.log("unexpected code reached");
            }
          }
          console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
        } else {
          // hover behaviour (onMouseHover)
        }
      }}

      onContextMenu={(e) => e.preventDefault()} // redrawn crosses?
      >
      

      {renderCross()}
      </div>
  );
}

export default Block;




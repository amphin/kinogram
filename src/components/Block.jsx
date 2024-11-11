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

    function handleBlockDrag(clickPreState, clickPostState, newBlock) {
      if (clickPreState === CellState.EMPTY) {
        if (clickPostState === CellState.FILLED) { // empty -> filled
          if (newBlock) {
            if (cellState === CellState.EMPTY) {
              setCellState(CellState.FILLED);
            } else if (cellState === CellState.FILLED) {
              // do nothing
            } else if (cellState === CellState.CROSSED) {
              // do nothing
            }
          } else {
            if (cellState === CellState.EMPTY) {
              // do nothing
            } else if (cellState === CellState.FILLED) {
              // do nothing
            }
          }

        } else if (clickPostState === CellState.CROSSED) { // empty -> crossed
          if (newBlock) {
            if (cellState === CellState.EMPTY) {
              setCellState(CellState.CROSSED);
            } else if (cellState === CellState.FILLED) {
              setCellState(CellState.CROSSED);
            } else if (cellState === CellState.CROSSED) {
              // do nothing
            }
          } else {
            if (cellState === CellState.EMPTY) {
              // do nothing
            } else if (cellState === CellState.CROSSED) {
              // do nothing
            }

          }
        }

      } else if (clickPreState === CellState.FILLED) {
        if (clickPostState === CellState.EMPTY) { // filled -> empty
          if (newBlock) {
            if (cellState === CellState.EMPTY) {
              // do nothing
            } else if (cellState === CellState.FILLED) {
              setCellState(CellState.EMPTY);
            } else if (cellState === CellState.CROSSED) {
              setCellState(CellState.EMPTY);
            }
          } else {
            if (cellState === CellState.EMPTY) {
              // do nothing
            } else if (cellState === CellState.FILLED) {
              // do nothing
            }
          }
        } else if (clickPostState === CellState.CROSSED) { // filled -> crossed
          if (newBlock) {
            if (cellState === CellState.EMPTY) {
              setCellState(CellState.CROSSED);
            } else if (cellState === CellState.FILLED) {
              setCellState(CellState.CROSSED);
            } else if (cellState === CellState.CROSSED) {
              // do nothing
            }
          } else {
            if (cellState === CellState.FILLED) {
              // do nothing
            } else if (cellState === CellState.CROSSED) {
              // do nothing
            }
          }
        }

      } else if (clickPreState === CellState.CROSSED) {
        if (clickPostState === CellState.EMPTY) { // crossed -> empty
          if (newBlock) {
            if (cellState === CellState.EMPTY) {
              // do nothing
            } else if (cellState === CellState.FILLED) {
              setCellState(CellState.EMPTY);
            } else if (cellState === CellState.CROSSED) {
              setCellState(CellState.EMPTY);
            }
          } else {
            if (cellState === CellState.EMPTY) {
              // do nothing
            } else if (cellState === CellState.CROSSED) {
              // do nothing
            }
          }
        } else if (clickPostState === CellState.FILLED) { // crossed -> filled
          if (newBlock) {
            if (cellState === CellState.EMPTY) {
              setCellState(CellState.FILLED);
            } else if (cellState === CellState.FILLED) {
              // do nothing
            } else if (cellState === CellState.CROSSED) {
              setCellState(CellState.FILLED);
            }
          } else {
            if (cellState === CellState.FILLED) {
              // do nothing
            } else if (cellState === CellState.CROSSED) {
              // do nothing
            }
          }
        }
      }
    }


  return (
    <>
      <div 
      type="button" id="button-id"
      className={"block " + cellStyle}

      onDragStart={(e) => e.preventDefault()}

      onMouseDown={(e) => {
        if (firstCell.button === null) {
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
              firstCell.button = e.button;
              console.log("first cell: " + firstCell.preState + ", " + firstCell.postState + ", " + firstCell.button);
              console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
              console.log("drag direction is initially: " + dragDirection.isHorizontal);
              console.log("first cell button is: " + firstCell.button);
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
              firstCell.button = e.button;
              console.log("first cell: " + firstCell.preState + ", " + firstCell.postState + ", " + firstCell.button);
              console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
              console.log("drag direction is initially: " + dragDirection.isHorizontal);
              console.log("first cell button is: " + firstCell.button);
            }
          }
        }}

        onMouseUp={(e) => {
          console.log("mouse released button is " + e.button);
          if (e.button === firstCell.button) {
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
          console.log("buttons are " + e.buttons);
          const buttonsBit = !firstCell.button ? 1 : firstCell.button;
          if (e.buttons & buttonsBit) {
            console.log("entered with mouse " + firstCell.button + " down at " + x + ", " + y);

            if (dragDirection.isHorizontal !== null) {
              console.log("drag direction is: " + dragDirection.isHorizontal);
              //error if both x or y set lengths > 1

              if (dragDirection.isHorizontal) {
                if (blocksPressed.x.has(x)) {
                  if (blocksPressed.y.has(y)) {
                    console.log("block entered has already been entered");
                    handleBlockDrag(firstCell.preState, firstCell.postState, false);
                    // reverse block state depending on inital states
                  } else {
                    console.log("block entered is not in horizontal drag")
                    // ignore, diagonal block
                    // map to corresponding block in horizontal drag - reverse block state
                  }
                } else {
                  if (blocksPressed.y.has(y)) {
                    console.log("new valid block entered")
                    blocksPressed.add(x, y);
                    handleBlockDrag(firstCell.preState, firstCell.postState, true);
                    // new valid block entered - code new behaviour
                  } else {
                    console.log("block entered is not in horizontal drag")
                    // ignore, diagonal block
                    // map to corresponding block in horizontal drag - code new behaviour
                    // add to blocks pressed
                  }
                }
              } else { // vertical drag
                if (blocksPressed.y.has(y)) {
                  if (blocksPressed.x.has(x)) {
                    console.log("block entered has already been entered");
                    handleBlockDrag(firstCell.preState, firstCell.postState, false);
                    // reverse block state depending on inital states
                  } else {
                    console.log("block entered is not in vertical drag")
                    // ignore, diagonal block
                    // map to corresponding block in vertical drag - reverse block state
                  }
                } else {
                  if (blocksPressed.x.has(x)) {
                    console.log("new valid block entered")
                    blocksPressed.add(x, y);
                    handleBlockDrag(firstCell.preState, firstCell.postState, true);
                    // new valid block entered - code new behaviour
                  } else {
                    console.log("block entered is not in vertical drag")
                    // ignore, diagonal block
                    // map to corresponding block in vertical drag - code new behaviour
                    // add to blocks pressed
                  }
                }
              }
            } else {
              console.log("has x: " + blocksPressed.x.has(x) + ", has y: " + blocksPressed.y.has(y));
              if (blocksPressed.onlyHas(x, y)) {
                if (blocksPressed.y.has(y)) {
                  dragDirection.isHorizontal = true;
                } else if (blocksPressed.x.has(x)) {
                  dragDirection.isHorizontal = false;
                }
                console.log("assigned drag direction: " + dragDirection.isHorizontal);

                blocksPressed.add(x, y);
                handleBlockDrag(firstCell.preState, firstCell.postState, true);
              } else if (!blocksPressed.x.has(x) && !blocksPressed.y.has(y)) {
                console.log("block entered is diagonal to the previous block");
              } else if (blocksPressed.x.has(x) && blocksPressed.y.has(y)) {
                console.log("block entered has already been entered");
                handleBlockDrag(firstCell.preState, firstCell.postState, false);
              } else {
                console.log("unexpected code reached");
              }
            }
            console.log("blocks pressed: " + Array.from(blocksPressed.x) + ", " + Array.from(blocksPressed.y));
          } else {
            // hover behaviour (onMouseHover)
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




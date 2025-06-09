import "./Board.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HintState } from "../HintState.js";

Hint.propTypes = {  
  num: PropTypes.number.isRequired,
  hintIndex: PropTypes.arrayOf(PropTypes.number),
}

function Hint({ num, hintIndex }) {
  const [number, setNumber] = useState(num)
  const [hintState, setHintState] = useState(HintState.UNFILLED) //need state?

  const hintStyle = {
    [HintState.UNFILLED]: "",
    [HintState.FILLED]: "filled",
    [HintState.UNUSED]: ""
  }[hintState];

  useEffect(() => {
    if (number === -1) {
      setNumber("");
      setHintState(HintState.UNUSED);
    }
  }, [number]);

  // useEffect (if !HintState.UNUSED):
  //    -> if hint state becomes true, setHintState(HintState.FILLED)
  //    -> if hint state becomes false, setHintState(HintState.UNFILLED)

  return (
    <div className={"hint " + hintStyle}
        onMouseDown={(e) => {
          if (e.button === 0) {
            if (hintState === HintState.UNFILLED) {
              setHintState(HintState.FILLED);
            } else if (hintState === HintState.FILLED) {
              setHintState(HintState.UNFILLED);
            }
          }
        }}
        onContextMenu={(e) => e.preventDefault()}>
        {number === -1 ? "" : number}
    </div>
  )
}

export default Hint;
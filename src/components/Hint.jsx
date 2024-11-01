import "./Board.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { HintState } from "../HintState.js";

Hint.propTypes = {  
  num: PropTypes.number.isRequired
}

function Hint({num}) {
  const [number, setNumber] = useState(num)
  const [hintState, setHintState] = useState(HintState.UNFILLED) //need state?

  const hintStyle = {
    [HintState.UNFILLED]: "",
    [HintState.FILLED]: "filled",
  }[hintState];

  return (
    <div className={"hint " + hintStyle}
        onMouseDown={(e) => {
          if (e.button === 0) {
            if (hintState === HintState.UNFILLED) {
              setHintState(HintState.FILLED);
            } else {
              setHintState(HintState.UNFILLED);
            }
          }
        }}
        onContextMenu={(e) => e.preventDefault()}>
        {number !== -1 ? number : ""}
    </div>
  )
}

export default Hint;
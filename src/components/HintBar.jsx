import PropTypes from "prop-types";
import classNames from "classnames";
import Hint from "./Hint.jsx";
import "./Board.css"
import { useEffect, useContext } from "react";

HintBar.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.number).isRequired,
  horizontalHints: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
  fillNum: PropTypes.number.isRequired,
  hintIndex: PropTypes.arrayOf(PropTypes.number).isRequired
  // vLast: PropTypes.bool.isRequired,
  // hlast: PropTypes.bool.isRequired
}

function HintBar({ hints, horizontalHints, length, fillNum, hintIndex }) {
  //TODO: neater way to do this?
  let hintComponents = [];

  return (
    <div className={classNames("hint-bar", { "x": horizontalHints, "y": !horizontalHints})}

      style={{
        '--num-hints': length
      }}>
      {hints.map((hint, index) => {
          const hintComponent = 
            <Hint key={index} 
            num={hint} 
            hintIndex={[hintIndex[0], hintIndex[1], index - fillNum]}
            />

          let hStr = horizontalHints ? "x" : "y";
          console.log(hStr + " hintIndex: " + [hintIndex[0], hintIndex[1], index - fillNum] + " -> " + hint);
          
          hintComponents.push(hintComponent);
          return hintComponent;
      })}
    </div>
  )
}

export default HintBar;
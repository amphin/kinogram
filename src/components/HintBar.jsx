import PropTypes from "prop-types";
import classNames from "classnames";
import Hint from "./Hint.jsx";
import "./Board.css"
import { useEffect } from "react";

HintBar.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.number).isRequired,
  vertical: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
  hintsComplete: PropTypes.object,
  vLast: PropTypes.bool.isRequired,
  hlast: PropTypes.bool.isRequired
}

function HintBar({hints, vertical, length, hintsComplete, vLast, hlast}) {
  //TODO: neater way to do this??
  // const borderWidth = parseFloat(getComputedStyle(document.querySelector('.hint-bar')).borderWidth);
  let hintComponents = [];

  // useEffect(() => {
  //   if (hintsComplete) {
  //     console.log(hintsComplete.keys());
  //   }
  // }, [hintsComplete]);
  
  return (
    <div className={classNames("hint-bar", { "y": vertical, "x": !vertical, "hp-bottom-edge": vLast, "hp-right-edge": hlast})}

      style={{
        '--num-hints': length
      }}>
      {hints.map((hint, index) => {
          const hintComponent = <Hint key={index} num={hint}/>;
          hintComponents.push(hintComponent);
          return hintComponent;
      })}
    </div>
  )
}

export default HintBar
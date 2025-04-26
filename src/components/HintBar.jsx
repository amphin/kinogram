import PropTypes from "prop-types";
import Hint from "./Hint.jsx";
import "./Board.css"
import { useEffect } from "react";

HintBar.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.number).isRequired,
  vertical: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
  hintsComplete: PropTypes.object
}

function HintBar({hints, vertical, length, hintsComplete}) {
  //TODO: neater way to do this?
  // const borderWidth = parseFloat(getComputedStyle(document.querySelector('.hint-bar')).borderWidth);
  let hintComponents = [];

  // useEffect(() => {
  //   if (hintsComplete) {
  //     console.log(hintsComplete.keys());
  //   }
  // }, [hintsComplete]);
  
  return (
    <div className={vertical ? 'hint-bar y' : 'hint-bar x'}
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
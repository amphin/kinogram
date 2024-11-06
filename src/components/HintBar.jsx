import React from 'react';
import PropTypes from "prop-types";
import Hint from "./Hint.jsx";
import "./Board.css"

HintBar.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.number).isRequired,
  vertical: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired
}

function HintBar({hints, vertical, length}) {
  //TODO: neater way to do this?
  // const borderWidth = parseFloat(getComputedStyle(document.querySelector('.hint-bar')).borderWidth);
  const hintComponents = [];

  function fillHints() {
    hintComponents.forEach((hintComponent) => {
      console.log(hintComponent);
    });
  }
  
  return (
    <div className={vertical ? 'hint-bar y' : 'hint-bar x'}
      style={{
        '--num-hints': length
      }}
      onClick={() => fillHints()}>
      {hints.map((hint, index) => {
          const hintComponent = <Hint key={index} num={hint} />;
          hintComponents.push(hintComponent);
          return hintComponent;
      })}
    </div>
  )
}

export default HintBar
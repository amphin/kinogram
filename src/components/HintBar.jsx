import { useContext } from "react";
import PropTypes from "prop-types";
import Hint from "./Hint.jsx";
import "./Board.css"
import { SizeContext } from "./Board.jsx";

HintBar.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.number).isRequired,
  vertical: PropTypes.bool.isRequired,
  length: PropTypes.string.isRequired
}

function HintBar({hints, vertical, length}) {
  const size = useContext(SizeContext);
  //TODO: neater way to do this?
  // const borderWidth = parseFloat(getComputedStyle(document.querySelector('.hint-bar')).borderWidth);

  return (
    <div className="hint-bar"
      style={{
        '--size': size,
        flexDirection: vertical ? 'column' : 'row',
        // height: vertical ? `calc(${length} + ${borderWidth * 2}px)` : `calc(${size} + ${borderWidth * 2}px)`,
        // width: vertical ? `calc(${size} + ${borderWidth * 2}px)` : `calc(${length} + ${borderWidth * 2}px)`,
        height: vertical ? length : size,
        width: vertical ? size : length
      }}>
      {hints.map((hint, index) => (
        <SizeContext.Provider key={index} value={size}>
          <Hint num={hint} />
        </SizeContext.Provider>
      ))}
    </div>
  )
}

export default HintBar
import PropTypes from "prop-types";
import Hint from "./Hint.jsx";
import "./Board.css"

HintBar.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.number).isRequired,
  vertical: PropTypes.bool.isRequired,
  length: PropTypes.string.isRequired
}

function HintBar({hints, vertical, length}) {
  //TODO: neater way to do this?
  // const borderWidth = parseFloat(getComputedStyle(document.querySelector('.hint-bar')).borderWidth);

  return (
    <div className={vertical ? 'hint-bar y' : 'hint-bar x'}
      style={{
        '--num-hints': length
      }}>
      {hints.map((hint, index) => (
          <Hint key={index} num={hint} />
      ))}
    </div>
  )
}

export default HintBar
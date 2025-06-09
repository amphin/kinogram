import PropTypes from 'prop-types'
import "./Board.css"
import HintBar from './HintBar.jsx'

HintPane.propTypes = {
  hintArrs: PropTypes.arrayOf(
                PropTypes.arrayOf(
                  PropTypes.number)).isRequired,
  horizontalHints: PropTypes.bool.isRequired,
  hintIndex: PropTypes.arrayOf(PropTypes.number).isRequired
}

function HintPane({ hintArrs, horizontalHints, hintIndex }) {
  const largestHintArr = Math.max(...hintArrs.map(arr => arr.length));

  function generateHintBars() {
    const bars = [];
    
    for (let i = 0; i < hintArrs.length; i++) {
      const fillNum = largestHintArr - hintArrs[i].length;
      bars.push(
      <HintBar 
        key={i}
        hints={[...Array(fillNum).fill(-1), ...hintArrs[i]]} 
        horizontalHints={horizontalHints} 
        length={largestHintArr}
        fillNum={fillNum}
        hintIndex={[hintIndex[0], i, 0]}
      />
      )
    }
    return bars;
  }

  return (
    <div 
      className="hint-pane"
      style={{flexDirection: horizontalHints ? 'column' : 'row'}}>
      {generateHintBars()}
    </div>
  )
}

export default HintPane;
import PropTypes from 'prop-types'
import "./Board.css"
import HintBar from './HintBar.jsx'

HintPane.propTypes = {
  hint_arrs: PropTypes.arrayOf(
                PropTypes.arrayOf(
                  PropTypes.number)).isRequired,
  hints_x: PropTypes.bool.isRequired
}

function HintPane({ hint_arrs, hints_x }) {
  console.log(hints_x);
  const largestHintArr = Math.max(...hint_arrs.map(arr => arr.length));
  
  function generateHintBars() {
    const bars = []
    
    for (let i = 0; i < hint_arrs.length; i++) {
      const fillNum = largestHintArr - hint_arrs[i].length;
      bars.push(
      <HintBar 
        key={i} 
        hints={[...Array(fillNum).fill(-1), ...hint_arrs[i]]} 
        vertical={hints_x ? false : true} 
        length={`${largestHintArr * 20}px`} />
      )
    }
    return bars;
  }

  return (
    <div 
      className="hint-pane"
      style={{flexDirection: hints_x ? 'column' : 'row'}}>
      {generateHintBars()}
    </div>
  )
}


export default HintPane;
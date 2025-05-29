import PropTypes from 'prop-types'
import "./Board.css"
import HintBar from './HintBar.jsx'

HintPane.propTypes = {
  hint_arrs: PropTypes.arrayOf(
                PropTypes.arrayOf(
                  PropTypes.number)).isRequired,
  x_axis_hints: PropTypes.bool.isRequired,
  hintsComplete: PropTypes.object.isRequired,
  vLast: PropTypes.bool.isRequired,
  hlast: PropTypes.bool.isRequired
}

function HintPane({ hint_arrs, x_axis_hints, hintsComplete, vLast, hlast }) {
  const largestHintArr = Math.max(...hint_arrs.map(arr => arr.length));

  function generateHintBars() {
    const bars = [];
    
    for (let i = 0; i < hint_arrs.length; i++) {
      const fillNum = largestHintArr - hint_arrs[i].length;
      bars.push(
      <HintBar 
        key={i}
        hints={[...Array(fillNum).fill(-1), ...hint_arrs[i]]} 
        vertical={x_axis_hints ? false : true} 
        length={largestHintArr}
        hintComplete={hintsComplete}
        vLast={i === hint_arrs.length - 1 && x_axis_hints}
        hlast={i === hint_arrs.length - 1 && !x_axis_hints}
      />
      )
    }
    return bars;
  }

  return (
    <div 
      className="hint-pane"
      style={{flexDirection: x_axis_hints ? 'column' : 'row'}}>
      {generateHintBars()}
    </div>
  )
}


export default HintPane;
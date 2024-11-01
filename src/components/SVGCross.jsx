import PropTypes from "prop-types";

SVGCross.propTypes = {
  outer: PropTypes.number,
  inner: PropTypes.number
};

function SVGCross({ outer, inner }) {
  const crossStyle = {
    width: outer,
    height: outer,
    display: "flex",
    margin: "0 auto"
  };

  return (
  <svg style={crossStyle}>
  <line 
    x1="0" y1="0"
    x2={inner} 
    y2={inner} 
    overflow="hidden" stroke="black" strokeWidth={inner/20}/>

    <line 
    x1={inner} 
    y1={inner} 
    x2="0" y2="0" 
    overflow="hidden" stroke="black" strokeWidth={inner/20} 
    transform={`rotate(90 ${inner/2} ${inner/2})`}/>
</svg>
  )
}

export default SVGCross
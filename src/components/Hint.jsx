import "./Board.css";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { SizeContext } from "./Board.jsx";

Hint.propTypes = {  
  num: PropTypes.number.isRequired
}

function Hint({num=0}) {
  const [number, setNumber] = useState(num) //need state?
  const size = useContext(SizeContext);

  return (
    <div className="hint"
        style={{'--size': size}}>
        {number}
    </div>
  )
}

export default Hint;
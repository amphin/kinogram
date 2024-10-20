import PropTypes from "prop-types";
import "./Board.css"
import Block from "./Block";

Board.propTypes = {
  size: PropTypes.number,
}

function Board({size=3}) {
  return (
    <>
    <div className="grid-container" style={{'--size': size}}>
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
    </div>
    </>
  );
}

export default Board;
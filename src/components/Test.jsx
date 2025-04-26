import { useEffect } from "react";

function Test({ stateProp }) {

  function doSmth() {
    console.log('did something');
  }

  useEffect(() => {
    doSmth();
  }, [stateProp]);
  
  return (
    <div>{stateProp}</div>
  )
}

export default Test;
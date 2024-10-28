import { useContext } from "react";
import { TestContext } from "../App";

function Test() {
  const testContext = useContext(TestContext);
  console.log("testContext is " + testContext);

  return (
    <div>{testContext}</div>
  )
}

export default Test;
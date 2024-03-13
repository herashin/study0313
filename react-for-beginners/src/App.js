import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { func } from "prop-types";

function Hello() {
  function destroyedFn() {
    console.log("bye :(");
  }

  function effectFn() {
    console.log("created :) ");
    return destroyedFn;
  }

  // 같은 익명 함수를 만들어도,  ()=>  방식과 function 방식에는 코드의 간소화 차이가 분명함.
  // 앞으로 ()=> 같은 방식을 사용하도록 연습할것
  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :(");
  }, []);
  useEffect(function () {
    console.log("hi :)");
    return function () {
      console.log("bye :(");
    };
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;

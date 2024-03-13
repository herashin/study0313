import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setvalue] = useState(0);

  const [keyword, setKeyword] = useState("");

  const onClick = () => setvalue((prev) => prev + 1);
  //  const onChange = (event) => (setKeyword = event.target.value);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(() => {
    console.log("I run only once.");
  }, []);

  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);

  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);

  useEffect(() => {
    console.log("I run when 'keyword & counter' changes.");
  }, [keyword, counter]);
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />

      <h1>{counter}</h1>
      <button onClick={onClick}>click me!!</button>
    </div>
  );
}

export default App;

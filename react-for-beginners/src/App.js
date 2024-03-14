import Button from "./Button";
import styles from "./App.module.css";
//import { useState, useEffect } from "react";
import { func } from "prop-types";
import { useState } from "react";

function App() {
  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);

  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setTodos((currentArray) => [toDo, ...currentArray]);
    setTodo("");
  };
  console.log(toDos);
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {/* 
     ***  to-do list 만들기 
      map은 배열속의 아이템에 적용하는 자스 함수로
       뽑아쓸 때  key 값이 필요하다. 
       뽑아쓰는 내용의 첫번째 argument는 value여야하고,
       이 value는 현재  toDo를 의미함. 
        현재 number값이 필요하기때문에  두번째 argument인 index를 사용함.
      */}
    </div>
  );
}

export default App;

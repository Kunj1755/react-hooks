import React, { useState } from "react";
const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  const inputChangeHandler = (event)=> {
    setTodoName(event.target.value);
  }
  const todoAddHandler = () => {
    // concat() will return a new array
    setTodoList(todoList.concat(todoName))
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" 
      onChange={inputChangeHandler} 
      value={todoName}/>
      <button type="button" onClick={todoAddHandler}>Add</button>
      <ul>
      {todoList.map(todo=> <li key={todo}>{todo}</li>)}
      </ul>
    </React.Fragment>
  );
};
export default todo;

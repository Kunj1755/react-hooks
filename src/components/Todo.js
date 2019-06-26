import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = props => {
  const [todoName, setTodoName] = useState("");
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);

  // Pass a function to useEffect() as its 1st argument
  useEffect(() => {
    axios.get("https://fir-6cd72.firebaseio.com/todo.json").then(result => {
      // console.log(result);
      const todoData = result.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({ id: key, name: todoData[key].name });
      }
      setTodoList(todos);
    });
    return () => {
      console.log("cleanup");
    };
  }, [todoName]);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    // return is used to write clean up code
    return () => {
      // Remove the mousemove listener that executes mouseMoveHandler
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  useEffect(() => {
    if (submittedTodo) {
      setTodoList(todoList.concat(submittedTodo));
    }
  }, [submittedTodo]);

  const inputChangeHandler = event => {
    setTodoName(event.target.value);
  };
  const todoAddHandler = () => {
    axios
      .post("https://fir-6cd72.firebaseio.com/todo.json", { name: todoName })
      .then(res => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          setSubmittedTodo(todoItem);
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};
export default Todo;

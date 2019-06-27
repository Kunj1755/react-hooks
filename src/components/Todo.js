import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const Todo = props => {
  const [todoName, setTodoName] = useState("");
  //const [submittedTodo, setSubmittedTodo] = useState(null);
  // As we are using useReducer. Comment this line of code
  //const [todoList, setTodoList] = useState([]);

  //React will pass these arguments automatically for us
  // state -> latest state
  // action -> Info about what to do
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      // this will set my state to a completely new list
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };
  /* useReducer can take 3 args: 
  1. Reducer function
  2. Starting state 
  3. Can pass an initial action here
  */
  // We get back exactly 2 elements from useReducer
  // [] is the initial state passed to todoListReducer()
  const [todoList, dispatch] = useReducer(todoListReducer, []);
  /* After this line we can start dispatching actions. 
  This is the reason we have moved code at the top.
  */

  // Pass a function to useEffect() as its 1st argument
  useEffect(() => {
    axios.get("https://fir-6cd72.firebaseio.com/todo.json").then(result => {
      // console.log(result);
      const todoData = result.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({ id: key, name: todoData[key].name });
      }
      // Instead of the below statement, now we will dispatch actions
      //setTodoList(todos);
      dispatch({ type: "SET", payload: todos });
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

  // useEffect(() => {
  //   if (submittedTodo) {
  //     // setTodoList(todoList.concat(submittedTodo));
  //     dispatch({ type: "ADD", payload: submittedTodo });
  //   }
  // }, [submittedTodo]);

  const inputChangeHandler = event => {
    setTodoName(event.target.value);
  };
  const todoAddHandler = () => {
    axios
      .post("https://fir-6cd72.firebaseio.com/todo.json", { name: todoName })
      .then(res => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          //setSubmittedTodo(todoItem);
          dispatch({ type: "ADD", payload: todoItem });
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://fir-6cd72.firebaseio.com/${todoId}.json`)
      .then(res => {
        dispatch({ type: "REMOVE", payload: todoId });
      })
      .catch(err => console.log(err));
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
          <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
export default Todo;

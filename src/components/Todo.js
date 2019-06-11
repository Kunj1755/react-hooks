import React, { useState } from "react";
const todo = props => {
  const [todoName, setTodoName] = useState('');
  const inputChangeHandler = (event)=> {
    setTodoName(event.target.value);
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" 
      onChange={inputChangeHandler} 
      value={todoName}/>
      <button type="button">Add</button>
      <ul />
    </React.Fragment>
  );
};
export default todo;

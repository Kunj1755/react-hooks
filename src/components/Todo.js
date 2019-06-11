import React, { useState } from "react";
const todo = props => {
  const inputState = useState('');
  const inputChangeHandler = (event)=> {
    inputState[1](event.target.value);
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" 
      onChange={inputChangeHandler} 
      value={inputState[0]}/>
      <button type="button">Add</button>
      <ul />
    </React.Fragment>
  );
};
export default todo;

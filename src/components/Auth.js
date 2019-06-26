import React, { useContext } from "react";

import AuthContext from "../auth-context";

const Auth = props => {
  /*  useContext is used to get access to the context.
      There can be more than one Context in react,
      so we need an identifier for the context we want to tap in here. 
      AuthContext is that identifier.
  */
  const auth = useContext(AuthContext);

  return <button onClick={auth.login}>Log in!</button>;
};

export default Auth;

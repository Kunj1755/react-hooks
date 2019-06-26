import React from "react";

// false is the default value for the context
// Keeping default value as false as we want to start as unauthenticated
// The value can be an object, number etc.
// We will use this context in App.js

/* By setting the same context structure here as we have in App.js,
 The IDE gives better autocompletion
*/
const AuthContext = React.createContext({ status: false, login: () => {} });

export default AuthContext;

import React from "react";

import Router from "./Router";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header>
        <p>This is a form that submits to lambda! YAY</p>
      </Header>
      <Router />
    </>
  );
}

export default App;

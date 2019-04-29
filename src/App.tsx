import React from "react";

import EntryForm from "./EntryForm";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header>
        <p>This is a form that submits to lambda! YAY</p>
      </Header>
      <Main>
        <EntryForm />
      </Main>
    </div>
  );
}

export default App;

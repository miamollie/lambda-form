import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EntryForm from "../src/pages/EntryForm";
import ThankYou from "../src/pages/ThankYou";
import Entries from "../src/pages/Entries";
import Nav from "./components/Nav/Nav";

const AppRouter = () => (
  <BrowserRouter>
    <Route path="/">
      <Nav />
      <>
        <Switch>
          <Route path="/" exact component={Entries} />
          <Route path="/new" component={EntryForm} />
          <Route path="/thank-you" component={ThankYou} />
        </Switch>
      </>
    </Route>
  </BrowserRouter>
);

export default AppRouter;

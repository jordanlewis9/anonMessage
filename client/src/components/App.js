import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Board from "./Board";
import Thread from "./Thread";
import NoMatch from "./NoMatch";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/b/:board/:thread_id" component={Thread} />
            <Route exact path="/b/:board" component={Board} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

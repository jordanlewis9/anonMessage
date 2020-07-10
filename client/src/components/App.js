import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Home from "./Home";
import Board from "./Board";
import Thread from "./Thread";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/b/:board/:thread_id" component={Thread} />
        <Route exact path="/b/:board" component={Board} />
      </BrowserRouter>
    </div>
  );
};

export default App;

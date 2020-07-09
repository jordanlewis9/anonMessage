import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Home from "./Home";
import Board from "./Board";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/b/:board" component={Board} />
      </BrowserRouter>
    </div>
  );
};

export default App;

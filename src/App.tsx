import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="header__logo" alt="logo" />
        <p>
          <b>TECHNICAL TEST</b> JavaScript Developer
        </p>
      </header>
      <div className="app__body">
        <p>Body</p>
      </div>
    </div>
  );
}

export default App;

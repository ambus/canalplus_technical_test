import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchInput } from "./components/SearchInput";

export const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="header__logo" alt="logo" />
        <p>
          <b>TECHNICAL TEST</b> JavaScript Developer
        </p>
      </header>
      <div className="app__body">
        <div className="body__search">
          <SearchInput
            placeholder="Search"
            id="search"
            name="search"
          ></SearchInput>
        </div>
      </div>
    </div>
  );
};

export default App;

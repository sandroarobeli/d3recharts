import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <footer className="App-footer">
        <img src={logo} className="App-logo" alt="logo" />
        <p>MADE WITH RECHARTS</p>
      </footer>
    </div>
  );
}

export default App;

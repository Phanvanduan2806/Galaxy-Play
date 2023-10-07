import logo from "./logo.svg";
import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Charts from "./component/Dashboard/Charts/Charts";
import "./component/scss/style.scss";
import Login from "./component/Home/Login/Login";
import { useState } from "react";
import Home from "./component/Home/Home";

function App() {
  const [loginAdmin, setLoginAdmin] = useState(false);
  return (
    <>
      {loginAdmin ? (
        <Charts setLoginAdmin={setLoginAdmin} />
      ) : (
        <Home setLoginAdmin={setLoginAdmin} />
      )}
    </>
  );
}
export default App;

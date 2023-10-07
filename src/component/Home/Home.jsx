import React, { useState } from "react";
import "./Home.scss";
import { Outlet, Link } from "react-router-dom";
import { Routes, Route ,BrowserRouter } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import DetailFilm from "./DetailFilm/DetailFilm";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Vip from "./Vip/Vip";
function Home({setLoginAdmin}) {
  const [login,setLogin] = useState(false);
  console.log(login);
  return (
    <>
      <BrowserRouter>
      <Navbar login={login} setLogin={setLogin}></Navbar>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login  setLogin={setLogin} setLoginAdmin={setLoginAdmin}/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/detail/:name/:id" element={<DetailFilm />} />
        <Route exact path="/vip" element={<Vip />} />
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default Home;

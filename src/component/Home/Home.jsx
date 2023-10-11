import React, { useState } from "react";
import "./Home.scss";
import { Outlet, Link } from "react-router-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import DetailFilm from "./DetailFilm/DetailFilm";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Vip from "./Vip/Vip";
import PlayFilm from "./PlayFilm/PlayFilm";
function Home({ setLoginAdmin }) {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState();

  console.log(user);

  return (
    <>
      <BrowserRouter>
        <Navbar login={login} setLogin={setLogin}></Navbar>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            exact
            path="/login"
            element={
              <Login
                setLogin={setLogin}
                setLoginAdmin={setLoginAdmin}
                setUser={setUser}
              />
            }
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/detail/:name/:id" element={<DetailFilm user={user} />} />
          <Route exact path="/play/:name/:id" element={<PlayFilm />} />
          <Route exact path="/vip" element={<Vip user={user} />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default Home;

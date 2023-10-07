import React, { useState, useEffect, Profiler } from "react";
import { db, auth } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import "./Charts.scss";
import { Navigation } from "./Navigation";
import { Outlet, Link, BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Categories from "../Categories/Categories";
import Film from "../Film/Film";
import User from "../Users/Users";
import Profiles from "../Profiles/Profiles";
function Charts({ setLoginAdmin, setHome, props }) {
  const [idActive, setIdActive] = useState(0);
  const [dropdownAuthor, setDropdownAuthor] = useState(false);
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [checkUpload, setCheckUpload] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Handle authour
  const handleAuthor = () => {
    setDropdownAuthor(!dropdownAuthor);
    console.log(dropdownAuthor);
  };
  // handle active menu
  const handleActive = (index) => {
    setIdActive(index);
  };
  // Bộ sưu tập user
  useEffect(() => {
    // Fetch categories from Firebase Firestore and update the state
    const fetchData = async () => {
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
    };
    fetchData();
    // Lấy thông tin người dùng hiện tại
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [checkUpload]);
  // Logout admin
  const logoutAdmin = () => {
    setLoginAdmin(false);
  }

  return (
    <>
      <BrowserRouter>
        <div id="wrapper">
          {/* <!-- Sidebar --> */}
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
            {/* <!-- Sidebar - Brand --> */}
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="#"
              id="navBrand"
            >
              <div className="sidebar-brand-icon">
                <a className="navbar-brand" href="#">
                  <img
                    src="https://galaxyplay.vn/landings/assets/img/logo-white-new.png"
                    alt=""
                    height="40px"
                    className="d-inline-block align-text-top"
                  />
                </a>
              </div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0"></hr>

            {/* <!-- Nav Item - Dashboard --> */}
            {Navigation.map((element, index) => (
              <>
                <li
                  key={element.navId}
                  className={`nav-item ${idActive == index ? "active" : ""}`}
                  onClick={() => handleActive(index)}
                >
                  <Link
                    key={element.navId}
                    to={element.navLink}
                    className="nav-link"
                    href={element.navLink}
                  >
                    <i className={element.navIcon}></i>
                    <span>{element.navName}</span>
                  </Link>
                </li>
              </>
            ))}

            {/*  */}
            <hr className="sidebar-divider d-none d-md-block"></hr>
          </ul>
          <div
            id="content-wrapper"
            className="d-flex flex-column"
            style={{ overflow: "scroll" }}
          >
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars"></i>
                </button>
                <a
                  className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100"
                  onClick={() => setHome(true)}
                >
                  <i className="fa-solid fa-house"></i>
                  <span className="ml-md-2">Home</span>
                </a>
                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#">
                      <i className="fas fa-bell fa-fw"></i>
                      <span className="badge badge-danger badge-counter">
                        3+
                      </span>
                    </a>
                  </li>
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="messagesDropdown"
                    >
                      <i className="fas fa-envelope fa-fw"></i>
                      <span className="badge badge-danger badge-counter">
                        7
                      </span>
                    </a>
                  </li>

                  <div className="topbar-divider d-none d-sm-block"></div>

                  {/* <!-- Nav Item - User Information --> */}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={handleAuthor}
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        {currentUser ? currentUser.displayName : ""}
                      </span>
                      <img
                        className="img-profile rounded-circle"
                        src="https://www.clipartmax.com/png/full/319-3191274_male-avatar-admin-profile.png"
                      />
                    </a>
                    {/* <!-- Dropdown - User Information --> */}
                    <div
                      className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
                        dropdownAuthor ? "show" : ""
                      }`}
                      aria-labelledby="userDropdown"
                    >
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                      </a>
                      <div className="dropdown-divider"></div>
                      <Link
                        className="dropdown-item"
                        to='/'
                        onClick={() => setLoginAdmin(false)}
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        <span>Logout</span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </nav>

              <div className="container-fluid">
                <Routes>
                  <Route
                    path="/categories"
                    element={<Categories></Categories>}
                  />
                  <Route path="/film" element={<Film></Film>} />
                  <Route path="/user" element={<User></User>} />
                  <Route path="/profile" element={<Profiles></Profiles>} />
                </Routes>
              </div>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2020</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default Charts;

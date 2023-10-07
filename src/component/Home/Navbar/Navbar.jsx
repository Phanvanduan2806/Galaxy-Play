import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.scss";
function Navbar({ login, setLogin }) {
  const logOut = () => {
    setLogin(false);
  }
  return (
    <>
      <nav className="home__navbar navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ height: "50px" }} href="#">
            <img
              src="https://assets.glxplay.io/web/images/logoglx.svg"
              alt=""
              height="40px"
              className="d-inline-block align-text-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="#" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Kho Phim
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Phim Điện Ảnh
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Phim Bộ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Phim Thuê
                </a>
              </li>
              <li className="nav-item">
                <Link to="/vip" className="nav-link" href="#">
                  Gói Vip
                </Link>
              </li>
            </ul>
            {login ? (
              <div className="grounp-login d-flex">
                <ul className="navbar-nav">
                  <li className="nav-item d-flex align-items-center">
                    <a
                      href="#"
                      className="nav-link"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                  </li>
                  <li className="nav-item d-flex justify-content-center dropdown dropdowns">
                    <a
                      href="#"
                      className="nav-link nav-link-hover"
                      style={{ fontSize: "2rem", color: "#264E9A" }}
                    >
                      <i class="fa-solid fa-face-smile"></i>
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          <i
                            class="fa-solid fa-face-smile"
                            style={{ fontSize: "1rem", color: "#264E9A" }}
                          ></i>
                          <span className="ms-2">My media</span>
                        </a>
                      </li>
                      <li className="align-items-center  d-flex">
                        <a class="dropdown-item" href="#">
                          <i
                            class="fa-solid fa-pen-nib"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span className="ms-2">Quản lí kho phim</span>
                        </a>
                      </li>

                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i
                            class="fa-regular fa-user"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span className="ms-2">Tài khoản</span>
                        </a>
                      </li>
                      <li>
                        <Link
                          to="/"
                          onClick={logOut}
                          class="dropdown-item"
                          href="#"
                        >
                          <i
                            class="fa-solid fa-arrow-right-from-bracket"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span className="ms-2">Đăng xuất</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="group-login d-flex">
                <div className="btn__switch d-flex align-items-center me-3">
                  <span className="me-2 ">Giao diện mới:</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
                <Link
                  to="/login"
                  className="btn btn-outline-primary nav__btn__search"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

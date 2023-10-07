import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import Cookies from "js-cookie";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Login({ setLogin, setLoginAdmin }) {
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [checkUpload, setCheckUpload] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [errors, setErrors] = useState([]);
  const [statusAmin, setStatusAdmin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setLogin(true);
      // Redirect to the appropriate page here
    }
  }, []);
  

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
  }, [checkUpload]);
  // Login gg
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    // Sử dụng useNavigate để chuyển hướng đến trang "/home"
    navigate("/");
    setLogin(true);
  };
  // Hãy chắc chắn bạn có thông tin về vai trò hoặc quyền hạn của người dùng sau khi họ đăng nhập thành công.
  // Ví dụ, giả sử bạn có một thuộc tính "role" trong đối tượng người dùng.
  // Login
  const handleRememberMeChange = (e) => {
    setRememberMe(!rememberMe); // Khi checkbox thay đổi, cập nhật trạng thái
  };
  //Han del login
  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Kiểm tra email và mật khẩu hợp lệ
    const isValidUser = users.some((element) => {
      return element.email === email && element.password === password;
    });

    if (!isValidUser) {
      newErrors.email = "Email hoặc mật khẩu không đúng";
      newErrors.password = "Email hoặc mật khẩu không đúng";
    }

    if (Object.keys(newErrors).length === 0) {
      // Đăng nhập thành công

      // Thiết lập cookie đăng nhập nếu checkbox được chọn
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
      } else {
        localStorage.removeItem("isLoggedIn");
      }

      // Kiểm tra quyền truy cập admin dựa trên vai trò hoặc quyền hạn của người dùng
      const loggedInUser = users.find((element) => element.email === email);
      if (loggedInUser && loggedInUser.role === "admin") {
        // Người dùng có quyền truy cập admin
        // Redirect hoặc thực hiện các hành động cần thiết cho admin ở đây
        // Ví dụ: redirect đến trang admin
        setLoginAdmin(true);
        navigate("/dashboard");
      } else {
        // Người dùng không có quyền truy cập admin
        navigate("/");
      }

      setLogin(true);
    } else {
      // Nếu có lỗi, cập nhật state errors để hiển thị cho người dùng
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="bg-login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-12 col-lg-6">
              <div className="card my-5">
                <div className="p-3">
                  <div className="text-center">
                    <h1
                      className="h4 text-white mb-4"
                      style={{ fontWeight: "600" }}
                    >
                      Đăng nhập
                    </h1>
                  </div>
                  <form className="user" onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="exampleInputEmail"
                        placeholder="Enter Email Address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={`form-control form-control-user ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="exampleInputPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="text-white ms-2">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                        />
                        Remember Me
                      </label>
                    </div>
                    <button
                      type="submit"
                      href="#"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Login
                    </button>
                    <hr />
                    <button
                      href="#"
                      className="btn btn-google btn-user btn-block"
                      onClick={signInWithGoogle}
                    >
                      <i className="fab fa-google fa-fw"></i> Login with Google
                    </button>
                    <a href="#" className="btn btn-facebook btn-user btn-block">
                      <i className="fab fa-facebook-f fa-fw"></i> Login with
                      Facebook
                    </a>
                  </form>
                  <hr />
                  <div className="text-center">
                    <a className="small" href="#">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <Link to="/register" className="small" href="#">
                      Create an Account!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

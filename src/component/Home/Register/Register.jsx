import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Register({ props }) {
  const usersCollectionRef = collection(db, "users");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("user");
  const [checkUpload, setCheckUpload] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regex validate
  const validateEmail = (email) =>
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email);
  const validatePassword = (password) => /^\d{6}$/.test(password);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};

    try {
      // Kiểm tra nếu email đã tồn tại trong danh sách users
      const userWithEmail = users.find((user) => user.email === email);
      if (userWithEmail) {
        newErrors.email = "Email đã tồn tại";
      }

      if (!validateEmail(email)) {
        newErrors.email = "Email không hợp lệ";
      }

      if (!validatePassword(password)) {
        newErrors.password = "Mật khẩu gồm 6 chữ số";
      }
      if (repassword !== password) {
        newErrors.repassword = "Mật khẩu không khớp";
      }
      if (!name) {
        newErrors.name = "Vui lòng nhập tên";
      }
      // Kiểm tra các trường thông tin khác ở đây (nếu cần)

      if (Object.keys(newErrors).length === 0) {
        // Thêm dữ liệu người dùng vào cơ sở dữ liệu với quyền truy cập đã xác định
        await addDoc(usersCollectionRef, {
          name: name,
          email: email,
          password: password,
          role: userRole, // Sử dụng giá trị userRole đã xác định
        });

        // Đặt lại trạng thái và thông báo thành công
        setCheckUpload(!checkUpload);
        setName("");
        setEmail("");
        setPassword("");
        setRepassword("");
        alert("Đăng ký thành công");
        navigate("/login");
      } else {
        // Nếu có lỗi, cập nhật state errors để hiển thị cho người dùng
        setErrors(newErrors);
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      alert("Đăng ký không thành công. Vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div className="bg-login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-12 col-lg-6">
              <div className="card o-hidden my-5">
                <div className="p-3">
                  <div className="text-center">
                    <h1
                      className="h4 text-white mb-4"
                      style={{ fontWeight: "600" }}
                    >
                      Đăng ký
                    </h1>
                  </div>
                  <form className="user" onSubmit={handleRegister}>
                    <div className="form-group">
                      <input
                        type="name"
                        className={`form-control form-control-user ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        placeholder="Nhập họ và tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className={`form-control form-control-user ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="Email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          className={`form-control form-control-user ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          id="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="password"
                          className={`form-control form-control-user ${
                            errors.repassword ? "is-invalid" : ""
                          }`}
                          id="repeatPassword"
                          placeholder="Nhập lại mật khẩu"
                          value={repassword}
                          onChange={(e) => setRepassword(e.target.value)}
                        />
                        {errors.repassword && (
                          <div className="invalid-feedback">
                            {errors.repassword}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      href="#"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Đăng ký ngay
                    </button>
                    <hr />
                    <a href="#" className="btn btn-google btn-user btn-block">
                      <i className="fab fa-google fa-fw"></i> Register with
                      Google
                    </a>
                    <a href="#" className="btn btn-facebook btn-user btn-block">
                      <i className="fab fa-facebook-f fa-fw"></i> Register with
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
                    <Link to="/login" className="small" href="#">
                      Already have an account? Login!
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

export default Register;

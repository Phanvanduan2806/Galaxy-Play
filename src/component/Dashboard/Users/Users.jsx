import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
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
function Users() {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [checkUpload, setCheckUpload] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(null);
  const [userId, setUserId] = useState(null);

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
  // Delete user
  const deleteUser = async (userID) => {
    try {
      // Delete a document from the "categories" collection
      const userDocRef = doc(db, "users", userID);
      await deleteDoc(userDocRef);
      setCheckUpload(!checkUpload);
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  // Add user
  const addUser = async (e) => {
    e.preventDefault();
    const newErrors = {};
    try {
      // Trước khi thêm người dùng mới, kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
      const querySnapshot = await getDocs(
        query(usersCollectionRef, where("email", "==", email))
      );

      if (querySnapshot.size > 0) {
        // Nếu đã có người dùng sử dụng email này, bạn có thể xử lý thông báo lỗi hoặc thực hiện các hành động cần thiết.
        newErrors.email = "Người dùng đã tồn tại";
      }
      if (!email) {
        newErrors.email = "Vui lòng nhập email";
      }
      if (!role) {
        newErrors.role = "Chọn vai trò";
      }
      if (!name) {
        newErrors.name = "Vui lòng nhập tên";
      }
      if (!password) {
        newErrors.password = "Vui lòng nhập mật khẩu";
      }
      if (Object.keys(newErrors).length === 0) {
        // Nếu email chưa tồn tại, thêm người dùng mới vào cơ sở dữ liệu
        await addDoc(usersCollectionRef, {
          name: name,
          email: email,
          password: password,
          role: role,
        });

        // Cập nhật trạng thái và làm sạch các trường dữ liệu
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setCheckUpload(!checkUpload);
        alert("Thêm người dùng thành công!");
      } else {
        setErrors(newErrors);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi thêm người dùng mới:", error);
    }
  };

  // Edit User
  const editUser = (id, name, email, password, role) => {
    setUserId(id);
    setName(name);
    setEmail(email);
    setPassword(password);
    setRole(role);
    setErrors({}); // Xóa các lỗi khi bạn bắt đầu chỉnh sửa
  };

  // Update User
  const updateUser = async (e) => {
    e.preventDefault();
    const newErrors = {};

    try {
      if (!userId) {
        newErrors.userId = "Vui lòng chọn người dùng cần cập nhật";
      }
      if (!name) {
        newErrors.name = "Vui lòng nhập tên";
      }
      if (!role) {
        newErrors.role = "Chọn vai trò";
      }
      if (Object.keys(newErrors).length === 0) {
        // Nếu không có lỗi, thực hiện cập nhật thông tin người dùng
        await updateDoc(doc(usersCollectionRef, userId), {
          name: name,
          role: role,
        });

        // Cập nhật trạng thái và làm sạch các trường dữ liệu
        setName("");
        setRole("");
        setEmail("");
        setPassword("");
        setUserId(""); // Xóa userId để sử dụng cho lần cập nhật tiếp theo (nếu có)
        setCheckUpload(!checkUpload);
        alert("Cập nhật thành công");
      } else {
        setErrors(newErrors);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  return (
    <>
      <h2>User Categories</h2>
      <div className="row">
        <div className="col col-md-6">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add__categories"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <form className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search user"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn btn-outline-primary"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="table__heading">Category:</div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Vai trò</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td className="td__action">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#update__user"
                  onClick={() =>
                    editUser(
                      user.id,
                      user.name,
                      user.email,
                      user.password,
                      user.role
                    )
                  }
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => deleteUser(user.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabindex="-1"
              aria-disabled="true"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </nav>
      {/* Modal */}
      <form
        className="modal fade"
        id="add__categories"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onSubmit={addUser}
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add User
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <div class="form-group">
                    <label>Họ và tên</label>
                    <input
                      type="name"
                      class={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Nhập họ và tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      class={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id=""
                      aria-describedby="emailHelp"
                      placeholder="Nhập địa chỉ email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label>Mật khẩu</label>
                    <input
                      type="text"
                      class={`form-control ${errors.role ? "is-invalid" : ""}`}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label>Vai trò</label>
                    <select
                      class={`form-control ${errors.role ? "is-invalid" : ""}`}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value={"user"}>Người dùng</option>
                      <option value={"admin"}>Quản trị viên</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">{errors.role}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Modal updaet */}
      <form
        className="modal fade"
        id="update__user"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onSubmit={updateUser}
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update User
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <div class="form-group">
                    <label>Họ và tên</label>
                    <input
                      value={name}
                      type="name"
                      class={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Nhập họ và tên"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      class={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={email}
                      aria-describedby="emailHelp"
                      placeholder="Nhập địa chỉ email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label>Mật khẩu</label>
                    <input
                      type="text"
                      class={`form-control ${errors.role ? "is-invalid" : ""}`}
                      value={password}
                      placeholder="Nhập mật khẩu"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label>Vai trò</label>
                    <select
                      class={`form-control ${errors.role ? "is-invalid" : ""}`}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value={"user"}>Người dùng</option>
                      <option value={"admin"}>Quản trị viên</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">{errors.role}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Users;

import React, { useState, useEffect } from "react";
import "./Vip.scss";
import { Link } from "react-router-dom";
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

function Vip(props) {
  const { user } = props;
  const [newVIPStatus, setNewVIPStatus] = useState(0);
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);

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
  }, [newVIPStatus]);

  // Click vip
  const clickVip = (linkId) => {
    if (!user) {
      alert("Bạn cần đăng nhập trước khi đăng ký gói VIP.");
      return;
    }

    let newStatus = 0;

    // Xác định hành động tương ứng với từng Link
    if (linkId === 1) {
      newStatus = 1;
    } else if (linkId === 2) {
      newStatus = 2;
    } else if (linkId === 3) {
      newStatus = 3;
    }

    // Cập nhật newVIPStatus để sử dụng khi submit VIP
    setNewVIPStatus(newStatus);
  };
  console.log("Đang chọn vip:", newVIPStatus);
  console.log("user", user);

  // Submit VIP
  const handleVIP = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      alert("Bạn cần đăng nhập trước khi đăng ký gói VIP.");
    } else {
      // Tìm người dùng hiện tại dựa trên currentUser hoặc thông tin người dùng khác để cập nhật gói VIP của họ
      const currentUserDoc = users.find(
        (element) => element.email === user.email
      );
      if (currentUserDoc) {
        try {
          // Định nghĩa usersCollectionRef trước đó
          const userDocRef = doc(usersCollectionRef, currentUserDoc.id);

          // Cập nhật gói VIP
          await updateDoc(userDocRef, { vip: newVIPStatus });

          // Cập nhật trạng thái và làm sạch các trường dữ liệu
          setNewVIPStatus(0);
          alert("Đã thuê gói vip");
        } catch (error) {
          console.error("Lỗi khi cập nhật gói VIP:", error);
          alert("Đã xảy ra lỗi khi cập nhật gói VIP.");
        }
      } else {
        alert("Người dùng không tồn tại.");
      }
    }
  };

  return (
    <>
      <div className="container container-vip">
        <h3 className="title-vip">Chọn gói Galaxy Play</h3>
        <p className="des-vip">Huỷ bất cứ lúc nào</p>
        <form className="row" onSubmit={handleVIP}>
          <Link
            className="text-decoration-none vip col-lg-4 col-md-12 p-3"
            onClick={() => clickVip(1)}
          >
            <div
              className={`vip-item d-flex flex-lg-column flex-sm-row justify-content-sm-around ${
                newVIPStatus == 1 ? "border-danger border" : ""
              }`}
            >
              <div className="d-flex flex-column">
                <h5 className="vip-item-title">Di động</h5>
                <span style={{ color: "black", fontSize: "0.9rem" }}>
                  100.000đ/6 tháng
                </span>
              </div>

              <hr className="" />
              <div className="d-flex flex-column">
                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-xmark"
                    style={{ fontSize: "0.9rem", color: "red" }}
                  ></i>{" "}
                  Có quảng cáo
                </span>

                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-check"
                    style={{ fontSize: "0.9rem", color: "#336CB8" }}
                  ></i>{" "}
                  Xem trên thiết bị di động
                </span>

                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-check"
                    style={{ fontSize: "0.9rem", color: "#336CB8" }}
                  ></i>{" "}
                  Kho phim có sẵn với hơn 10.000 giờ nội dung đặc sắc
                </span>
              </div>
            </div>
          </Link>
          <Link
            className="text-decoration-none vip col-lg-4 col-md-12 p-3"
            onClick={() => clickVip(2)}
          >
            <div
              className={`vip-item d-flex flex-lg-column flex-sm-row justify-content-sm-around ${
                newVIPStatus == 2 ? "border-danger border" : ""
              }`}
            >
              <div className="d-flex flex-column">
                <h5 className="vip-item-title">Siêu Việt</h5>
                <span style={{ color: "black", fontSize: "0.9rem" }}>
                  99.000đ/tháng
                </span>
              </div>

              <hr className="" />
              <div className="d-flex flex-column">
                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-xmark"
                    style={{ fontSize: "0.9rem", color: "red" }}
                  ></i>{" "}
                  Có quảng cáo
                </span>

                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-check"
                    style={{ fontSize: "0.9rem", color: "#336CB8" }}
                  ></i>{" "}
                  Xem trên mọi thiết bị
                </span>

                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-check"
                    style={{ fontSize: "0.9rem", color: "#336CB8" }}
                  ></i>{" "}
                  Kho phim có sẵn với hơn 10.000 giờ nội dung đặc sắc
                </span>
              </div>
            </div>
          </Link>
          <Link
            className="text-decoration-none vip col-lg-4 col-md-12 p-3"
            onClick={() => clickVip(3)}
          >
            <div
              className={`vip-item d-flex flex-lg-column flex-sm-row justify-content-sm-around ${
                newVIPStatus == 3 ? "border-danger border" : ""
              }`}
            >
              <div className="d-flex flex-column">
                <h5 className="vip-item-title">Cap cấp</h5>
                <span style={{ color: "black", fontSize: "0.9rem" }}>
                  599.000đ/6 tháng
                </span>
              </div>

              <hr className="" />
              <div className="d-flex flex-column">
                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-xmark"
                    style={{ fontSize: "0.9rem", color: "red" }}
                  ></i>{" "}
                  Có quảng cáo
                </span>

                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-check"
                    style={{ fontSize: "0.9rem", color: "#336CB8" }}
                  ></i>{" "}
                  Xem trên mọi thiết bị
                </span>

                <span
                  className="vip-item-des"
                  style={{ fontSize: "0.9rem", color: "black" }}
                >
                  <i
                    class="fa-solid fa-check"
                    style={{ fontSize: "0.9rem", color: "#336CB8" }}
                  ></i>{" "}
                  Kho phim có sẵn với hơn 10.000 giờ nội dung đặc sắc
                </span>
              </div>
            </div>
          </Link>
          <div className="form-ground">
            <button type="submit" class="btn btn-danger">
              Đăng ký gói
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Vip;

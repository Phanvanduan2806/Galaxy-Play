import React from "react";
import "./Vip.scss";

function Vip(props) {
  return (
    <>
      <div className="container container-vip">
        <h3 className="title-vip">Chọn gói Galaxy Play</h3>
        <p className="des-vip">Huỷ bất cứ lúc nào</p>
        <div className="row">
          <div className="vip col-lg-4 col-md-12 p-3">
            <div className="vip-item d-flex flex-lg-column flex-sm-row justify-content-sm-around">
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
          </div>
          <div className="vip col-lg-4 col-md-12 p-3">
            <div className="vip-item d-flex flex-lg-column flex-sm-row justify-content-sm-around">
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
          </div>
          <div className="vip col-lg-4 col-md-12 p-3">
            <div className="vip-item d-flex flex-lg-column flex-sm-row justify-content-sm-around">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Vip;

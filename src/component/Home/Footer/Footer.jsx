import React from "react";

function Footer() {
  return (
    <>
      <footer
        className="text-center text-lg-start text-muted"
        style={{ backgroundColor: "black" }}
      >
        <section className="p-0">
          <div className="container">
            <div className="row row__logo">
              <div className="col">
                <p className="text-md-start">
                  <a
                    className="navbar-brand"
                    style={{ height: "60px" }}
                    href="#"
                  >
                    <img
                      src="https://assets.glxplay.io/web/images/logoglx.svg"
                      alt=""
                      className="d-inline-block align-text-top"
                    />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <div className="container text-center text-white">
            <div className="row ">
              <div className="col-md-6 col-lg-4 col-xl-3 mx-auto mb-4">
                <p className="text-start">
                  Galaxy Play là dịch vụ được cung cấp bởi Công ty Cổ Phần
                  Galaxy Play, thành viên của Công ty Cổ Phần Giải Trí và Giáo
                  Dục Galaxy (GEE.,JSC) Địa chỉ: 59 Xa Lộ Hà Nội, Phường Thảo
                  Điền, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh, Việt Nam. Mã
                  số doanh nghiệp: 0106539659. Ngày cấp mã số doanh nghiệp:
                  15/5/2014. Nơi cấp: Sở kế hoạch và đầu tư thành phố Hà Nội.
                </p>
              </div>
              <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-start">
                  Giới thiệu
                </h6>
                <p className="text-start">
                  <a href="#!" className="text-reset">
                    Quy chế sử dụng dịch vụ
                  </a>
                </p>
                <p className="text-start">
                  <a href="#!" className="text-reset">
                    Chính sách bảo mật
                  </a>
                </p>
                <p className="text-start">
                  <a href="#!" className="text-reset">
                    Khuyến mãi
                  </a>
                </p>
              </div>
              <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-start">
                  Khuyến mãi
                </h6>
                <p className="text-start">
                  <a href="#!" className="text-reset">
                    1800 9090 (24/7)
                  </a>
                </p>
                <p className="text-start">
                  <a href="#!" className="text-reset">
                    play@galaxy.com.vn
                  </a>
                </p>
                <p className="text-start">
                  <a href="#!" className="text-reset">
                    https://galaxyplay.vn/help
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-start">
                  Tải ứng dụng
                </h6>
                <div className="d-flex mb-4">
                  <div style={{ height: "40px" }}>
                    <img
                      src="https://assets.glxplay.io/web/responsive/w200/android-app-download-button.png"
                      height={"40px"}
                      alt=""
                    />
                  </div>
                </div>
                <h6 className="text-uppercase fw-bold mb-4 text-start">
                  Kết nối với chúng tôi
                </h6>
                <div>
                  <a href="" className="me-4 text-reset">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;

import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { db } from "../../../firebase";
import { storage } from "../../../firebase"; // Make sure to import Firebase properly
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Main() {
  const scrollWidth = window.innerWidth;
  const moviesCollectionRef = collection(db, "movies");
  const [movies, setmovies] = useState([]);

  // Bộ sưu tập movies
  useEffect(() => {
    // Fetch categories from Firebase Firestore and update the state
    const fetchData = async () => {
      const querySnapshot = await getDocs(moviesCollectionRef);
      const moviesData = [];
      querySnapshot.forEach((doc) => {
        moviesData.push({ id: doc.id, ...doc.data() });
      });
      setmovies(moviesData);
    };
    fetchData();
  }, []);
  // Next scroll
  const scrollNext = (carouselId) => {
    const scrollElement = document.getElementById(carouselId);
    if (scrollElement) {
      scrollElement.scrollBy({
        top: 0,
        left: scrollWidth,
        behavior: "smooth",
      });
    }
  };
  // Prev Scroll
  const scrollPrev = (carouselId) => {
    const scrollElement = document.getElementById(carouselId);
    if (scrollElement) {
      scrollElement.scrollBy({
        top: 0,
        left: -scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Body movies */}
      <div className="library-movies">
        <div className="ribbon-banner">
          <div
            id="carouselExampleCaptions"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://assets.glxplay.io/images/w1600/title/tro-tan-ruc-ro_web_spotlight_de22e0265da557ae2b643f623cfe8d9f.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                {/* Body carousel */}
                <div className="carousel-caption col-10 col-md-6 col-lg-4">
                  <h3 className="carousel__movies__title">Tro tàn rực rỡ</h3>
                  <div className="d-flex flex-wrap">
                    <button className="my__btn">
                      <i className="fa-solid fa-crown"></i>
                      <span className="ms-1">Đăng ký gói</span>
                    </button>
                    <button
                      className="my__btn"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#404446",
                        color: "white",
                        fontSize: "17px",
                      }}
                    >
                      <i className="fa-regular fa-flag"></i>{" "}
                    </button>
                  </div>

                  <p className="carousel__des d-none d-md-block">
                    Lấy bối cảnh xóm nghèo miền Tây sông nước, qua lời dẫn
                    chuyện của Hậu, đạo diễn phác họa bi kịch những người vợ bị
                    những người đàn ông họ chọn gắn bó gây nhiều tổn thương suốt
                    một đời.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://assets.glxplay.io/images/w1600/title/con-nhot-mot-chong_web_spotlight_37e6762ad94a2b1552d61e0867ed74f0.jpg"
                  className="d-block w-100 "
                  alt="..."
                />
                {/* Body carousel */}
                <div className="carousel-caption d-none d-md-block">
                  <h3 className="carousel__movies__title">
                    Con nhót mót chồng
                  </h3>

                  <button className="my__btn">
                    <i className="fa-regular fa-circle-play"></i>{" "}
                    <span>Thuê phim: 50.000</span>
                  </button>
                  <button className="my__btn btn-secondary">
                    <i className="fa-regular fa-flag"></i>{" "}
                    <span>Thêm vào danh sách</span>
                  </button>
                  <p className="carousel__des">
                    Nhót, người phụ nữ “chưa kịp già” đã sắp bị mãn kinh, vội
                    vàng đi tìm chồng. Nhưng sâu thẳm trong cô là khao khát có
                    một đứa con và luôn muốn hàn gắn với người cha suốt ngày say
                    xỉn của mình.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://assets.glxplay.io/images/w1600/title/happiness_web_spotlight_a233bc720b511a0261987ca9fe28046b.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                {/* Body carousel */}
                <div className="carousel-caption d-none d-md-block">
                  <h3 className="carousel__movies__title">HAPPYNESS</h3>

                  <button className="my__btn">
                    <i className="fa-regular fa-circle-play"></i>{" "}
                    <span>Thuê phim: 50.000</span>
                  </button>
                  <button className="my__btn btn-secondary">
                    <i className="fa-regular fa-flag"></i>{" "}
                    <span>Thêm vào danh sách</span>
                  </button>
                  <p className="carousel__des">
                    Thế giới trở nên hỗn loạn bởi căn bệnh truyền nhiễm đáng sợ.
                    Tại một tòa chung cư kỳ lạ, những cuộc chiến khốc liệt và
                    đầy tuyệt vọng giữa con người nhằm tranh giành sự sống liên
                    tục diễn ra.
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel__btn__np">
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className="ribbon-landscape">
          <div className="row p-0">
            <p className="container-fluilt mb-0 mt-3 text-white font-weight-bold ribon-landscape-title">
              Phim tâm lý tình cảm{" "}
            </p>
          </div>
          <button
            className="btn__scroll btn__scroll__next"
            onClick={() => scrollNext("carousel1")}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <button
            className="btn__scroll btn__scroll__prev"
            onClick={() => scrollPrev("carousel1")}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div
            className="scrolling-wrapper row flex-row flex-nowrap ps-5"
            id="carousel1"
          >
            {movies.map((element, index) => (
              <Link
                as={Link}
                to={`/detail/${element.nameCategory}/${element.id}`}
                className="col__scroll col-8 col-sm-5 col-md-4  col-lg-3 col-xl-2"
                // href={element.navLink}
              >
                <div className="card card-block">
                  <img src={element.imageUpload} alt="" />
                  <div className="card-block-hover">
                    <i className="fa-solid fa-film"></i>
                    <i className="fa-regular fa-circle-play play__movies"></i>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="card-block-des">
                    <p className="card-block-des-title">{element.nameMovie}</p>
                    <div className="card-block-des-more">
                      <p>{element.idCategory}</p>
                      <p>{element.durationMovie} phút</p>
                      <p>{element.episodeMovie} tập</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="ribbon-landscape">
          <div className="row p-0">
            <p className="container-fluilt mb-0 mt-3 text-white font-weight-bold ribon-landscape-title">
              Phim Mới Thịnh Hành Trên GalaxyPlay
            </p>
          </div>
          <button
            className="btn__scroll btn__scroll__next"
            onClick={() => scrollNext("carousel2")}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <button
            className="btn__scroll btn__scroll__prev"
            onClick={() => scrollPrev("carousel2")}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div
            className="scrolling-wrapper row flex-row flex-nowrap ps-5"
            id="carousel2"
          >
            {movies.map((element, index) => (
              <Link
                as={Link}
                to={`/detail/${element.nameCategory}/${element.id}`}
                className="col__scroll col-8 col-sm-5 col-md-4  col-lg-3 col-xl-2"
                // href={element.navLink}
              >
                <div className="card card-block">
                  <img src={element.imageUpload} alt="" />
                  <div className="card-block-hover">
                    <i className="fa-solid fa-film"></i>
                    <i className="fa-regular fa-circle-play play__movies"></i>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="card-block-des">
                    <p className="card-block-des-title">{element.nameMovie}</p>
                    <div className="card-block-des-more">
                      <p>{element.idCategory}</p>
                      <p>{element.durationMovie} phút</p>
                      <p>{element.episodeMovie} tập</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="ribbon-banner">
          <div className="row p-5" style={{ backgroundColor: "black" }}>
            <div
              className="p-0"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <img
                src="https://assets.glxplay.io/images/w1264/f7bdd0cc9b143ed389e62da3b9c286ac.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

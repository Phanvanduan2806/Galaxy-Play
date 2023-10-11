import React, { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { db, auth } from "../../../firebase";
import { storage } from "../../../firebase"; // Make sure to import Firebase properly
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import "./DetailFilm.scss";

function DetailFilm(props) {
  const { user } = props;
  const moviesCollectionRef = collection(db, "movies");
  const [movies, setmovies] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [categoryMovie, setCategoryMovie] = useState([]);
  const [movieDetail, setMovieDetail] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  console.log("User", currentUser);
  const scrollWidth = window.innerWidth;
  const { name, id } = useParams();

 // Lấy về user khi đăng nhập
useEffect(() => {
  const fetchData = async () => {
    if (user) {
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);

      // Lấy về user khi đăng nhập
      const currentUserDoc = usersData.find((element) => element.email === user.email);
      setCurrentUser(currentUserDoc);
    }
  };
  fetchData();
}, [user]);

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

  // Lấy bộ phim theo id
  useEffect(() => {
    const fetchMovieById = async () => {
      if (id) {
        const movieDocRef = doc(moviesCollectionRef, id);
        console.log(movieDocRef);
        const movieDocSnapshot = await getDoc(movieDocRef);
        if (movieDocSnapshot.exists()) {
          setMovieDetail({
            id: movieDocSnapshot.id,
            ...movieDocSnapshot.data(),
          });
          const moviesCategory = movies.filter(
            (element) => element.nameCategory == movies.nameCategory
          );
          setCategoryMovie(moviesCategory);
        } else {
          setMovieDetail(null); // Trường hợp không tìm thấy bộ phim
        }
      } else {
        setMovieDetail(null); // Trường hợp id không tồn tại
      }
    };
    fetchMovieById();
  }, [id]);

  // Lấy danh sách phim theo `namCategory`
  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      if (name) {
        const moviesQuery = query(
          moviesCollectionRef,
          where("nameCategory", "==", name)
        );

        const querySnapshot = await getDocs(moviesQuery);
        const moviesData = [];

        querySnapshot.forEach((doc) => {
          moviesData.push({ id: doc.id, ...doc.data() });
        });

        setCategoryMovie(moviesData);
      } else {
        setCategoryMovie([]); // Trường hợp `namCategory` không tồn tại
      }
    };
    fetchMoviesByCategory();
  }, [name]);

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
      <div className="detail-movie-page">
        <div className="background">
          <div className="dynamic-tabs-detail">
            <ul className="nav-detail">
              <li className="nav__item text-white">Tổng quan</li>
              <li className="nav__item">Trailer</li>
              <li className="nav__item">Chi tiết</li>
            </ul>
          </div>
          <div className="carousel-caption col-10 col-md-6 col-lg-4">
            <h3 className="carousel__movies__title">{movieDetail.nameMovie}</h3>
            <div className="list-detail d-flex">
              <div className="list-item date-public">
                {movieDetail.releaseMovie}
              </div>
              <div className="list-item content-rating">
                T{movieDetail.episodeMovie}
              </div>
              <div className="list-item duration">
                {movieDetail.durationMovie} phút
              </div>
              <div className="list-item resolution">HD</div>
              <div className="list-item">
                <i className="fa-solid fa-heart"></i> <span>400</span>
              </div>
            </div>
            <p className="carousel__des d-none d-md-block">
              {movieDetail.describeMovie}
            </p>
            <div className="list-type d-flex">
              <p>Thể loại: </p>
              <p style={{ color: "gray", marginLeft: "1rem" }}>
                {movieDetail.nameCategory}
              </p>
            </div>
            <div className="d-flex">
              <button className="my__btn">
                {currentUser &&
                currentUser.vip &&
                currentUser.vip >= movieDetail.vipMovie ? (
                  <>
                    <i className="fa-solid fa-play"></i>
                    <Link to={`/play/${movieDetail.nameCategory}/${movieDetail.id}`} className="text-decoration-none">
                      <span className="ms-1 text-black">Xem Phim</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-crown"></i>
                    <Link to="/vip" className="text-decoration-none">
                      <span className="ms-1 text-black">Đăng ký gói</span>
                    </Link>
                  </>
                )}
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
                <i className="fa-solid fa-heart"></i>{" "}
              </button>
            </div>
          </div>
          <div className="background__left"></div>
          <div className="background__right">
            <img className="img-thump-gray" src={movieDetail.imageUpload} />
          </div>
        </div>
      </div>
      <div className="ribbon-landscape">
        <div className="row p-0">
          <p className="container-fluilt mb-0 mt-3 text-white font-weight-bold ribon-landscape-title">
            Phim liên quan{" "}
          </p>
        </div>
        <button
          className="btn__scroll btn__scroll__next"
          onClick={() => scrollNext("carousel__detail")}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button
          className="btn__scroll btn__scroll__prev"
          onClick={() => scrollPrev("carousel__detail")}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div
          className="scrolling-wrapper row flex-row flex-nowrap ps-5"
          id="carousel__detail"
        >
          {categoryMovie.map((element, index) => (
            <Link
              key={index}
              as={Link}
              to={`/detail/${element.nameCategory}/${element.id}`}
              className="col__scroll col-8 col-sm-5 col-md-4  col-lg-3 col-xl-2"
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
                    <p>{element.nameCategory}</p>
                    <p>{element.durationMovie} phút</p>
                    <p>{element.episodeMovie} tập</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailFilm;

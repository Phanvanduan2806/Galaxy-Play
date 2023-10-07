import React, { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
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
import "./PlayFilm.scss";

function PlayFilm(props) {
  const moviesCollectionRef = collection(db, "movies");
  const [movies, setmovies] = useState([]);
  const [categoryMovie, setCategoryMovie] = useState([]);
  const [movieDetail, setMovieDetail] = useState({});
  const [xemPhim, setXemPhim] = useState(false);

  const scrollWidth = window.innerWidth;
  const { name, id } = useParams();

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
  console.log(categoryMovie);
  const scrollNext = () => {
    console.log("nhận");
    document.getElementById("scroll").scrollBy({
      top: 0,
      left: scrollWidth,
      behavior: "smooth",
    });
  };
  // Prev Scroll
  const scrollPrev = () => {
    console.log("nhận");
    document.getElementById("scroll").scrollBy({
      top: 0,
      left: -scrollWidth,
      behavior: "smooth",
    });
  };
  // Xem phim
  const handlePlay = () => {
    setXemPhim(true);
  };
  return (
    <>
      <div className="detail-movie-page">
        <div className="background">
          <iframe
            width="100%"
            height="100%"
            src={element.linkMovie}
            title=""
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className={xemPhim ? "d-block" : "d-none"}
          ></iframe>
        </div>
      </div>
      <div className="ribbon-landscape">
        <div className="row p-0">
          <p className="container-fluilt mb-0 mt-3 text-white font-weight-bold ribon-landscape-title">
            Phim liên quan{" "}
          </p>
        </div>
        <button className="btn__scroll btn__scroll__next" onClick={scrollNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button className="btn__scroll btn__scroll__prev" onClick={scrollPrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div
          className="scrolling-wrapper row flex-row flex-nowrap ps-5"
          id="scroll"
        >
          {categoryMovie.map((element, index) => (
            <Link
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

export default PlayFilm;

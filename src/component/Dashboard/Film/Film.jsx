import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Film.scss";
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
function Film(props) {
  const categoriesCollectionRef = collection(db, "categories");
  const moviesCollectionRef = collection(db, "movies");
  const [movies, setmovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [nameMovie, setNameMovie] = useState("");
  const [episodeMovie, setEpisodeMovie] = useState(null);
  const [durationMovie, setDurationMovie] = useState(null);
  const [linkMovie, setLinkMovie] = useState("");
  const [releaseMovie, setReleaseMovie] = useState(null);
  const [describeMovie, setDescribeMovie] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [vipMovie, setVipMovie] = useState(null);
  const [checkUpload, setCheckUpload] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [errors, setErrors] = useState({});
  // const [checkUpload, setCheckUpload] = useState(false);

  // Bộ sưu tập categories
  useEffect(() => {
    // Fetch categories from Firebase Firestore and update the state
    const fetchData = async () => {
      const querySnapshot = await getDocs(categoriesCollectionRef);
      const categoriesData = [];
      querySnapshot.forEach((doc) => {
        categoriesData.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

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
  }, [checkUpload]);

  
  //   input change image preview
  const hanleImageChange = (e) => {
    const selectImage = e.target.files[0];
    if (selectImage) {
      setImageUpload(selectImage);
      const imageUrl = URL.createObjectURL(selectImage);
      setImagePreview(imageUrl);
    }
  };

  // addMovie
  const addMovie = async (e) => {
    console.log("vao day");
    e.preventDefault();
    try {
      const imageRef = ref(storage, `images/${uuidv4()}_${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);
      alert("Image uploaded successfully. URL: " + downloadURL);
      // Add a new document to the "categories" collection
      await addDoc(moviesCollectionRef, {
        nameCategory: nameCategory,
        nameMovie: nameMovie,
        episodeMovie: episodeMovie,
        durationMovie: durationMovie,
        linkMovie: linkMovie,
        releaseMovie: releaseMovie,
        describeMovie: describeMovie,
        imageUpload: downloadURL,
        vipMovie: vipMovie,
      });
      setCheckUpload(!checkUpload);
      setNameMovie("");
      setReleaseMovie(null);
      setDescribeMovie("");
      setEpisodeMovie(null);
      setDurationMovie(null);
      setLinkMovie("");
      setImageUpload(null);
      setImagePreview(null);
      setVipMovie(null);
      setNameCategory("");
      setCheckUpload(!checkUpload);
    } catch (error) {}
  };
  // Delete movie
  const deleteMovie = async (movieId) => {
    try {
      // Delete a document from the "categories" collection
      const movieDocRef = doc(db, "movies", movieId);
      await deleteDoc(movieDocRef);
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };
  // Edit User
  const editMovie = (
    id,
    nameMovie,
    nameCategory,
    describeMovie,
    vipMovie,
    episodeMovie,
    durationMovie,
    linkMovie,
    releaseMovie,
    imageUpload
  ) => {
    setMovieId(id);
    setNameMovie(nameMovie);
    setDescribeMovie(describeMovie);
    setNameCategory(nameCategory);
    setVipMovie(vipMovie);
    setEpisodeMovie(episodeMovie);
    setErrors({});
    setImageUpload(imageUpload);
    setDurationMovie(durationMovie);
    setLinkMovie(linkMovie);
    setReleaseMovie(releaseMovie);
  };
  // Update Movie
  const updateMovie = async (e) => {
    e.preventDefault();
    const newErrors = {};

    try {
      const imageRef = ref(storage, `images/${uuidv4()}_${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);

      if (!movieId) {
        newErrors.movieIdId = "Vui lòng chọn phim cần cập nhật";
      }
      if (!nameMovie) {
        newErrors.nameMovie = "Vui lòng nhập tên phim";
      }
      if (!vipMovie) {
        newErrors.vipMovie = "Vui lòng chọn gói";
      }
      if (!describeMovie) {
        newErrors.describeMovie = "Vui lòng nhập thông tin";
      }
      if (!episodeMovie) {
        newErrors.episodeMovie = "Vui lòng nhập thông tin";
      }
      if (!durationMovie) {
        newErrors.durationMovie = "Vui lòng nhập thông tin";
      }
      if (!linkMovie) {
        newErrors.linkMovie = "Vui lòng nhập thông tin";
      }
      if (!releaseMovie) {
        newErrors.releaseMovie = "Vui lòng nhập thông tin";
      }
      if (Object.keys(newErrors).length === 0) {
        // Nếu không có lỗi, thực hiện cập nhật thông tin phim
        await updateDoc(doc(moviesCollectionRef, movieId), {
          nameCategory: nameCategory,
          nameMovie: nameMovie,
          describeMovie: describeMovie,
          vipMovie: vipMovie,
          durationMovie: durationMovie,
          episodeMovie: episodeMovie,
          linkMovie: linkMovie,
          releaseMovie: releaseMovie,
          imageUpload: downloadURL, // Thêm imageUpload vào đối tượng cập nhật
        });

        // Cập nhật trạng thái và làm sạch các trường dữ liệu
        setMovieId("");
        setNameCategory("");
        setNameMovie("");
        setReleaseMovie(null);
        setDescribeMovie("");
        setEpisodeMovie(null);
        setDurationMovie(null);
        setLinkMovie("");
        setImageUpload(null);
        setImagePreview(null);
        setVipMovie("");
        setCheckUpload(!checkUpload);
        alert("Cập nhật thành công");
      } else {
        setErrors(newErrors);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi cập nhật phim:", error);
    }
  };

  return (
    <>
      <h2>Movie Categories</h2>
      <div className="row">
        <div className="col col-md-6">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add__movie"
          >
            Add movie
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <form className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search movie"
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
            <th scope="col">Previews</th>
            <th scope="col">Movies name</th>
            <th scope="col">Category</th>
            <th scope="col">Year of release</th>
            <th scope="col">Movie content</th>
            <th scope="col">VIP</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((element, index) => (
            <tr key={element.id}>
              <th scope="row">{index + 1}</th>
              <td className="td__movie__preview">
                <img src={element.imageUpload} alt="" />
              </td>
              <td>{element.nameMovie}</td>
              <td>{element.nameCategory}</td>
              <td>2022</td>
              <td className="td__movie__content">{element.describeMovie}</td>
              <td>Vip {element.vipMovie}</td>
              <td className="td__action">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    editMovie(
                      element.id,
                      element.nameMovie,
                      element.nameCategory,
                      element.describeMovie,
                      element.vipMovie,
                      element.episodeMovie,
                      element.durationMovie,
                      element.linkMovie,
                      element.releaseMovie,
                      element.imageUpload
                    )
                  }
                  data-bs-toggle="modal"
                  data-bs-target="#update__movie"
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => deleteMovie(element.id)}
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
        id="add__movie"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onSubmit={addMovie}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add movie
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Body modal */}
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">Tên phim</label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      value={nameMovie}
                      placeholder="Nhập tên phim"
                      onChange={(e) => setNameMovie(e.target.value)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Số tập</label>
                        <input
                          type="number"
                          min={0}
                          className="form-control"
                          id=""
                          value={episodeMovie}
                          placeholder="Số tập phim"
                          onChange={(e) => setEpisodeMovie(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Thời lượng</label>
                        <input
                          className="form-control"
                          type="number"
                          min={0}
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={durationMovie}
                          placeholder="Thời lượng (phút)"
                          onChange={(e) => setDurationMovie(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Link phim</label>
                    <textarea
                      className="form-control"
                      style={{ overflowY: "scroll" }}
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={linkMovie}
                      placeholder="Link phim"
                      onChange={(e) => setLinkMovie(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Thể loại</label>
                    <select
                      className="form-control"
                      onChange={(e) => setNameCategory(e.target.value)}
                    >
                      {categories.map((element, index) => (
                        <option key={element.id} value={element.nameCategory}>
                          {element.nameCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Năm phát hành</label>
                        <input
                          type="number"
                          className="form-control"
                          id=""
                          aria-describedby="emailHelp"
                          placeholder="Năm phát hành"
                          value={releaseMovie}
                          onChange={(e) => setReleaseMovie(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Gói xem phim</label>
                        <select
                          className="form-control"
                          onChange={(e) => setVipMovie(e.target.value)}
                        >
                          <option value="1">Vip 1</option>
                          <option value="2">Vip 2</option>
                          <option value="3">Vip 3</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mô tả</label>
                    <textarea
                      className="form-control"
                      style={{ overflowY: "scroll" }}
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={describeMovie}
                      onChange={(e) => setDescribeMovie(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col col-md-4">
                  <div className="form-group">
                    <label>Images previews</label>
                    <div className="choose__image__preview">
                      <img
                        src={
                          imagePreview
                            ? imagePreview
                            : "https://upload.wikimedia.org/wikipedia/vi/thumb/d/d8/Bi%E1%BB%83u_tr%C6%B0ng_Galaxy_Play.svg/1200px-Bi%E1%BB%83u_tr%C6%B0ng_Galaxy_Play.svg.png"
                        }
                        alt=""
                      />
                    </div>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={hanleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Modal update */}

      <form
        className="modal fade"
        id="update__movie"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onSubmit={updateMovie}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Movie
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">Tên phim</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nameMovie}
                      placeholder="Nhập tên phim"
                      onChange={(e) => setNameMovie(e.target.value)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Số tập</label>
                        <input
                          type="number"
                          min={0}
                          className="form-control"
                          value={episodeMovie}
                          placeholder="Số tập phim"
                          onChange={(e) => setEpisodeMovie(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Thời lượng</label>
                        <input
                          className="form-control"
                          type="number"
                          min={0}
                          rows="3"
                          value={durationMovie}
                          placeholder="Thời lượng (phút)"
                          onChange={(e) => setDurationMovie(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Link phim</label>
                    <textarea
                      className="form-control"
                      style={{ overflowY: "scroll" }}
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={linkMovie}
                      placeholder="Link phim"
                      onChange={(e) => setLinkMovie(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Thể loại</label>
                    <select
                      className="form-control"
                      onChange={(e) => setNameCategory(e.target.value)}
                      value={nameCategory}
                    >
                      {categories.map((element, index) => (
                        <option value={element.nameCategory}>
                          {element.nameCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Năm phát hành</label>
                        <input
                          type="number"
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Năm phát hành"
                          value={releaseMovie}
                          onChange={(e) => setReleaseMovie(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Gói xem phim</label>
                        <select
                          className="form-control"
                          onChange={(e) => setVipMovie(e.target.value)}
                          value={vipMovie}
                        >
                          <option value="1">Vip 1</option>
                          <option value="2">Vip 2</option>
                          <option value="3">Vip 3</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mô tả</label>
                    <textarea
                      className="form-control"
                      style={{ overflowY: "scroll" }}
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={describeMovie}
                      onChange={(e) => setDescribeMovie(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col col-md-4">
                  <div className="form-group">
                    <label>Images previews</label>
                    <div className="choose__image__preview">
                      {imageUpload ? (
                        <img src={imageUpload} alt="" />
                      ) : (
                        <img
                          src={
                            imagePreview
                              ? imagePreview
                              : "https://upload.wikimedia.org/wikipedia/vi/thumb/d/d8/Bi%E1%BB%83u_tr%C6%B0ng_Galaxy_Play.svg/1200px-Bi%E1%BB%83u_tr%C6%B0ng_Galaxy_Play.svg.png"
                          }
                          alt=""
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={hanleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Film;

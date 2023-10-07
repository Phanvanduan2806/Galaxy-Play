import React, { useEffect, useState } from "react";
import "./Categories.scss";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Categories(props) {
  const categoriesCollectionRef = collection(db, "categories");
  const [categories, setCategories] = useState();
  const [nameCategory, setNameCategory] = useState("");
  const [taskEdit, setTaskEdit] = useState("");
  const [edit, setEdit] = useState(null);
  const [errors, setErrors] = useState("");
  const [checkUpload, setCheckUpload] = useState(false);

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
  }, [checkUpload]);
  // End fetchData ---------------------------------------------

  // Add
  const addCategory = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if(!nameCategory) {
          setErrors("Vui long nhap nam category");
          return;
    }
    try {
      // Add a new document to the "categories" collection
      await addDoc(categoriesCollectionRef, {
        nameCategory: nameCategory,
      });
      // Clear the input field after adding the category
      setNameCategory("");
      setCheckUpload(!checkUpload);
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };
  // Delete
  const deleteCategory = async (categoryId) => {
    try {
      // Delete a document from the "categories" collection
      const categoryDocRef = doc(db, "categories", categoryId);
      await deleteDoc(categoryDocRef);
      // Remove the deleted category from the state
      // setCategories((prevCategories) =>
      //   prevCategories.filter((category) => category.id !== categoryId)
      // );
      setCheckUpload(!checkUpload);
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };
  // Edit
  const editCategory = (id, nameCategory) => {
    setEdit(id);
    setTaskEdit(nameCategory);
  };
  // Biến function update task
  const updateTask = async (id) => {
  
    if (taskEdit) {
      try {
        // Cập nhật tên danh mục mới cho danh mục phim
        const categoryDocRef = doc(db, "categories", id);
        await updateDoc(categoryDocRef, {
          nameCategory: taskEdit,
        });
   } catch (error) {
     
   }
      
      setEdit(null);
      setCheckUpload(!checkUpload);
    } else {
      alert("Công việc không được bỏ trống");
    }
  };

  console.log("check cte",categories);

  return (
    <>
      <h2>Categories</h2>
      <div className="row">
        <div className="col col-md-6">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add__categories"
          >
            Add category
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <form className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search categories"
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
            <th scope="col">Category name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          { categories && categories.map((element, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                {/* {element.nameCategory} */}
                {edit === element.id ? (
                  <td>
                    <input
                      type="text"
                      value={taskEdit}
                      onChange={(e) => setTaskEdit(e.target.value)}
                      className="input__taskEdit"
                    ></input>
                  </td>
                ) : (
                  <td>{element.nameCategory}</td>
                )}
              </td>
              <td className="td__action">
                {edit === element.id ? (
                  <button
                    className="btn btn-success"
                    data-mdb-toggle="tooltip"
                    title="Edit todo"
                    onClick={() => updateTask(element.id, element.nameCategory)}
                  >
                    Update
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        editCategory(element.id, element.nameCategory)
                      }
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => deleteCategory(element.id)}
                    >
                      Xoá
                    </button>
                  </>
                )}
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
        onSubmit={addCategory}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className={`form-control ${errors ? 'is-invalid' : ''}`}
                placeholder="Name category"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={nameCategory}
                name="add-category"
                onChange={(e) => setNameCategory(e.target.value)}              
              />
              {errors && (
                            <div className='invalid-feedback'>{errors}</div>
                        )}
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
                Add category
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Categories;

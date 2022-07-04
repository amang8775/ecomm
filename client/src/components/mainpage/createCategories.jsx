import React from "react";
import axios from "axios";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./createCategories.css";
import { useContext } from "react";
const CreateCategory = () => {
  const state = useContext(AuthContext);
  const [token] = state.token;
  const [categories] = state.categoryApi.categories;
  const [callback, setCallback] = state.categoryApi.callback;
  const cate = useRef();

  const handleDeleteCategory = async(id,name)=>{
      try {
        const body = {
          id , name 
        }
        const res = await axios.delete("/api/category/",{body},{ headers: { Authorization: token } });
        alert(res.data.msg)
        setCallback(!callback)
      } catch (error) {
        alert(error.response.data)
      }
  }
  const handleCategoryUpload = async () => {
    const val = cate.current.value;
    try {
      const res = await axios.post(
        "/api/category/",
        { name: val },
        { headers: { Authorization: token } }
      );
      alert(res.data.msg);
      setCallback(!callback);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="categoryContainer">
      <div className="createCategory">
        <p className="categoryHead">Category</p>
        <input
          type="text"
          className="categoryInput"
          ref={cate}
          required={true}
        />
        <button className="categoryBtn" onClick={handleCategoryUpload}>
          Save
        </button>
      </div>
      <div className="rendercategory">
        <ul className="category-list">
          {categories.map((c) => {
           return(
            <li className="category-item" key = {c._id}>
            {c.name}
            <span>
              <button className="categoryBtn">edit</button>
              <button className="categoryBtn" onClick={()=>{handleDeleteCategory(c._id,c.name)}}>delete</button>
            </span>
          </li>
           )
          })}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategory;

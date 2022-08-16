import React, { useState, useEffect, useRef } from "react";
import "./createProduct.css";
import { BsCameraFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Initial_Product = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
  content:
    "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
  category: "",
  _id: "",
};
const CreateProduct = () => {
  const history = useHistory();

  const state = useContext(AuthContext);

  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productApi.callback;

  const [images, setImages] = useState(false);
  const [product, setProduct] = useState(Initial_Product);

  const [categories] = state.categoryApi.categories;

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("you are not admin");
      const file = e.target.files[0];

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload", formData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      setImages(res.data);
    } catch (error) {
      alert(error.response.data);
    }
  };
  const handleDestroy = async () => {
    try {
      const res = await axios.post(
        "/api/upload/destroy",
        { public_id: images.public_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) setImages(false);
    } catch (error) {
      alert(error.response.data);
    }
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!images) return alert("No Image Upload");
      const tempProduct = { ...product, images };
      await axios.post("/api/product/", tempProduct, {
        headers: { Authorization: token },
      });

      history.push("/");
      setCallback(!callback);
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <div>
      <form className="Product-form" onSubmit={handleFormSubmit}>
        <div className="form-image">
          <label>
            <BsCameraFill />
            <input
              onChange={handleUpload}
              type="file"
              className="form-image-upload"
              style={{ display: "none" }}
            />
          </label>
          <img
            style={{ display: images ? "block" : "none" }}
            src={images ? images.url : ""}
            className="img-preview-wrapper"
            alt=""
          />
          <span onClick={handleDestroy} className="imageDelete">
            X
          </span>
        </div>
        <div className="form-input">
          <input
            className="form-input-field"
            type="text"
            name="product_id"
            value={product.product_id}
            required
            placeholder="Product_id"
            onChange={handleInputChange}
          />
          <input
            className="form-input-field"
            type="text"
            required
            placeholder="Title"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            maxLength="20"
          />
          <input
            className="form-input-field"
            type="number"
            required
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
          <textarea
            className="form-input-field"
            type="text"
            required
            placeholder="Description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            maxLength = "100"
          />
          <textarea
            className="form-input-field"
            type="text"
            required
            placeholder="Content"
            name="content"
            value={product.content}
            onChange={handleInputChange}
          />
          <select
            className="form-input-field form-category-select"
            name="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value = {''}>Select Category</option>
            {categories.map((category) => (
              <option value={category.name} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;

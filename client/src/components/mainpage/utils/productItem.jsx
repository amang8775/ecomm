import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./productItem.css";
import { AuthContext } from "../../../context/AuthContext";
const ProductItem = ({product, isAdmin, deleteProduct, handleCheck}) => {
  const history = useHistory();
  const handleViewClick = () => {
    history.push(`/detailProduct/${product._id}`);
  };
  const state = useContext(AuthContext);
  const addCart = state.userApi.addCart;
  return (
    <div className="product-card">
      {
                isAdmin && <input type="checkbox" className="product-checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
      }
      <img className="product-img" src={product.images.url} alt="" />
      <div className="product-box">
        <p className="product-head">
          {product.title} 
        </p>
        <p className="product-price">Rs {product.price}</p>
        <p className="product-text">{product.description}</p>
        {!isAdmin?<button className="product-button" onClick={() => addCart(product)}>
          buy now
        </button>:<button className="product-button" onClick={()=>deleteProduct(product._id,product.images.public_id)}>
          Delete
        </button>}
        <button
          className="product-button"
          style={{ backgroundColor: "#555" }}
          onClick={handleViewClick}
        >
          view
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

import axios from "axios";
import React from "react";
import { useContext } from "react";

import { AuthContext } from "../../../context/AuthContext";
import "./cartItem.css";
const DetailProductItem = ({ product }) => {
  const state = useContext(AuthContext);
  const [token] = state.token;
 
  return (
    <div className="cart-item">
      <div className="cart-img">
        <img className="item-image" src={product.images.url} alt="" />
      </div>
      <div className="cart-desc">
        <h2 className="item-head">{product.title}</h2>
        <h2 className="item-price">Rs {product.price}</h2>
        <p className="item-desc">Description <br/>{product.description}</p>
        <p className="item-desc">Content <br/>{product.content}</p>
        
      </div>
    </div>
  );
};

export default DetailProductItem;

import axios from "axios";
import React from "react";
import { useContext } from "react";

import { AuthContext } from "../../../context/AuthContext";
import "./cartItem.css";
const CartItem = ({ product }) => {
  const state = useContext(AuthContext);
  const [token] = state.token;
  const [cart, setCart] = state.userApi.cart;
  const addToCart = async (cart) => {
    try {
       await axios.patch('/user/addcart',{cart},{headers:{Authorization:token}});
    } catch (error) {
      alert(error.response.data)
    }
  };

  const increment = (id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === id) {
        cart[i].quantity += 1;
        break ; 
      }
    }

    setCart([...cart])
    addToCart(cart)
  };
  const decrement = (id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === id) {
        if(cart[i].quantity === 1) break ; 
        cart[i].quantity -= 1;
        break ; 
      }
    }

    setCart([...cart])
    addToCart(cart)
  };
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
        <div className="cart-btn">
          <button className="btn-minus" onClick={()=>decrement(product._id)}>-</button>
          <span className="item-num">{product.quantity}</span>
          <button className="btn-plus" onClick={()=>increment(product._id)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

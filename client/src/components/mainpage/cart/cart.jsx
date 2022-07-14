import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import CartItem from "../utils/cartItem";
import "./cart.css";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const state = useContext(AuthContext);
  const [token] = state.token
  const [cart, setCart] = state.userApi.cart;
  const [addCart] = state.userApi.cart;
  const history = useHistory();
  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price * cart[i].quantity;
    }

    setTotal(sum);
  }, [cart]);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_N2rRCHtZFvswPE",
      amount: total,
      currency: data.currency,
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await axios.post("/api/payment/verify", response);
          tranSuccess(data.id);
          setCart([]);
          addToCart(cart);
          history.push("/");
          alert("Payment Successful")
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const tranSuccess = async(id) => {
    console.log(id);
    try{await axios.post('/api/payment/createPayment', {cart,paymentID : id}, {
        headers: {Authorization: token}
    })

    setCart([])
    addToCart([])
    alert("You have successfully placed an order.")}
    catch (error) {
      console.log(error);
    }
}
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/payment/orders", {
        amount: total,
      });
      console.log(data);
      initPayment(data.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );
  return (
    <div className="cart-container">
      {cart.map((c) => {
        return <CartItem product={c} key={c._id} />;
      })}
      <div className="totalPrice">Total Price {total}</div>

      <button onClick={handlePayment} className="payment-button">
        Buy Now
      </button>
    </div>
  );
}

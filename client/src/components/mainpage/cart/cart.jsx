import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import CartItem from "../utils/cartItem";


export default function Cart() {
  const [total, setTotal] = useState(0);
  const state = useContext(AuthContext);
  const [cart,setCart] = state.userApi.cart;
  const history = useHistory();
  const [email] = state.userApi.email;
  const [name] = state.userApi.name;

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
       
          const { data } = await axios.post('/api/payment/verify', response);
          if(data.message === "Payment verified successfully"){
            alert("Order Placed , Payment Successful");
            setCart([]);
            history.push('/');
           }
          console.log(data);
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

  const handlePayment = async () => {
    try {
    
      const { data } = await axios.post('/api/payment/orders', { amount: total });
      console.log(data);
       initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      {cart.map((c) => {
        return <CartItem product={c} key={c._id} />;
      })}
      <div className="totalPrice">Total Price {total}</div>

      <button
        onClick={handlePayment}
      ></button>


    </div>
  );
}

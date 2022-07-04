import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

import { useRef } from "react";
import axios from "axios";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const handleLoginClick = async(e) => {
    e.preventDefault();
    try {
       await axios.post('/user/login',{email : email.current.value , password : password.current.value});

       localStorage.setItem('firstLogin',true);
       window.location.href = '/';

      
      
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  return (
    <div className="login-a">
      <div className="login-container">
        <h1 className="login-head">login</h1>
        <input
          className="login-inp"
          type="email"
          placeholder="Email"
          ref={email}
          required
        />
        <input
          className=" login-inp"
          type="Password"
          placeholder="Password"
          ref={password}
          required
        />
        <button className="submit-btn" onClick={handleLoginClick}>
          submit
        </button>
        <div className="btn">
          <button className="btn-a">
            <Link to="/login" >login</Link>
          </button>
          <button className="btn-b">
            <Link to="/register">register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import "./header.css";
import { Link, useHistory } from "react-router-dom";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CategoryApi from "../../apiCall/CategoryApi";

export default function Header() {
  const history = useHistory();
  const state = useContext(AuthContext);
  const [isLogged] = state.userApi.isLogged;

  const [isAdmin] = state.userApi.isAdmin;
  const [cart] = state.userApi.cart
  const openMenu = () => {
    let x = document.getElementById("list-x");
    if (x.className === "list mobile-list") {
      x.className = "list";
    } else {
      x.className = "list mobile-list";
    }
  };
  const handleHeaderClick = async () => {
    if (isLogged) {
      try {
        await axios.get("/user/logout");
        localStorage.removeItem("firstLogin");

        window.location.href = "/";
      } catch (error) {
        alert(error.response.data);
      }
    } else {
      history.push("/login");
    }
  };
  return (
    <header className="container">
      <div className="menu">
        <FaBars id="bars" className="menu-bar" onClick={openMenu} />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">ENCYLO-KART</Link>
        </h1>
      </div>

      <ul id="list-x" className="list">
        <li>
          <Link className="mobile-list-target" to="/">
            shop
          </Link>
        </li>
        {isAdmin && (
          <Link className="mobile-list-target" to="/createProduct">
            Add Products
          </Link>
        )}
        {isAdmin && (
          <Link className="mobile-list-target" to="/createCategory">
            Add Category
          </Link>
        )}
        <li>
          <Link
            to="/login"
            className="mobile-list-target"
            onClick={handleHeaderClick}
          >
            {isLogged ? "Logout" : "Login"}{" "}
          </Link>
        </li>
      </ul>
      <div className="cart-icon">
        <span>{cart?cart.length : 0}</span>
        <Link to="/cart">
          <FaCartPlus></FaCartPlus>
        </Link>
      </div>
    </header>
  );
}

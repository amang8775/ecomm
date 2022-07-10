import axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Filter from "../utils/filter";
import ProductItem from "../utils/productItem";
import "./Products.css";
import Loading from "../loading";

export default function Products() {
  const state = useContext(AuthContext);
  const [token] = state.token;
  const [products, setProducts] = state.productApi.products;
  const [callback, setCallback] = state.productApi.products;
  const [isAdmin] = state.userApi.isAdmin;

  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };
  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/upload/destroy",
        { public_id },
        { headers: { Authorization: token } }
      );
      await axios.delete(`/api/product/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
      setLoading(false);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });

    window.location.href = "/";
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <Filter />
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}

      <div className="product-container">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product._id}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      
      <button className="load"> Load More</button>
      
      
    </div>
  );
}

import React from "react";
import "./detailProduct.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import DetailProductItem from "../utils/detailProductItem";
import ProductItem from "../utils/productItem";
const DetailProduct = () => {
  const params = useParams();
  const state = useContext(AuthContext);
  const [products] = state.productApi.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const [relatedProduct, setRelatedproduct] = useState([]);
  const [isAdmin] = state.userApi.isAdmin;

  const getRelatedProduct = async (product) => {
    const c = product.category;
    const rp = products.map((p) => {
      if (c === p.category) {
        setRelatedproduct([...relatedProduct, p]);
      }
    });
    return rp;
  };
  useEffect(() => {
    products.forEach((product) => {
      if (product._id === params.id) {
        setDetailProduct(product);
        getRelatedProduct(product);
      }
    });
  }, [params.id, products]);
  if (detailProduct.length === 0) return null;

  return (
    <div>
      <div className="detail-item">
        <DetailProductItem product={detailProduct} key={detailProduct._id} />
      </div>
      <div className="relatedProduct">
        <h3>Related Products</h3>
        {relatedProduct.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product._id}
              isAdmin={isAdmin}
             
            />
          );
        })}
      </div>
    </div>
  );
};

export default DetailProduct;

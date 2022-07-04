import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ProductApi = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get( `/api/product?limit=${ page * 9}&${category}&${sort}&title[regex]=${search}`
        );
        setProducts(res.data);
        
      } catch (error) {
        alert(error.response.data);
      }
    };
    getProducts();
  }, [callback,search, category, sort, page]);

  return {
    products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
  };
};

export default ProductApi;

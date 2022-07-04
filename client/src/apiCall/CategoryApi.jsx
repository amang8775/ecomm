import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const CategoryApi = () => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("/api/category/");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  }, [callback]);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
};

export default CategoryApi;

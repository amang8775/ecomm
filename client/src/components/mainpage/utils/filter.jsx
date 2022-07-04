import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./filter.css";
const Filter = () => {
  const state = useContext(AuthContext);
 
  const [categories] = state.categoryApi.categories;
  

  const [category, setCategory] = state.productApi.category;
  const [sort, setSort] = state.productApi.sort;
  const [search,setSearch] = state.productApi.search;

  return (
    <div className="filter-container">
      <ul className="filter-list">
        <li className="list-a">
          <span style={{ padding: "0px 10px" }}>FILTER:</span>
          <select
            className="filter-btn"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value=' ' >
              All Product
            </option>
           { categories.map(category => (
            <option value={"category=" + category.name} key={category._id}>
              {category.name}
            </option>
            ))}
          </select>
        </li>
        <li className="list-b">
          <input
            type="text"
            className="searchBar"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
        </li>
        <li className="list-c">
          <span style={{ padding: "0px 10px" }}>SORTBY:</span>
          <select
            className="filter-btn"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="">Newest</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=-sold">Best sales</option>
            <option value="sort=-price">Price: Hight-Low</option>
            <option value="sort=price">Price: Low-Hight</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default Filter;

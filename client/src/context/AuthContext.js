import axios from "axios";
import { createContext, useEffect, useState } from "react";
import UserApi from "../apiCall/UserApi";
import CategoryApi from "../apiCall/CategoryApi";
import ProductApi from "../apiCall/productApi";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refreshtoken");
        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);
  const state = {
    token: [token, setToken],
    userApi: UserApi(token),
    categoryApi: CategoryApi(),
    productApi: ProductApi(),
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

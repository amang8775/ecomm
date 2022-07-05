import axios from "axios";
import { useEffect, useState } from "react";
const UserApi = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          setEmail(res.data.email);
          setName(res.data.name);
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
        } catch (error) {
          alert(error.response.data);
        }
      }
    };
    getUser();
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("This product has been added to cart.");
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    email: [email],
    name: [name],
    addCart: addCart,
  };
};

export default UserApi;

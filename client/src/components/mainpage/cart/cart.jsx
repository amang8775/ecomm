import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'

import CartItem from '../utils/cartItem'


export default function Cart() {
  
  const[total,setTotal] = useState(0);
  const state = useContext(AuthContext)
  const [cart] = state.userApi.cart
  const [email] = state.userApi.email
  const [name] = state.userApi.name
  
  useEffect(()=>{
    let sum = 0 ; 
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price*cart[i].quantity ;
    }

    setTotal(sum);
  },[cart])
  
  const handlePayment = async(total)=>{
    try {
    const res =   await axios.post("/api/payment/paynow",{ 
        amount:total.toString(),
        name,
        email,
        "phone": "9821055090"
  })

  console.log(res);
      
    } catch (error) {
      alert(error.response.data)
    }
  }
  return (
      <div className="cart-container">
        {cart.map(c=>{
          return(
            <CartItem product = {c} key = {c._id} />
          )
        })}
      <div className="totalPrice">Total Price {total}</div>
     
       <button onClick={()=>{handlePayment(total)}}></button>
      
      </div>
  )
      
}

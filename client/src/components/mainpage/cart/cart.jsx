import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'

import CartItem from '../utils/cartItem'


export default function Cart() {
  
  const[total,setTotal] = useState(0);
  const state = useContext(AuthContext)
  const [cart,setCart] = state.userApi.cart
  
  useEffect(()=>{
    let sum = 0 ; 
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price*cart[i].quantity ;
    }

    setTotal(sum);
  },[cart])
  
  return (
      <div className="cart-container">
        {cart.map(c=>{
          return(
            <CartItem product = {c} key = {c._id} />
          )
        })}
      <div className="totalPrice">Total Price {total}</div>
     
     
      
      </div>
  )
      
}

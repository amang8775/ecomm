import React from 'react'
import Cart from './cart/cart'
import Products from './products/Products'
import Login from './auth/login'
import register from './auth/register'
import notFound from './utils/notFound'
import {Switch,Route} from 'react-router-dom'
import CreateProduct from './createProduct'
import CreateCategory from './createCategories'
import DetailProduct from './products/detailProduct'
import OrderHistory from './history/history'
import OrderDetails from './history/historyDetail'

export default function Mainpage() {
  return (
   <Switch>
     <Route path = "/" exact component = {Products} />
     <Route path = "/login" exact component = {Login} />
     <Route path = "/register" exact component = {register} />
     <Route path = "/cart" exact component = {Cart} />
     <Route path = "/createProduct" exact component = {CreateProduct} />
     <Route path = "/createCategory" exact component = {CreateCategory} />
     <Route path = "/detailProduct/:id" exact component = {DetailProduct} />
     <Route path = "/history" exact component = {OrderHistory} />
     <Route path = "/history/:id" exact component = {OrderDetails} />
     
     <Route path = "*" exact component = {notFound} />
   </Switch>
  )
}

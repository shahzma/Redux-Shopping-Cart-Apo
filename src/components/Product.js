import React from "react";
import { useDispatch } from "react-redux";
import "./Product.css";
import { cartActions } from "../store/cart-slice";
import { useSelector } from "react-redux";

// Product exported here will act as one item card while products is for all cards
 
const Product = ({ name, id, imgURL, price }) => {
  // moving below functionality to app.js because we have 5 items and thus it is console logging 5 times
  // const cartItems = useSelector(state => state.cart.itemsList);
  // console.log(cartItems)
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(cartActions.addToCart({
      name,
      id ,
      price }));
  }
  return (
    <div className="card">
      <img src={imgURL} alt={name} />
      <h2>{name}</h2>
      <p>$ {price}</p>
      <button onClick = {addToCart}>Add to cart</button>
    </div>
  );
};

export default Product;

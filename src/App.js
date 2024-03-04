import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification  from "./components/Notification";
import { uiActions } from "./store/ui-slice";
import { sendCartdata } from "./store/cart-slice";
let  isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.ui.notification)
  // useselector is hook.state below is callback param.We are grebbing redux state of auth. Statename will be isLoggedIn
  const isloggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isloggedIn);
  // const cartItems = useSelector(state => state.cart.itemsList);
  // console.log(cartItems)
  const cart = useSelector(state => state.cart);
  // cartitems is collection in firebase
  useEffect(()=>{
    if (isFirstRender){
      isFirstRender = false;
      return;
    }
    // const sendRequest = async()=>{
    //   dispatch(uiActions.showNotifications({
    //     open: true,
    //     message:"Sending request",
    //     type:"warning"
    //   }))
    //   const res = await fetch('https://redux-http-fcc-default-rtdb.firebaseio.com/cartItems.json',{
    //     method: 'PUT',
    //     body: JSON.stringify(cart)
    //   });
    //   const data = await res.json();
    //   // send state as request is succes
    //   dispatch(uiActions.showNotifications({
    //     open: true,
    //     message:"Sent request to server",
    //     type:"success"
    //   }))
    // };
    // sendRequest().catch(err=>{
    //   // send state as error
    //   dispatch(uiActions.showNotifications({
    //     open: true,
    //     message:"Sending request failed",
    //     type:"error"
    //   }))
    // });
  
    dispatch(sendCartdata(cart));

  },[cart,dispatch])
  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message}/>}
      {/* if user is not logged in we render auth */}
      {!isloggedIn && <Auth />} 
      {isloggedIn && <Layout />}
    </div>
  );
}

export default App;
 
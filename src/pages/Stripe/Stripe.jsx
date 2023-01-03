import "./stripe.css"
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom";
import { searchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)
const Stripe = () => {
  
  const location=useLocation()
  const id =location.pathname.split("/")[3];

  
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {data,loading,error}=useFetch(`https://hotel-booking-backend-72a2.onrender.com/api/hotels/payment/find/${id}`)
  console.log(data);

 

  
  
const {user} =useContext(AuthContext);
const navigate =useNavigate()

const {dates,options}=useContext(searchContext);
console.log(dates)

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function dayDifference(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}

const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const priceForStripe=days*data.cheapestPrice*100;
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
// const handleClick =()=>{
// if(user){
//   setOpenModal(true);
// }else{
//   navigate("/login")
// }
// }
const handleSuccess=()=>{
   MySwal.fire({
    icon:"success",
    title:"Payment was successfull",
    time:4000,
   }) 
}
const handleFailure=()=>{
    MySwal.fire({
     icon:"error",
     title:"Payment was unsuccessfull",
     time:7000,
    }) 
 }

const payNow =async token=>{
    try{
const response=await axios({
    url:"https://hotel-booking-backend-72a2.onrender.com/api/payment",
    method:"post",
    data:{
        amount:days*data.cheapestPrice*100,
        token,
    }
})
if(response.status===200){
    handleSuccess();
    console.log("your payment was successfull")
    navigate("/")
}
    }catch(error){
        handleFailure()
console.log(error)
    }
}
  return (

    <div className="container">
        <div style={{width:"100%",height:"5rem",textAlign:"center",fontSize:"3rem",color:"white",background:"black"}}>Payment</div>
    <div className="card">
      <div>Payment</div>
      <div>HotelName:{data.name}</div>
      <div>City:{data.city}</div>
      <div>price:{days*data.cheapestPrice}</div>
      <StripeCheckout
      stripeKey="pk_test_51MJh8NSJ4gHvqLci3MKXtzhgv0urjpzUzaFceb5xwWds9dkwWgLr6Q76H825zCRbDG8UJGcyUCkOfQUPBOxiRRXD0074gm2TIf"
      label="pay now"
      name="pay with credit card"
      amount={priceForStripe}
      description={`Total price is $${days*data.cheapestPrice} `}
      token={payNow}
      
      
      />
    </div>
    </div>
  );
};

export default Stripe;



















































// import axios from 'axios'
// import React, { useState } from 'react'
// import StripeCheckout from 'react-stripe-checkout'
// import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// const Stripe = () => {
//     toast.configure()

//     const [product]=useState({
//         name:"sample mario Game",
//         price:1000,
//         description:"This is a sample mario"
//     })
//    async function handleToken(token){
// const response =await axios.post("http://localhost:8000/checkout",{token,product})
// console.log(response.status)

// if(response.status===200){
// toast("sucess payment is completed",{type:"success"})
// }else{
//     toast("failed payment",{type:"error"})
// }
// }
//   return (
//     <div>
//         <div className='container'>
//             <h1 className="text-center">Stripe payment checkout</h1>
// <br></br>
// <div className='form'>
// <StripeCheckout
// className="center"
// stripeKey='pk_test_51MJh8NSJ4gHvqLci3MKXtzhgv0urjpzUzaFceb5xwWds9dkwWgLr6Q76H825zCRbDG8UJGcyUCkOfQUPBOxiRRXD0074gm2TIf'
// token={handleToken}
// amount={product.price*100}
// name={product.name}
// />
// </div>
//         </div>
//     </div>
//   )
// }

// export default Stripe
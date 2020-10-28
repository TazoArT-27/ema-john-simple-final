import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {UserContext} from '../../App'
import './Shipment.css'
import { Button } from '@material-ui/core';
import '../../App.css'
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
   
    const { register, handleSubmit, watch, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
      //console.log(data)
    //   const savedCart = getDatabaseCart();
    //   const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};

    //   fetch('http://localhost:5000/addOrder',{
    //     method : 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(orderDetails)

    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data){
    //       processOrder();
    //         alert('your order placed successfully')
    //     }
    // })

        setShippingData(data)



    };

    const handlePaymentSuccess = (paymentId) => {
      const savedCart = getDatabaseCart();
      const orderDetails = {
        ...loggedInUser, 
        products: savedCart, 
        shipment: shippingData,
        paymentId, 
        orderTime: new Date()
      };

      fetch('http://localhost:5000/addOrder',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)

      })
      .then(res => res.json())
      .then(data => {
        if (data){
          processOrder();
            alert('your order placed successfully')
        }
    })
    }
  
    console.log(watch("example")); // watch input value by passing the name of it

    

  
    return (
      
        
      <div className="row">
        <div style={{display : shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.name && <span class="error">Name is required</span>}
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
        {errors.email && <span class="error">Email is required</span>}
        <input name="address" ref={register({ required: true })} />
        {errors.address && <span class="error">Address is required</span>}
        <input name="phoneNumber" ref={register({ required: true })} />
        {errors.phoneNumber && <span class="error">Phone number is required</span>}
        
        <input type="submit" /> */}

        <div className="form-group">
          <label>Name</label>
          {<input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} type="name" className="form-control"/>}
          {errors.name && <small id="emailHelp" className="form-text text-muted">Name is required</small>}
        </div>
        <div className="form-group">
          <label>Email address</label>
          {<input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} type="email" className="form-control"/>}
          {errors.email && <small id="emailHelp" className="form-text text-muted">Email is required</small>}
        </div>
        <div className="form-group">
          <label>Address</label>
          {<input name="address" ref={register({ required: true })} type="text" className="form-control"/>}
          {errors.address && <small id="emailHelp" className="form-text text-muted">Address is required</small>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          {<input name="phoneNumber" ref={register({ required: true })} type="text" className="form-control"/>}
          {errors.phoneNumber && <small id="emailHelp" className="form-text text-muted">Phone number is required</small>}
        </div>
        <Button style={{outline: 'none'}} type="submit" className=""variant="contained" color="primary">
          Submit
        </Button>

        

      </form>
        </div>
        <div style={{display : shippingData ? 'block' : 'none'}} className="col-md-6">
           <h2>Please Pay</h2>
           <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
        </div>
      </div>
    );
       
}

export default Shipment;
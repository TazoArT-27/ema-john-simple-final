import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {UserContext} from '../../App'
import './Shipment.css'

const Shipment = () => {
   
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      
        
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.name && <span class="error">Name is required</span>}
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
        {errors.email && <span class="error">Email is required</span>}
        <input name="address" ref={register({ required: true })} />
        {errors.address && <span class="error">Address is required</span>}
        <input name="phoneNumber" ref={register({ required: true })} />
        {errors.phoneNumber && <span class="error">Phone number is required</span>}
        
        <input type="submit" />
      </form>
    );
       
}

export default Shipment;
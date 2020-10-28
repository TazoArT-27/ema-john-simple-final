import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51Ha9ZvHYsVRB81LM9bnGOXM8dDPwPmgCYU2883eIBTGkWgFCigDwo63zEgM5YSyKfu11EFpUrRmVRr6JgCOsBNhr00OloD27qs');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
        

            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;
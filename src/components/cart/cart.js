import React from 'react';

const cart = (props) => {
    const cart = props.cart;

    //const total = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
        
    }
    
    let shipping = 0;
    if(total>15){
        shipping=4.99;
    }else if(total>0){
        shipping=12.99;
    }else if(total>35){
        shipping=0;
    }
    const tax = (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <>
            <div className="col-md-12 mx-auto">
            <div className="card bg-light mb-3">
                <div className="card-header bg-dark text-light text-center">Order Summary</div>
                <div className="card-body">
                    <p className="card-text">Items Ordered: {cart.length}</p>
                    {/* <p className="card-text">Product Price: {formatNumber(total)}</p> */}
                    <p className="card-text"><small>Tax + VAT: ${tax}</small></p>
                    <p className="card-text"><small>Shipping Cost: ${(total+shipping).toFixed(2)}</small></p>
                    <p className="card-text">Total Price: ${formatNumber(total)}</p>
                    <p className="card-text text-primary text-bold">Grand Total: ${grandTotal}</p>
                    <br/>
                    {props.children}
                </div>
            </div>
            </div>
        </>
    );
};

export default cart;
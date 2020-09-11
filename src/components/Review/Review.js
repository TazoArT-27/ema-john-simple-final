import React, { useState, useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/cart';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const Review = () => {
    const [cart, setCart]= useState([]);
    const [orderPlaced, setOrderPlace] = useState(false);
    const history = useHistory()

    
    const handleProceedCheckout = () => {
        // setCart([]);
        // setOrderPlace(true);
        // processOrder();
        history.push('/shipment');
    }
    const handleRemoveProduct = (productKey) => {
        //console.log(handleRemoveProduct, productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
          const savedCart = getDatabaseCart();
          const productKeys = Object.keys(savedCart);

          const cartProducts = productKeys.map( key => {
                const product = fakeData.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
          });
          setCart(cartProducts);
    },[])
    
    let thankyou;
    if(orderPlaced){ 
       thankyou = <h1 class="text-center">Congrats!!! <br/> Your order has been placed</h1>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            
            {
                cart.map(pd => <ReviewItem handleRemoveProduct={handleRemoveProduct} key={pd.key} product={pd}></ReviewItem>)
            }

            {
                thankyou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    {/* <button onClick={handlePlaceholder} className="main-button">Place Order</button> */}
                    <div style={{textDecoration:'none',justifyContent:'center' }} >
                    <Button onClick={handleProceedCheckout} style={{outline:'none'}} variant="contained" color="primary">
                        Proceed Checkout
                    </Button>
                    </div>
                </Cart>
            </div>

        </div>
    );
};

export default Review;
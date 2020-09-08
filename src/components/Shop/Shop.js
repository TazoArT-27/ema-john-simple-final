import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../cart/cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first10);
    //const first10 = fakeData.slice(0, 10);
    const[cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);

    }, [])
    const handleAddProduct = (product) => {
        //console.log("clicked", product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            <ul>
                {
                    product.map(element => <Product key={element.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={element}></Product>)
                }
            </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link style={{textDecoration:'none', }} to='/review'> 
                <Button style={{outline:'none'}} variant="contained" color="primary">
                  Review Order
                </Button>
                </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;
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
    //const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState();
    //const first10 = fakeData.slice(0, 10);
    const[cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        //console.log(products, productKeys)
        // if(products.length > 0){
        //     const previousCart = productKeys.map( existingKey => {
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
        fetch('http://localhost:5000/productsByKeys', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(productKeys)

          })
          .then(res => res.json())
          .then(data => setCart(data))

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
                    products.map(element => <Product key={element.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={element}></Product>)
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
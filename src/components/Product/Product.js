import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import  {Button}  from '@material-ui/core';


const Product = (props) => {
    //console.log(props);
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div className="mb-3">
            <div className="row no-gutters">
                <div className="col-md-2">
                <img src={img} style={{height:'180px', width:'180px'}} className="card-img" alt="..."/>
                </div>
                <div className="col-md-10">
                <div className="card-body">
                    <h4 className="card-title product-name"><Link style={{color: 'black', textDecoration: 'none'}} to={"/product/"+key}>{name}</Link></h4>
                    <p className="card-text px-3">by: { seller}</p>
                    <p className="card-text px-3">${price}</p>
                    <p className="card-text px-3"><small>Only {stock} left in stock - Order soon</small></p>
                    {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                    <div className='px-3'>
                       {props.showAddToCart === true && <Button  style={{outline: 'none',}} color="primary" variant="contained"  onClick={() => props.handleAddProduct(props.product)}><AddShoppingCartIcon/> add to cart</Button>}
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
};

export default Product;
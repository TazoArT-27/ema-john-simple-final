import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import { Container } from '@material-ui/core';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    //console.log(product);
    return (
        <div>
            {/* <h1>{productKey}soon</h1> */}
            <Container>
            <Product showAddToCart={false} product={product}></Product>
            </Container>
        </div>
    );
};

export default ProductDetail;
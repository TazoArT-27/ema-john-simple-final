import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, price, img} = props.product;
    return (
        <>
          <div className="mb-3">
            <div className="row no-gutters">
                <div className="col-md-2">
                <img src={img} style={{height:'180px', width:'180px'}} className="card-img" alt="..."/>
                </div>
                <div className="col-md-10">
                <div className="card-body">
                    <h4 className="card-title product-name">{name}</h4>
                    <p className="card-text px-3">Quantity: {quantity}</p>
                    <p className="card-text px-3">${price}</p>
                </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default ReviewItem;
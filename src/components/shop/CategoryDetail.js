import React, { useState, useEffect } from "react";
import {Col, Card, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function CategoryDetail (props) {
    
    //variables
    const { products } = props;

    // useStates
    const [ collection, setCollection ] = useState([]);

    // useEffects
    useEffect(()=> {
        const productArray = products.map( product => {
            return(
                <Col key={product._id} md={6} xl={4}>
                    <Link to={`/shop/product/${product._id}`}>
                        <Card className="productCards">
                            <Card.Title>
                                <Image className="featuredImage" src={ product.gallery }/>
                                <h2 className="productTitle">{ product.productName }</h2>
                            </Card.Title>
                            <Card.Body className="productContent">
                                <p className="mb-2 productPrice">P&nbsp;{ product.price }.00</p>
                                <Link 
                                    to={`/shop/product/${product._id}`}
                                    className="customButton productCTA"
                                >
                                    View Product
                                </Link>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            );
        });
        setCollection(productArray);
    }, [products]);

    // functions


    return(
        <>
            { collection }
        </>
    );
}
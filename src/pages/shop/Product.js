import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Row } from "react-bootstrap";

import ProductDetail from "../../components/shop/ProductDetail";

export default function Product () {
    
    // variables
    const { productId } = useParams();
    
    // useStates
    const [ categoryResult, setCategoryResult ] = useState([]);
    const [ product, setProduct ] = useState([]);

    const resultProduct = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/product/${productId}`)
        .then(response => response.json())
        .then(product => {
            setProduct(product);
        })
        .catch( error => console.log(error));
    } //end of resultProduct()

    const fetchCategory = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/shop`)
        .then(response => response.json())
        .then(category => {
            setCategoryResult(category);
        })
        .catch( error => console.log(error));
    }//end of fetchCategory

    // useEffects
    useEffect(()=> {
        resultProduct();
        fetchCategory();
    }, []);

    return (
        <Row className="hero internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                <ProductDetail categoryResult={ categoryResult } product={ product } resultProduct={ resultProduct }/>
            </div>
        </Row>
    );
} //end of Product()
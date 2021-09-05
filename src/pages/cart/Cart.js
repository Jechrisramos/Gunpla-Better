import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import MyCart from "../../components/cart/MyCart";

export default function Cart () {

    // varriables

    // useStates
    const [ myCart, setMyCart ] = useState([]);
    const [ products, setProducts ] = useState([]);

    const fetchMyCart = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/users/my-cart`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( cart => {
            setMyCart(cart);
        })
        .catch( error => console.log(error));
    } //end of fetchMyCart()

    const fetchProduct = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/collection/product/all`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( products => {
            setProducts(products);
        })
        .catch( error => console.log(error));
    } //end of fetchProduct()
    
    // useEffects
    useEffect(() => {
        fetchMyCart();
        fetchProduct();
    }, []);

    // functions

    return(
        <Row className="hero internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                <MyCart products={ products } myCart={ myCart } fetchMyCart={ fetchMyCart }/>
            </div>
        </Row>
    ); //end of return()

} //end of Cart()
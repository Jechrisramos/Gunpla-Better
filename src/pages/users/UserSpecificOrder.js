import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Row } from "react-bootstrap";

import UserOrder from "../../components/UserProfile/UserOrder";

export default function UserSpecificOrder () {

    // variables
    const { orderId } = useParams();
    // useStates
    const [ order, setOrder ] = useState([]);
    const [ allProducts, setAllProducts ] = useState([]);

    const fetchOrderData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/orders/my-orders/order/${orderId}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( result => {
            setOrder(result);
        })
        .catch( error => console.log(error));
    } //end of fetchOrderData()

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
            setAllProducts(products);
        })
        .catch( error => console.log(error));
    } //end of fetchProduct()

    // useEffects
    useEffect( ()=> {
        fetchOrderData();
        fetchProduct();
    }, []);

    // functions

    return(
        <Row className="hero internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                <UserOrder order={ order } allProducts={ allProducts } />
            </div>
        </Row>
    ); //end of return
} //end of SpecificOrder()
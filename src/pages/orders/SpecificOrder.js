import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Row } from "react-bootstrap";

import OrderDetail from "../../components/orders/OrderDetail";

export default function SpecificOrder () {
    //variables

    //useStates
    const [ order, setOrder ] = useState([]);

    const [ allUsers, setAllUsers ] = useState([]);
    const [ allProducts, setAllProducts ] = useState([]);

    const { orderId } = useParams();

    //fetch one order
    const fetchOrderData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/orders/${orderId}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json", 
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( order => {
            setOrder(order);
        })
        .catch( error => console.log(error));
    } //end of fetchOrderData()
    
    //fetch all users
    const fetchUserData = () => {
        fetch(`${ process.env.REACT_APP_API_URL }/users/`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( users => {
            setAllUsers(users);
        })
        .catch( error => console.log(error));
    } //end of fetchUserData()

    //fetch all products
    const fetchProductData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/`, {
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
    } //end of fetchProductData

    // useEffects
    useEffect(()=>{
        fetchOrderData();
        fetchUserData();
        fetchProductData();
    }, []);

    //functions

    return( 
        <Row className="hero internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                <OrderDetail 
                    order={ order } 
                    allUsers={ allUsers } 
                    allProducts={ allProducts } 
                    fetchOrderData={ fetchOrderData }
                    fetchUserData={ fetchUserData }
                    fetchProductData={ fetchProductData }
                />
            </div>
        </Row>
    );
} // end of SpecificOrder
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import OrderList from "../../components/orders/OrderList";

export default function Orders () {

    //variables

    //useStates
    const [ allOrders, setAllOrders ] = useState([]);
    const [ allUsers, setAllUsers ] = useState([]);
    const [ allProducts, setAllProducts ] = useState([]);

    //fetch all orders
    const fetchOrderData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/orders/`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( orders => {
            setAllOrders(orders);
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

    return (
        <Row className="hero internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                <OrderList allOrders={ allOrders } allUsers={ allUsers } fetchOrderData={ fetchOrderData } fetchUserData={fetchUserData} />
            </div>
        </Row>
    );//end of return
} //end of Orders()
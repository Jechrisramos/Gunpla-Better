import React, { useState, useEffect } from "react";
import {Col, Table, Tabs, Tab, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Moment from 'moment';


export default function OrderList(props) {

    //variables
    const { allOrders, allUsers, fetchOrderData, fetchUserData } = props
    
    //useStates
    const [ inProgressOrders, setInProgressOrders ] = useState([]);
    const [ forDeliveryOrders, setForDeliveryOrders ] = useState([]);
    const [ completeOrders, setCompleteOrders ] = useState([]);
    const [ cancelledOrders, setCancelledOrders ] = useState([]);
    
    //useEffects
    useEffect(()=> {

            const inProgressOrderArray = allOrders.map( order => {
                
                if(order.status === "in-progress"){
                    let buyerName = "";
                    allUsers.map( user => {
                        if(user._id === order.userId){
                            buyerName = `${user.firstName} ${user.lastName}`;
                        }
                    });
                    
                    return(
                        <tr key={ order._id } id={ order._id }>
                            <td>{ order._id }</td>
                            <td>{ buyerName }</td>
                            <td>P&nbsp;{ order.totalAmount }.00</td>
                            <td>In Progress</td>
                            <td>{ Moment(order.purchasedOn).format('llll') }</td>
                            <td align="center">
                                {
                                    <>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => processDelivery(order._id)}
                                    >
                                        DELIVER ORDER
                                    </Button>
                                    <Link
                                        className="btn btn-sm btn-warning"
                                        to={`/orders/order/${order._id}`}
                                    >
                                        VIEW DETAILS
                                    </Link>
                                    </>
                                }
                            </td>
                        </tr>
                    );
                }
    
            }); //end of completeOrderArray
            setInProgressOrders(inProgressOrderArray);

            const forDeliveryOrderArray = allOrders.map( order => {
                
                if(order.status === "delivery"){
                    let buyerName = "";
                    allUsers.map( user => {
                        if(user._id === order.userId){
                            buyerName = `${user.firstName} ${user.lastName}`;
                        }
                    });
                    
                    return(
                        <tr key={ order._id } id={ order._id }>
                            <td>{ order._id }</td>
                            <td>{ buyerName }</td>
                            <td>P&nbsp;{ order.totalAmount }.00</td>
                            <td>Delivery</td>
                            <td>{ Moment(order.purchasedOn).format('llll') }</td>
                            <td align="center">
                                {
                                    <>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => processComplete(order._id)}
                                    >
                                        COMPLETE ORDER
                                    </Button>

                                    <Link
                                        className="btn btn-sm btn-warning" size="sm"
                                        to={`/orders/order/${order._id}`}
                                    >
                                        VIEW DETAILS
                                    </Link>
                                    </>
                                }
                            </td>
                        </tr>
                    );
                }
    
            }); //end of completeOrderArray
            setForDeliveryOrders(forDeliveryOrderArray);

            const completeOrderArray = allOrders.map( order => {
                
                if(order.status === "complete"){
                    let buyerName = "";
                    allUsers.map( user => {
                        if(user._id === order.userId){
                            buyerName = `${user.firstName} ${user.lastName}`;
                        }
                    });
                    
                    return(
                        <tr key={ order._id } id={ order._id }>
                            <td>{ order._id }</td>
                            <td>{ buyerName }</td>
                            <td>P&nbsp;{ order.totalAmount }.00</td>
                            <td>Complete</td>
                            <td>{ Moment(order.purchasedOn).format('llll') }</td>
                            <td align="center">
                                <Link
                                    className="btn btn-sm btn-warning"
                                    to={`/orders/order/${order._id}`}
                                >
                                    VIEW DETAILS
                                </Link>
                            </td>
                        </tr>
                    );
                }
    
            }); //end of completeOrderArray
            setCompleteOrders(completeOrderArray);

            const cancelledOrderArray = allOrders.map( order => {
                
                if(order.status === "cancelled"){
                    let buyerName = "";
                    allUsers.map( user => {
                        if(user._id === order.userId){
                            buyerName = `${user.firstName} ${user.lastName}`;
                        }
                    });
                    
                    return(
                        <tr key={ order._id } id={ order._id }>
                            <td>{ order._id }</td>
                            <td>{ buyerName }</td>
                            <td>P&nbsp;{ order.totalAmount }.00</td>
                            <td>Cancelled</td>
                            <td>{ Moment(order.purchasedOn).format('llll') }</td>
                            <td align="center">
                            <Link
                                className="btn btn-sm btn-warning"
                                to={`/orders/order/${order._id}`}
                            >
                                VIEW DETAILS
                            </Link>
                            </td>
                        </tr>
                    );
                }
    
            }); //end of completeOrderArray
            setCancelledOrders(cancelledOrderArray);
        
    }, [allOrders, allUsers]);
    
    //functions
    const processDelivery = async (orderId) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/orders/${orderId}/process`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem(`accessToken`) }`
            }
        })
        .then(response => response.json())
        .then(forDelivery => {
            if(forDelivery){
                fetchOrderData();
                fetchUserData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `Order is now for Delivery.`
                });
            }else{
                fetchOrderData();
                fetchUserData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Something went wrong. Please try again." 
                });
            }
        })
        .catch( error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Something went wrong. Please try again." 
            });
        });
    } //end of processDelivery()

    const processComplete = async (orderId) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/orders/complete/${orderId}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem(`accessToken`) }`
            }
        })
        .then(response => response.json())
        .then( complete => {
            if(complete){
                fetchOrderData();
                fetchUserData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `Order is Complete.`
                });
            }else{
                fetchOrderData();
                fetchUserData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Something went wrong. Please try again." 
                });
            }
        })
        .catch( error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Something went wrong. Please try again." 
            });
        });
    } // end of processComplete


    return(
        <>
            <Col>
                <Tabs defaultActiveKey="in-progress" id="uncontrolled-tab-example" className="customTabs">
                    
                    <Tab eventKey="in-progress" title="In Progress" className="customTab">
                        <Table striped bordered hover responsive>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date of Purchased</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { inProgressOrders }
                            </tbody>
                        </Table>
                    </Tab>

                    <Tab eventKey="forDelivery" title="Delivery" className="customTab">
                        <Table striped bordered hover responsive>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date of Purchased</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { forDeliveryOrders }
                            </tbody>
                        </Table>
                    </Tab>

                    <Tab eventKey="complete" title="Complete" className="customTab">
                        <Table striped bordered hover responsive>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date of Purchased</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { completeOrders }
                            </tbody>
                        </Table>
                    </Tab>

                    <Tab eventKey="cancelled" title="Cancelled" className="customTab">
                        <Table striped bordered hover responsive>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date of Purchased</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { cancelledOrders }
                            </tbody>
                        </Table>
                    </Tab>

                </Tabs>
            </Col>
            
        </>
    ); //end of return

} //end of OrderList()
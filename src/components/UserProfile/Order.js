import React, {useState, useEffect} from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Moment from "moment";


export default function Order(props){
    
    //variables
    const { userOrders, fetchOrderData } = props;
    //useState
    const [ order, setOrder ] = useState([]);

    //useEffect
    useEffect(() => {
        const orderArray = userOrders.map( userOrder => {
            
            let status = "";
            let color = "";
            if( userOrder.status === "in-progress"){
                color = "text-primary";
                status = "In Progress";
            }else if (userOrder.status === "cancelled"){
                color = "text-danger";
                status = "Cancelled";
            }else if (userOrder.status === "delivery"){
                color = "text-success";
                status = "Delivery";
            }else if (userOrder.status === "complete"){
                color = "text-secondary";
                status = "Complete";
            }else {
                status = "";
            }

            return(
                <>
                    <tr>
                        <td><strong>{ userOrder._id }</strong></td>
                        <td>{ Moment(userOrder.purchasedOn).calendar() }</td>
                        <td>P&nbsp;{ userOrder.totalAmount }.00</td>
                        <td className={ color }><strong>{ status }</strong></td>
                        <td>
                            {
                                (userOrder.status === "in-progress") ? 
                                (
                                    <>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="mr-2"
                                        onClick={ () => {cancelOrder(userOrder._id)} }
                                    >
                                        Cancel Order
                                    </Button>

                                    <Link
                                        className="btn btn-sm btn-primary"
                                        to={`/profile/order/${userOrder._id}`}
                                    >
                                        View Details
                                    </Link>
                                    </>
                                )
                                :
                                (
                                    <Link
                                        className="btn btn-sm btn-primary"
                                        to={`/profile/order/${userOrder._id}`}
                                    >
                                        View Details
                                    </Link>
                                )
                            }
                        </td>
                    </tr>
                </>
            );
        }); //end of orderArray
        setOrder(orderArray);
    }, [userOrders]);

    //functions
    const cancelOrder = async (orderId) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/orders/cancel/${orderId}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(cancelled => {
            if(cancelled){
                fetchOrderData();
                Swal.fire({
                    title : "Cancelled!",
                    icon : "success",
                    text : `You successfully cancelled an order.`
                });
            }
        })
        .catch( error => console.log(error) );
    } //end of cancelOrder

    return(
        <>
            <Table id="orders" striped bordered hover responsive>
                <thead className="bg-dark text-white">
                    <tr>
                        <td>ID:</td>
                        <td>Date of Purchase:</td>
                        <td>Total Amount:</td>
                        <td>Status:</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    { order }
                </tbody>
            </Table>
        </>
    ); //end of result
} //end of Order()
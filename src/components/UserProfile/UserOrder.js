import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Card, Table } from "react-bootstrap";
import Moment from 'moment'; 
export default function UserOrder (props) {

    const { order, allProducts } = props;
    
    const { _id, totalAmount, status, products, purchasedOn } = order;
    
    // useStates
    const [ resultProducts, setResultProducts ] = useState([]);
    
    // useEffects
    useEffect(()=> {

        if(products){
            const productArray = products.map( product => {
                const resultProduct = allProducts.find( result => result._id == product.productId );
                if(resultProduct){
                    return(
                        <tr>
                            <td><strong>({product.quantity}) { resultProduct.productName }</strong></td>
                            <td>Price: P&nbsp;{ resultProduct.price }.00</td>
                            <td align="right">Subtotal: P&nbsp;{product.subTotal}.00</td>
                        </tr>
                    );
                }
            });
            setResultProducts(productArray);
        }

    }, [order, allProducts]);
    
    return(
        <>
        <Col>
            <Card>
                <Card.Title className="pt-4 pb-0 px-4">
                    <Row>
                        <Col md={6}>
                            <p><strong>Order #: {_id}</strong></p>
                        </Col>

                        <Col md={6}>
                            <p align="right">{ (status === "in-progress") ? "In Progress" : ( status === "delivery" ) ? "Delivery" : ( status === "complete" ) ? "Complete" : "Cancelled"  }</p>
                        </Col>
                        
                    </Row>
                    
                </Card.Title>
                <Card.Body className="py-0 px-3">
                    <Table>
                        <thead>
                            <td colSpan={3}>Purchase Detail(s):</td>
                        </thead>
                        <tbody>
                            { resultProducts }
                            <tr>
                                <td align="right" colSpan={3}><strong>Total: P&nbsp;{ totalAmount }.00</strong></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="p-3">
                    <Row>
                        <Col md={6}>
                            <p>Purchased On: { Moment(purchasedOn).format('LLLL') }</p>
                        </Col>
                        <Col md={6} align="right">
                            <Link to="/profile/#orders">View Other Orders</Link>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Col>
        </>
    );
}
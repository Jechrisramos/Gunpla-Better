import React, { useState, useEffect, useContext } from "react";
import {Row, Col, Card, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import UserContext from "../../UserContext";
import Swal from "sweetalert2";

export default function MyCart (props) {

    // variables
    const { user } = useContext(UserContext);
    const { products, myCart, fetchMyCart } = props;
    
    // useStates
    const [ cartItem, setCartItem ] = useState([]);
    
    // useEffects
    useEffect(() => {
        if(myCart.length !== 0){
            const cartArray = myCart.map( item => {
                let productName = "";
                let productPrice = 0;
                const resultProduct = products.find( result => result._id == item.productId );
                if(resultProduct){
                    productName = resultProduct.productName;
                    productPrice = resultProduct.price;
                }
                console.log(item);
                return(
                    <>
                        <Row key={ item._id } id={ item._id } className="cartItems">
                            <Col xl={6} className="d-flex align-items-center">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="mr-3 deleteCartItem"
                                    onClick={ () => {deleteAnItem(item._id)} }
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </Button>
                                <p className="cartItemProductName"><strong>({ item.quantity }) { productName }</strong></p>
                            </Col>
                            <Col xl={3}>
                                <p className="cartItemPrice">Price: P&nbsp;{ productPrice }.00</p>
                            </Col>
                            <Col xl={3}>
                                <p align="right" className="cartItemSubTotal"><strong>Subtotal: P&nbsp;{ item.subTotal }.00</strong></p>
                            </Col>
                        </Row>
                    </>
                );
            });
            setCartItem(cartArray);
        }
    }, [myCart, products]);
    
    // functions
    // Delete all cart items
    const clearCart = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/users/my-cart/flush`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( flushed => {
            if(flushed){
                fetchMyCart();
                Swal.fire({
                    title : "Success!",
                    icon : "success",
                    text : `Your cart is empty. Please continue shopping. Thank you.`
                });
            }
        })
        .catch( error => console.log(error));
    } //end of clearCart()

    //delete 1 cart items
    const deleteAnItem = async (cartItemId) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/users/my-cart/delete/${cartItemId}`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( dropped => {
            if(dropped){
                fetchMyCart();
                Swal.fire({
                    title : "Success!",
                    icon : "success",
                    text : `1 Item was deleted.`
                });
            }
        })
        .catch( error => console.log(error));
    } //end of deleteAnItem()

    const checkOut = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/users/checkout`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( success => {
            if(success){
                fetchMyCart();
                Swal.fire({
                    title : "Congratulations!",
                    icon : "success",
                    text : `You have successfully added one order.`
                });
            }
        })
        .catch( error => console.log(error));
    } //end of checkOut()

    return(
        <>
        <Card className="productPageContent">
            <Row>
                { 
                    (myCart.length !== 0) ? 
                    (
                        <>
                        <Col xl={6}><h1 className="pageTitle cartTitle">My Cart</h1></Col>
                        <Col xl={6}>
                            <Button
                                className="clearCartButton"
                                variant="danger"
                                size="sm"
                                onClick={ () => {clearCart()} }
                            >
                                Delete All items
                            </Button>
                        </Col>
                        <Col xl={12}>
                            <Card.Body>
                                { cartItem }
                            </Card.Body>
                        </Col>
                        <Col xl={12}>
                            <Button
                                className="customButton checkOutButton"
                                onClick={ () => {checkOut()} }
                            >
                                Checkout
                            </Button>
                        </Col>
                        </>
                    )
                    :
                    (
                        <>
                            <Col xl={12}>
                                <Image className="emptyCartIcon" src="https://image.flaticon.com/icons/png/512/4555/4555971.png"/>
                                <p align="center" className="emptyCartDescription">Your cart is empty.<br/><Link to="/shop">Please continue&nbsp;shopping.</Link></p>
                            </Col>
                        </>
                    )
                }
            </Row>
        </Card>
        </>
    );
} //end of MyCart()
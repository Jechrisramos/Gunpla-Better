import React, { useState, useEffect, useContext } from "react";
import {Row, Col, Card, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import UserContext from "../../UserContext";
import Swal from "sweetalert2";

export default function ProductDetail (props) {
    
    const { user } = useContext(UserContext);

    // variables
    const { product, categoryResult, resultProduct } = props;
    const { _id, productName, description, price, gallery, shortDescription, category, reviews } = product;
    
    // useStates
    const [ categoryName, setCategoryName ] = useState([]);

    
    // useEffects
    useEffect(() => {
        const findCategory = categoryResult.find( result => result._id == category);
        if(findCategory){
            setCategoryName(findCategory.category);
        }
    }, [categoryResult]);
    // functions
    const addToCart = async (productId, productName) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}/add-to-cart`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then( carted => {
            if(carted){
                resultProduct();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `${productName} is added to cart.`
                });
            }else{
                resultProduct();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Something went wrong. Please try again." 
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : "Something went wrong. Please try again." 
            });
        });
    }
    return(
        <Card key={ _id } className="productPageContent">
            <Row>
                <Col xl={5}>
                    <Image className="productImage" src={ gallery }/>
                    <p className="productPageCategory">Category: <Link to={`/shop/category/${ category }`}>{ categoryName }</Link></p>
                </Col>

                <Col xl={7}>
                    <div className="productDetails">
                        <h1 className="productName">{ productName }</h1>
                        <hr/>
                        <p className="productPagePrice">P&nbsp;{ price }.00</p>
                        <hr/>
                        <p>{ description }</p>
                        <p>{ shortDescription }</p>
                        <hr/>
                        {
                            (user.email !== null) ? 
                                (user.isAdmin !== true) ?
                                (<Button 
                                    className="customButton"
                                    onClick={() => {addToCart(_id, productName)} }
                                >
                                    ADD TO CART
                                </Button>)
                                :
                                ("")
                            :
                            (
                                <Link 
                                    to="/login"
                                    className="customButton productPageCTA"
                                >
                                    Log In
                                </Link>
                            )
                        }
                        
                    </div>
                </Col>
            </Row>
        </Card>
    );
} //end of ProductDetail()
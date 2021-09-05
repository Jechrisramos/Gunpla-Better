import React, { useState, useEffect } from "react";
import {Col, Card, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function CategoryList (props) {
    
    // variables
    const { allCategories } = props;

    // useStates
    const [ categories, setCategories ] = useState([]);
    
    // useEffects
    useEffect(() => {

        const categoryArray = allCategories.map( category => {
            return(
                <Col key={category._id} md={6} lg={3}>
                    <Link to={`/shop/category/${category._id}`}>
                        <Card className="productCards">
                            <Card.Title>
                                <Image className="featuredImage" src={ category.featuredImage }/>
                                <h2 className="categoryTitle">{ category.category }</h2>
                            </Card.Title>
                            <Card.Body className="productContent">
                                <p className="mb-2">{ category.categoryDescription }</p>
                                <Link 
                                    to={`/shop/category/${category._id}`}
                                    className="customButton productCTA"
                                >
                                    View Collections
                                </Link>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            );
        });
        setCategories(categoryArray);

    }, [allCategories]);
    //functions

    return(
        <>
        {/* <Col xs={12}> */}
            { categories }
        {/* </Col> */}
        </>
    );
   
} //end of CategoryList()
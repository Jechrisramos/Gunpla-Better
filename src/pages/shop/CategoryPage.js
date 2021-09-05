import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Row } from "react-bootstrap";

import CategoryDetail from "../../components/shop/CategoryDetail";

export default function CategoryPage () {

    // variables
    
    // useStates
    const [ products, setProducts ] = useState([]);

    const { categoryId } = useParams();
    
    const resultCategoryProduct = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/${categoryId}/category`)
        .then(response => response.json())
        .then(products => {
            setProducts(products);
        })
        .catch( error => console.log(error));
    }// end of resultCategory()
    
    // useEffect
    useEffect(()=> {
        resultCategoryProduct();
    }, []);

    // functions

    return(
        <>
            <Row className="hero public-internal-hero">
                <div className="heroContent content-width d-flex align-items-center">
                        <h1 className="pageTitle">Categories</h1>
                </div>
            </Row>
            <Row className="contentRow">
                <div className="content-width d-flex align-items-top">
                    <Row>
                        <CategoryDetail products={ products } />
                    </Row>
                </div>
            </Row>
        </>
    );
} //end of CategoryPage()
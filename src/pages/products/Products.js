import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import ProductList from "../../components/products/ProductList";

export default function Products () {

    //variables

    //useStates
    const [ allProducts, setAllProducts ] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    
    const fetchProductData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(products => {
            setAllProducts(products);
        })
        .catch( error => console.log(error));
    }//end of fetchProductData()

    //to display all categories as a dropdown options both on add new product form and update product form.
    const fetchCategoriesData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/categories/`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(categories => {
            // if(categories.isActive === true) {
            //     setAllCategory(categories);
            // }
            setAllCategory(categories);
        })
        .catch( error => console.log(error));
    }//end of fetchAvatarsData()

    //useEffects
    useEffect(() => {
        fetchProductData();
        fetchCategoriesData(); 
    }, []);

    //functions

    return(
        <Row className="hero internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                <ProductList allProducts={ allProducts } allCategory={ allCategory } fetchProductData={ fetchProductData } />
            </div>
        </Row>
    ); //end of return

} //end of Products()
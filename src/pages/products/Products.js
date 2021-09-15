import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import ProductList from "../../components/products/ProductList";
import Paginator from "../../components/pagination/Paginator";

export default function Products () {

    //variables

    //useStates
    const [ allProducts, setAllProducts ] = useState([]);
    const [ allCategory, setAllCategory ] = useState([]);

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ productsPerPage, setProductsPerPage ] = useState(10);
    
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
    //get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return(
        <Row className="hero internal-hero">
            <div className="heroContent content-width">
                <ProductList currentProducts={ currentProducts } allCategory={ allCategory } fetchProductData={ fetchProductData } />
                <Paginator itemsPerPage={ productsPerPage } totalItems={ allProducts.length } currentPage={ currentPage } paginate={ paginate }/>
            </div>
        </Row>
    ); //end of return

} //end of Products()
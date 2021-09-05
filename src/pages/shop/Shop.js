import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import CategoryList from "../../components/shop/CategoryList";

export default function Shop () {

    //variables

    // useStates
    const [ allCategories, setAllCategories ] = useState([]);
    
    const fetchCategoryData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/products/shop`)
        .then(response => response.json())
        .then(categories => {
            setAllCategories(categories);
        })
        .catch( error => console.log(error));
    }//end of fetchCategoryData

    // useEffects
    useEffect(()=> {
        fetchCategoryData();
    }, []);
    // functions

    return(
        <>
        <Row className="hero public-internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                    <h1 className="pageTitle">Shop</h1>
            </div>
        </Row>

        <Row className="contentRow">
            <div className="content-width d-flex align-items-top">
            <Row>
                <CategoryList allCategories={ allCategories } fetchCategoryData={ fetchCategoryData }/>
            </Row>
            </div>
        </Row>
        </>
    );

} //end of Shop()
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import CategoryList from "../../components/categories/CategoryList";

export default function Categories() {
    
    // variables

    // useStates
    const [ allCategories, setAllCategories ] = useState([]);

    const fetchData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/categories/`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(data => {
            setAllCategories(data);
        })
        .catch( error => console.log(error) );
    }//end of fetchData

    // useEffects
    useEffect(() => {
        fetchData();
    }, []);
    // functions
    return(
        <>
            <Row className="hero internal-hero">
                <div className="heroContent content-width d-flex align-items-center">
                    <CategoryList allCategories={ allCategories }  fetchData={ fetchData } />
                </div>
            </Row>
        </>
    );//end of return
} //end of Categories()
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import CategoryList from "../../components/categories/CategoryList";
import Paginator from "../../components/pagination/Paginator";

export default function Categories() {
    
    // variables

    // useStates
    const [ allCategories, setAllCategories ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ categoriesPerPage, setCategoriesPerPage ] = useState(10);

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
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = allCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <>
            <Row className="hero internal-hero">
                <div className="heroContent content-width">
                    <CategoryList allCategories={ currentCategories }  fetchData={ fetchData } />
                    <Paginator itemsPerPage={ categoriesPerPage } totalItems={ allCategories.length } currentPage={ currentPage } paginate={ paginate }/>
                </div>
            </Row>
        </>
    );//end of return
} //end of Categories()
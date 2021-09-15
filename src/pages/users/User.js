import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import UsersList from "../../components/Users/UsersList"
import Paginator from "../../components/pagination/Paginator";

export default function User() {
    // useStates
    const [users, setUsers] = useState([]);
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ usersPerPage, setUsersPerPage ] = useState(10);

    const fetchData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/users`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
        .catch(error => console.log(error));
    }

    // useEffects
    useEffect(()=> {
        fetchData();
    }, []);
    
    // functions
    const indexOfLastUser = currentPage * usersPerPage;
    const indexofFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexofFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <>
            <Row className="hero internal-hero">
                <div className="heroContent content-width">
                    <UsersList usersList={ currentUsers } fetchData={ fetchData } />
                    <Paginator itemsPerPage={ usersPerPage } totalItems={ users.length } currentPage={ currentPage } paginate={ paginate } />
                </div>
            </Row>
        </>
    );
} //end of User()
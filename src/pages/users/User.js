import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import UsersList from "../../components/Users/UsersList"

export default function User() {
    // useStates
    const [users, setUsers] = useState([]);
    
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

    return(
        <>
            <Row className="hero internal-hero">
                <div className="heroContent content-width d-flex align-items-center">
                    <UsersList usersList={ users } fetchData={ fetchData }/>
                </div>
            </Row>
        </>
    );
} //end of User()
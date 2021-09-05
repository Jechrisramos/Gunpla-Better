import React, {useState, useEffect } from "react";
import {Col, Table, Button} from "react-bootstrap";

import Swal from "sweetalert2";

export default function UsersList(props) {
    
    // variables
    const { usersList, fetchData } = props;

    //useStates
    const [users, setUsers] = useState([])

    //useEffects
    useEffect(()=> {
        const usersArray = usersList.map( user => {
            return(
                <tr key={user._id} id={user._id}>
                    <td><strong>{ `${user.firstName} ${user.lastName}` }</strong></td>
                    <td className={ (user.isAdmin === true) ? "text-success" : "text-secondary" }>
                        { 
                            (user.isAdmin === true) ? "Admin" : "Regular" 
                        }
                    </td>
                    <td>{ user.tel }</td>
                    <td>{ user.email }</td>
                    <td align="center">
                        {
                            (user.isAdmin !== true) ? 
                                (
                                    <Button 
                                        variant="success" 
                                        size="sm"
                                        onClick={()=> updateRole(user._id, user.firstName)}
                                    >
                                        Set as Admin
                                    </Button>
                                )
                            :
                                (
                                    <span>Admin</span>
                                )
                        }
                    </td>
                </tr>
            );
        }); //end pf usersArray

        setUsers(usersArray);
    }, [usersList]);

    //function
    const updateRole = async (userId, firstName) => {
        await fetch(`${ process.env.REACT_APP_API_URL }/users/${userId}/set-admin`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data === true){
                fetchData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : `${firstName} is now an Admin.`
                });
            }else{
                fetchData();
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
    } //end of updateRole()

    return(
        <>
        <Col>
            <Table striped bordered hover responsive>
                <thead className="bg-dark text-white">
                    <tr align="center">
                        <th>Name</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { users }
                </tbody>
            </Table>
        </Col>
        </>
    );
} //end of UsersList()
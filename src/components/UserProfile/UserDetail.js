import React, { useState, useEffect } from "react";
import { Row, Col, Card, Modal, Form, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";

import Order from "./Order";

export default function UserDetail({userDetails, userOrders, fetchOrderData, fetchData}) {
    
    //variable
    const { isAdmin, avatarId, firstName, lastName, tel, email, address } = userDetails;
    
    //useState
    const [ avatar, setAvatar ] = useState("");
    //useEffect
    useEffect( ()=> {
        fetch(`${ process.env.REACT_APP_API_URL }/avatars/avatar/${avatarId}`)
        .then(response => response.json())
        .then(result => {
            if(result){
                setAvatar(result.url);
            }else{ //placeholder
                setAvatar("https://cdn-icons-png.flaticon.com/512/149/149071.png");
            }
            
        })
        .catch(error => console.log(error));
    }, [avatarId, userDetails]);

    //function
    // update user details
    const [userfirstName, setUserFirstName] = useState("");
    const [userlastName, setUserLastName] = useState("");
    const [usertel, setUserTel] = useState("");
    const [userStreet, setUserStreet] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userStates, setUserStates] = useState("");
    const [userZipCode, setUserZipCode] = useState("");

    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => {
        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserTel(tel);
        
        setUserStreet(address.street);
        setUserCity(address.city);
        setUserStates(address.states);
        setUserZipCode(address.zipCode);
        
        setShowEdit(true);
    }//end of openEdit()

    const closeEdit = () => {
        setShowEdit(false);
        setUserFirstName("");
        setUserLastName("");
        setUserTel("");
        setUserStreet("");
        setUserCity("");
        setUserStates("");
        setUserZipCode("");
    }//end of closeEdit()

    const editUser = async (e) => {
        e.preventDefault();

        await fetch(`${ process.env.REACT_APP_API_URL }/users/update`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            },
            body : JSON.stringify({
                firstName : userfirstName,
                lastName : userlastName,
                tel : usertel,
                address : {
                    street : userStreet,
                    city : userCity,
                    states : userStates,
                    zipCode : userZipCode
                }
            })
        })
        .then(response => response.json())
        .then(result =>{
            if(result){
                fetchData();
                Swal.fire({
                    title : "Success",
                    icon : "success",
                    text : "Your Information was updated successfully."
                });
                closeEdit();
            }else{
                fetchData();
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Failed to Update your details. Please try again." 
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title : "Whoops!",
                icon : "error",
                text : error 
            });
        });
    }//end of editUser()

    return (
        <>
         <Col>
            <Card className="profileCard">
                <Row className="d-flex align-items-center">
                    <Col xl={4} className="profileColumn">
                        <Image className="avatarImgLg" src={ (avatar !== undefined) ? avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png" } />
                    </Col>
                    <Col xl={8} className="profileColumn">
                        <h2 className="userName d-flex align-items-center">
                            { `${firstName} ${lastName}` }
                            { 
                                (isAdmin === true) ? 
                                (
                                    <span class="adminBadge">ADMIN</span>
                                )
                                :
                                (
                                    ""
                                )
                            }
                        </h2>
                        <div className="contactInfo">
                            <p><i class="fas fa-phone-alt"></i> <span className="contactInfodetail">{tel}</span></p>
                            <a href={`mailto:${email}`}><i class="fas fa-envelope"></i> <span className="contactInfodetail">{email}</span></a>
                            {
                                (address !== undefined) ? 
                                (
                                    <>
                                    <p> <i class="fas fa-map-marker-alt"></i> 
                                        <span className="contactInfodetail">
                                        {` 
                                            ${address.street},
                                            ${address.city}, ${address.states}
                                            ${(address.zipCode) ? address.zipCode : ""}
                                        `}
                                        </span>
                                    </p>
                                    </>
                                ) 
                                :
                                ("") //else return blank
                            }
                        </div>
                        {/* <Button className="my-3 mr-2" variant="primary" size="sm">Change Avatar</Button> */}
                        <Button className="my-3 mr-2" variant="success" size="sm" onClick={()=> openEdit()}>Update Details</Button>
                    </Col>
                </Row>
            </Card>
            {
                (isAdmin !== true) ?
                (
                    <>
                    <Card className="ordersCard">
                        <h3>Orders</h3>
                        <Order userOrders={ userOrders } fetchOrderData={ fetchOrderData } />
                    </Card>
                    </>
                )
            
            :
            ("")
        }
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit ={ e => editUser(e) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="First Name"
                                    value={userfirstName}
                                    onChange={ e => setUserFirstName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Last Name"
                                    value={userlastName}
                                    onChange={ e => setUserLastName(e.target.value) }
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control 
                                    type="tel"
                                    placeholder="Telephone Number"
                                    value={usertel}
                                    onChange={ e => setUserTel(e.target.value) }
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Row>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="Street"
                                            value={userStreet}
                                            onChange={ e => setUserStreet(e.target.value) }
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="City"
                                            value={userCity}
                                            onChange={ e => setUserCity(e.target.value) }
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>State</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="State"
                                            value={userStates}
                                            onChange={ e => setUserStates(e.target.value) }
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="Zip Code"
                                            value={userZipCode}
                                            onChange={ e => setUserZipCode(e.target.value) }
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} className="mt-2">
                            <Form.Group className="row d-flex align-items-center">

                            </Form.Group>
                        </Col>
                    </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

         </Col>
        </>
     );

} //end of UserDetail()
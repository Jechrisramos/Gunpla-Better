import React, {useState, useEffect} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import Swal from "sweetalert2";

export default function Register(){
    
    //variables
    const history = useHistory();

    //useState
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [states, setStates] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [registerButton, setRegisterButton] = useState(false);

    //useEffect
    useEffect(()=> {
        if(firstName !== "" && lastName !== "" && tel !== "" && email !== "" && password !== "" && confirmPassword !== "" && street !== "" && city !== "" && states !== ""){
            if(password === confirmPassword){
                setRegisterButton(true);
            }else{
                setRegisterButton(false);
            }
        }else{
            setRegisterButton(false);
        }
    }, [firstName, lastName, tel, email, password, confirmPassword, street, city, states, zipCode, registerButton]);

    //functions
    const register = async (e) => {
        e.preventDefault();

        await fetch(`${ process.env.REACT_APP_API_URL }/users/register`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                firstName : firstName,
                lastName : lastName,
                avatarId : "611776a641ce1d3390ba4f73",
                tel : tel,
                email : email,
                password : password,
                address : {
                    street : street,
                    city : city,
                    states : states,
                    zipCode : zipCode
                }
            })
        })
        .then(response => response.json())
        .then( success => {
            if(success){
                Swal.fire({
					title: "Yaaaaaaay!!!",
					icon: 'success',
					text: "You have successfully registered."
				});
            }else{
                Swal.fire({
					title: "Whoops!",
					icon: 'error',
					text: "Something went wrong. Please check your input."
				});
            }
            setFirstName("");
            setLastName("");
            setTel("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setStreet("");
            setCity("");
            setStates("");
            setZipCode("");
            history.push("/login");
        })
        .catch(error => {
            Swal.fire({
                title: "Whoops!",
                icon: 'error',
                text: "Something went wrong. Please check your input."
            });
        });
    }

    return(
        <Row className="hero internal-hero">
            <div className="heroContent d-flex align-items-center">
                <Col>
                    <Form onSubmit={ e => register(e) } className="registerForm customForm">
                        <h2>Register</h2>
                        <Row>
                            <Col md={6}>
                                <Form.Group md={6}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
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
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Telephone Number"
                                        value={tel}
                                        onChange={e => setTel(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={12}>
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
                                                value={street}
                                                onChange={e => setStreet(e.target.value)}
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
                                                value={city}
                                                onChange={e => setCity(e.target.value)}
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
                                                value={states}
                                                onChange={e => setStates(e.target.value)}
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
                                                value={zipCode}
                                                onChange={e => setZipCode(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Col>
                            
                            <Col xs={12} className="mt-2">
                                <Form.Group className="row d-flex align-items-center">
                                    <Col md={6}>
                                        {
                                            registerButton ? 
                                            <Button className="customButton" type="submit">REGISTER</Button>
                                            :
                                            <Button className="customButton" disabled>REGISTER</Button>
                                        }
                                    </Col>

                                    <Col md={6}>
                                        <p className="registerlink">Already have an account? <Link to="/login">Login Here!</Link></p>
                                    </Col>
                                </Form.Group>
                            </Col>   
                        </Row>
                    </Form>
                </Col>
            </div>
        </Row>
    ); //end of return
} //end of Register()
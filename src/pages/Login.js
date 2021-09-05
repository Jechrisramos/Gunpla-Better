import React, { useState, useEffect, useContext }  from "react";

import { Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import UserContext from "../UserContext";

import { Link, Redirect, useHistory } from "react-router-dom";

export default function Login(){

    //variables
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    //useStates
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginButton, setLoginButton] = useState(false);

    //useEffects
    useEffect(()=>{
        if(email && password){
            setLoginButton(true);
        }else{
            setLoginButton(false);
        }
    }, [email, password, loginButton]);

    //functions
    const loginUser = async (e) => {
        e.preventDefault();

        await fetch(`${ process.env.REACT_APP_API_URL }/users/login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if ( data.accessToken !== undefined ){
                localStorage.setItem("accessToken", data.accessToken);
                setUser({ accessToken : data.accessToken });

                Swal.fire({
					title: "Success!",
					icon: "success",
					text: "Welcome to Gunpla Depot."
				});
                
                fetch(`${ process.env.REACT_APP_API_URL }/users/profile`, {
                    headers: {
                        Authorization : `Bearer ${data.accessToken}`
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if(result.isAdmin === true){
                        localStorage.setItem("isAdmin", result.isAdmin);
                        localStorage.setItem("firstName", result.firstName);
                        localStorage.setItem("email", result.email);
                        setUser({ 
                            isAdmin: result.isAdmin,
                            email: result.email,
                            firstName: result.firstName 
                        });
                        //window.location.reload();
                        history.push("/");
                    }else{
                        localStorage.setItem("firstName", result.firstName);
                        localStorage.setItem("email", result.email);
                        setUser({ 
                            email: result.email,
                            firstName: result.firstName 
                        });
                        history.push("/");
                    }
                });

            }else{
                Swal.fire({
					title: "Whoops!",
					icon: "error",
					text: "Something went wrong. Please Check your Credentials."
				}); //end of Swal error
            }
            setEmail("");
            setPassword("");
        }).catch(error => {
            Swal.fire({
                title: "Whoops!",
                icon: "error",
                text: "Something went wrong. Please Check your Credentials."
            }); //end of Swal error
        });
    }// end of loginUser()

    if(user.email !== null){
        return <Redirect to="/" />
    }

    return(
        <Row className="hero internal-hero">
            <div className="heroContent d-flex align-items-center">
           
            <Form className="loginForm customForm" onSubmit={ e => loginUser(e) }>
                <h2>LOGIN</h2>
                <Row>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} className="my-2">
                    <Form.Group className="row d-flex align-items-center">
                        <Col md={6}>
                            { 
                                loginButton ?
                                <Button md={6} className="customButton" type="submit">Login</Button>
                                : 
                                <Button md={6} className="customButton" type="submit" disabled>Login</Button> 
                            }
                        </Col>
                        <Col md={6}>
                            <p className="registerlink">New here? <Link to="/register">Register Here!</Link></p>
                        </Col>
                        
                    </Form.Group>
                    </Col>
                    <Col xs={12}><p className="copyright">Copyright © 2021</p></Col>
                </Row>
            </Form>
            </div>
        </Row>
    ); //end of return

}//end of Login()
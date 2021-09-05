import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import UserContext from "../../UserContext";

export default function Header() {

    const history = useHistory();
    const { user, unsetUser } = useContext(UserContext);
    
    const logout = () => {
        unsetUser();
        history.push("/login");
    }

    let adminMenu = (user.isAdmin === true) ?
        (
            <>
                <Nav.Link as={NavLink} to="/avatar" className="headerMainMenu">Avatar</Nav.Link>
                <Nav.Link as={NavLink} to="/users" className="headerMainMenu">Users</Nav.Link>
                <Nav.Link as={NavLink} to="/categories" className="headerMainMenu">Categories</Nav.Link>
                <Nav.Link as={NavLink} to="/products" className="headerMainMenu">Products</Nav.Link>
                <Nav.Link as={NavLink} to="/orders" className="headerMainMenu">Orders</Nav.Link>
            </>
        )
        :
        (
            <>
                <Nav.Link className="headerMainMenu">About</Nav.Link>
                <Nav.Link as={NavLink} to="/shop" className="headerMainMenu">Shop</Nav.Link>
                <Nav.Link className="headerMainMenu">Contact Us</Nav.Link>
            </>
        );

    let dropdown = (user.email !== null) ? 
    (
        <>
        <NavDropdown 
            id="authenticated-user-dropdown"
            title={user.firstName}
            menuVariant="light"
            drop="down"
            className="headerMainMenu"
        >
            <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
            {
                (user.isAdmin !== true) ?
                (<Nav.Link as={NavLink} to="/profile/#orders">Orders</Nav.Link>)
                :
                ("")
            }
            <NavDropdown.Divider />
            <Nav.Link onClick={logout}>Logout</Nav.Link>
        </NavDropdown>
        </>
    )
    :
    (
        <>
        <NavDropdown 
            id="guest-dropdown"
            title="Guest"
            menuVariant="light"
            drop="down"
        >
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <NavDropdown.Divider />
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
        </NavDropdown>
        </>
    );

    //views
    return (
        <Container fluid id="headerNav">
            <Navbar expand="lg" className="d-flex align-items-center">
                <Navbar.Brand xs={7} as={Link} to="/">
                    <Row className="d-flex align-items-center">
                        <Col xs={2}><Image id="headerBusinessLogo" src={window.location.origin + "/logo-75.png"} alt="business-logo" /></Col>
                        <Col xs={9}>
                            <h2 id="headerBusinessName">
                                <span id="headerBrandNameFirstName">GUNPLA</span> 
                                <span id="headerBrandNameSecondName">BETTER</span>
                            </h2>
                        </Col>
                    </Row>
                </Navbar.Brand>

                <Navbar.Toggle xs={5} aria-controls="basic-navbar-nav"/>
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id="headerMenu" className="ml-auto">
                        <Nav.Link as={NavLink} to="/" className="headerMainMenu">Home</Nav.Link>
                        
                        { adminMenu }
                        
                        { dropdown }

                        { 
                            (user.isAdmin !== true) 
                            ? 
                            ( <Nav.Link as={NavLink} to="/cart" id="cart-link" className="headerMainMenu"><i class="fas fa-shopping-cart"></i></Nav.Link> )
                            : 
                            ("")
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    ); //end of headers
} //end of Header()
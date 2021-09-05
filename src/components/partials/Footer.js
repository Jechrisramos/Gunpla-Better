import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import UserContext from "../../UserContext";

export default function Footer() {

    const { user } = useContext(UserContext);

    return(
        <Container fluid id="footerNav">
            <Row id="footerContent">
                <div className="contentWidth d-flex align-items-center">
                <Col sm={12} md={4}>
                    <Link id="footerBusinessName" to="/">
                        <Row className="d-flex align-items-center">
                            <Col xs={2} md={2}><Image id="footerBusinessLogo" src={window.location.origin + "/logo-75.png"} alt="business-logo" /></Col>
                            <Col xs={9} md={9}>
                                <h2 id="footerBusinessName">
                                    <span id="footerBrandNameFirstName">GUNPLA</span> 
                                    <span id="footerBrandNameSecondName">DEPOT</span>
                                </h2>
                            </Col>
                        </Row>
                    </Link>
                </Col>

                <Col sm={12} md={8}>
                    <Nav id="footerNavigation">
                        <Nav.Link as={NavLink} to="/" className="headerMainMenu">Home</Nav.Link>
                        <Nav.Link className="headerMainMenu">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/shop" className="headerMainMenu">Shop</Nav.Link>
                        <Nav.Link className="headerMainMenu">Contact Us</Nav.Link>
                        <Nav.Link className="headerMainMenu">Terms of Services</Nav.Link>
                    </Nav>
                </Col>
                </div>
            </Row>

            <Row id="footerBadgeRow">
                <div className="contentWidth d-flex align-items-center">
                    <Col xs={6}>
                        <p id="copywrite">Gunpla Better &copy; 2021</p>
                    </Col>
                    <Col xs={6}>
                        <p id="rights">All Rights Reserved.</p>
                    </Col>
                </div>
            </Row>
        </Container>
    ); //end of return;
} //end of Footer()
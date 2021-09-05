import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";


export default function NoFound(){
    
    return(
        <Row className="hero internal-hero">
            <div className="heroContent d-flex align-items-center">
                <Col xs={12}>
                    <Image className="image404" src="https://image.flaticon.com/icons/png/512/1400/1400971.png" />
                    <div className="noResultMessage">
                        <h2 className="mb-2">Oh-oh! Page not Found</h2>
                        <p>Please go back to <Link to="/">Home Page</Link>.</p>
                    </div>
                </Col>
            </div>
        </Row>
    ); //end of return

} //end of NoFound()
import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home(){
    //variables

    //useStates

    //useEffects

    //functions

    return(
        <Row className="hero home-hero">
            <div className="heroContent d-flex align-items-center">

                <Col xl={5} id="heroImageCol">
                    <Image id="heroImage" src="https://i.im.ge/2021/09/05/QdMH7q.png"/>
                </Col>

                <Col xl={7} id="heroHeadlineCol">
                    <h2 className="heroHeadline">
                        <span className="primary-heading">Buy Best Quality Gunpla Model&nbsp;Kits&nbsp;In</span>
                        <span className="secondary-heading">Gunpla Depot</span>
                    </h2>
                    <p className="heroDescription">We offer Proven and Tested Gunpla Model Kits in the&nbsp;market.</p>
                    <Link className="customButton" to="/shop">Shop Now</Link>
                </Col>
                
            </div>
        </Row>
       
    ); //end of return
}
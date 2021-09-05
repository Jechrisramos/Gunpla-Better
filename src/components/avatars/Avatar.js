import React from "react";
import Moment from 'moment';
//bootstrap
import { Col, Card, Image } from "react-bootstrap";

export default function Avatar({avatarProps}){
    
    const {_id, url, avatar, createdAt} = avatarProps;
    
    return(
        <Col md={4} xl={3}>
            <Card id={ _id } align="center" className="avatarCard">
                
                <Card.Body>
                    <Image className="avatarImg" src={ url } />
                    <Card.Title>
                        <h2 className="avatarTitle" >{ avatar.toUpperCase() }</h2>
                    </Card.Title>

                    <Card.Text>
                        <p>{ Moment(createdAt).format('llll') }</p>
                    </Card.Text>

                </Card.Body>
                
            </Card>
        </Col>
    );
} //end of Avatar()
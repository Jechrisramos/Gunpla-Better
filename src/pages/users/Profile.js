import React, {useState, useEffect} from "react";
import { Row } from "react-bootstrap"
//import UserContext from '../../UserContext';

import UserDetail from "../../components/UserProfile/UserDetail";

export default function Profile(){
    
    //variables
    //const { user } = useContext(UserContext);
    
    //useStates
    const [userDetails, setUserDetails] = useState({});

    const [userOrders, setUserOrders] = useState([]);

    //useEffects
    const fetchData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/users/profile`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserDetails(data);
        })
        .catch(error => console.log(error));
    }

    const fetchOrderData = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/orders/user/my-orders`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${ localStorage.getItem('accessToken') }`
            }
        })
        .then(response => response.json())
        .then(orders => {
            setUserOrders(orders);
        })
        .catch(error => console.log(error));
    }

    useEffect(()=> {
        fetchData();
        fetchOrderData();
    }, []);
    
    return (
        <Row className="hero internal-hero">
            <div className="heroContent content-width d-flex align-items-center">
                < UserDetail userDetails={ userDetails } userOrders={ userOrders } fetchOrderData={ fetchOrderData } fetchData={ fetchData }/>
            </div>
        </Row>
    );
}
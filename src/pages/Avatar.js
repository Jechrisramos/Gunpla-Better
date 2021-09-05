import React, {useState, useEffect} from "react";
import { Row } from "react-bootstrap";

import UserView from "../components/avatars/UserView";

export default function Avatar(){
    
    // useStates
    const [allAvatars, setAllAvatars] = useState([]);

    const fetchedAvatars = async () => {
        await fetch(`${ process.env.REACT_APP_API_URL }/avatars`)
        .then(response => response.json())
        .then(data => {
            setAllAvatars(data);
        })
        .catch(error => console.log(error));
    } //end of fetchAvatars()

    // useEffects
    useEffect(()=> {
        fetchedAvatars();
    }, []);

    return(
        <>
            <Row className="hero internal-hero">
                <div className="heroContent content-width d-flex align-items-center">
                       <UserView allAvatars={ allAvatars } />
                </div>
            </Row>
        </>
    ); //end of return
} //end of Avatar()
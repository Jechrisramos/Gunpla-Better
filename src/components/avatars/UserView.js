import React, {useState, useEffect} from "react";
import Avatar from "./Avatar";

export default function UserView({allAvatars}){ 
    
    //useState
    const [avatars, setAvatars] = useState([]);

    //useEffect
    useEffect(() => {
        const avatarArray = allAvatars.map((avatar)=> {
            if(avatar.isArchived === false){
                return (<Avatar key={ avatar._id } avatarProps={avatar} />);
            }else{
                return null;
            }
        });
        setAvatars(avatarArray);
    }, [allAvatars]);

    return(
        <>
            { avatars }
        </>
    );
}//end of UserView()
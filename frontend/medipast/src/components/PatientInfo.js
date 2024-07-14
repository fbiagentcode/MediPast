import { useState, useEffect, useRef } from "react";
import Profile from "./Profile.js";
import Events from "./Events.js";

export default function PatientInfo({ username })
{
    const controller = useRef(new AbortController());
    const [ user, setUser ] = useState();
    const [ pending, setPending ] = useState(false);
    const [ userNotFound, setUserNotFound ] = useState(false);

    async function getUser(username, signal){
        try{
            const res = await fetch(`http://localhost:3000/users/${username}`, { signal });

            if (res.ok){ 
                const userFound = await res.json();
                setUser(userFound);
                console.log(userFound);
            }

            else{
                console.log(`No user found with the username ${username}`, res);
                setUserNotFound(true);
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            setPending(false);
        }
    }

    useEffect(() => {
        setPending(true);
        getUser(username, controller.current?.signal);

        return () => {
            if(controller.current) controller.current.abort("User navigated somewhere else");
            controller.current = new AbortController();
            setUser();
            setUserNotFound(false);
            console.log("cleaned up states!");
        }
    }, [username]);

    return <div className= "patient-info">
        { !pending && <Profile user= { user }/> }
        {/* { <Events/> } */}
    </div>

}
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'


const UserNavBar = () =>{
    const navigate = useNavigate()
    const handleSignOut=()=>{
         navigate('/IntroPage')
    }

  
    return(
        <div id="navBar">

            <button>Projects</button>
            <button >Team Members</button>
            <button >Vendors</button>
            <button onClick={handleSignOut}className='btn'>Sign-out</button>

        </div>



    )







}

export default UserNavBar
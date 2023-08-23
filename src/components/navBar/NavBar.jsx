import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { openModal } from "../redux/features/modalSlice";
import SignIn from "../SignIn";
import './navBar.css'
import Logo from '../../resources/logos/PPP3.gif'

import ContactForm from "../ContactForm";


const NavBar = ({ register, setRegister, signButton, setSignButton, setUserProjects, userProjects }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [contactUs, setContactUs] = useState(false)


    const handleSignOut = () => {

        setSignButton(true)
        navigate('/IntroPage')
   
    }


    return (
        <>
            <div id="navBar">
                <img className='navLogo' src={Logo} />
                <button className="navBtn" onClick={()=>navigate('/IntroPage')}>Information Page</button>
                <button className="navBtn" onClick={() => setContactUs(true)} >Contact Us</button>
                <button className="navBtn" onClick={() => setRegister(true)}>Register</button>
                {signButton && (
                    <button className="navBtn" onClick={() => dispatch(openModal())}>SignIn</button>
                )} 
                   {!signButton && (
                       <button className="navBtn" onClick={handleSignOut}>SignOut</button>
                )}
                   <img className='navLogo' src={Logo} />

                {contactUs && (<ContactForm />)}


            </div>


        </>

    )


}

export default NavBar

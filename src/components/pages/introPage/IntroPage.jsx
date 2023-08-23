import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { reset } from "../../redux/features/userSlice";
import NavBar from "../../navBar/NavBar";
import SignIn from "../../SignIn";
import UserAdd from "../../user/UserAdd";
import userPage from "../../../resources/images/UserPage.JPG"
import comments from "../../../resources/images/comments.JPG"

import ownerHelpers from "../../../resources/images/OwnerHelpers.JPG"
import projectDetails from "../../../resources/images/projectDetails.JPG"
const IntroPage = ({ register, setRegister, signButton, setSignButton, setUserProjects, userProjects  }) => {
    
    const dispatch= useDispatch()
    
    useEffect(() => {
            dispatch(reset())
          
    }, [dispatch]);

    const { isOpen } = useSelector((store) => store.modal)
    const [firstName, setFirstName] = useState('')
    const [thankyou, setThankyou] = useState('')

    const handleContactUs = (e) => {
        e.preventDefault()

    }

    return (
        <>

            <div>
                <NavBar
                    register={register}
                    setRegister={setRegister}
                    signButton={signButton}
                    setSignButton={setSignButton} 
                    setUserProjects={setUserProjects}
                    userProjects={userProjects}
                   />
                {register && <UserAdd
                register={register}
                setRegister={setRegister}
                setUserProjects={setUserProjects}
                userProjects={userProjects} />}

                {isOpen && <SignIn
                   signButton={signButton}
                   setSignButton={setSignButton}
                 />}

                 <div>
                     <h1></h1>
                 
                    <img src={userPage}/><br/>
                    <img src={comments}/>
                    <img src={ownerHelpers}/>
                    <img src={projectDetails}/><br/>
                    
                 </div>
               

            </div>


        </>

    )

}

export default IntroPage

import React, {useState, useEffect} from "react";
import { openModal, closeModal } from "./redux/features/modalSlice";
import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from "./redux/features/userSlice";
import { useNavigate } from 'react-router-dom'


const SignIn = ({signButton, setSignButton}) => {

    const { user, isError, isSuccess } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [checkUserName, setCheckUserName] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [showError, setShowError] = useState(false)
 
    useEffect(() => {

        if(isError){
            setShowError(true)
        }
       if(isSuccess){
        navigate('/UserPage')
        setSignButton(false) 
        dispatch(closeModal()) 
        setCheckUserName("")
        setCheckPassword("")
        
       }

    }, [isSuccess, isError]);

    const handleSubmit = () => {
        
        const userToVerify = {
            userName: checkUserName,
            password: checkPassword
        }

        dispatch(verifyUser(userToVerify))
    }

    return (
        <>
        <div id="signIn">
            <input className="signInInput" onChange={(e) => setCheckUserName(e.target.value)} id="userName" value={checkUserName} type="text" name="userName" placeholder="User Name" />
            <input className="signInInput" onChange={(e) => setCheckPassword(e.target.value)} id="password" value={checkPassword} type="password" name="password" placeholder="Password" />
            <button className="signInBtn" onClick={handleSubmit}>Submit</button>
        </div>

        { showError && <div id="showError">
            <p>Invalid User Name or Password</p>
            <p>please try again</p>
        </div>}
       
        </>
    )

}

export default SignIn

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { createUser, getUser } from '../redux/features/userSlice';
import { getProjects} from '../redux/features/projectSlice';
import { useNavigate } from "react-router-dom";


const UserAdd = ({setUserProjects, setRegister}) => {
  const { projects, isError, isSuccess } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userImage, setUserImage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleUser = (e) => {
    e.preventDefault()
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      userImage: userImage
    }
        dispatch(createUser(newUser))
        dispatch(getProjects())
        const filteredProjects = projects.filter((item) => item.projectOwner === user.userName)
        setUserProjects(filteredProjects)
        setRegister(false)
        navigate('/userPage')
        setFirstName("")
        setLastName("")
        setPassword("")
        setUserName("")

}

  return (
    <>
      <form id="userForm" action="/api/user/new-user" method="post">
        <label htmlFor="firstName">First Name</label>
        <input onChange={(e) => setFirstName(e.target.value)} id="firstName" name="firstName" value={firstName} type="text" />
        <label htmlFor="lastName" >Last Name</label>
        <input onChange={(e) => setLastName(e.target.value)} id="lastName" value={lastName} type="text" name="lastName" />
        <label htmlFor="userName">User Name</label>
        <input onChange={(e) => setUserName(e.target.value)} id="userName" value={userName} type="text" name="userName" />
        <label htmlFor="password">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} id="password" value={password} type="password" name="password" />
        <label htmlFor="userImage" >Add Image</label>
        <input onChange={(e) => setUserImage(e.target.value)} id="userImage" value={userImage} type="file" name="password" />
        <button onClick={handleUser}>Submit</button>      
      </form>

    </>
  )
}

export default UserAdd

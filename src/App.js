import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects  } from '../src/components/redux/features/projectSlice';
import { getUsers } from '../src/components/redux/features/userSlice'
import UserPage from "../src/components/pages/userPage/UserPage";
import IntroPage from "./components/pages/introPage/IntroPage";
import NavBar from './components/navBar/NavBar';
import SignIn from './components/SignIn';
import Home from './components/pages/home/Home';
import Footer from '../src/components/footer/Footer'
import UserAdd from './components/user/UserAdd';



function App() {

    const dispatch = useDispatch();
    const { projects, isError } = useSelector((state) => state.project);
    const { user } = useSelector((state)=>state.project)
    const [register, setRegister] = useState(false)
    const [signButton, setSignButton] = useState(true)
    const [oneProject, setOneProject] = useState([])
    const [userProjects, setUserProjects] = useState([])
    const [groupMemberProjects, setGroupMemeberProjects] = useState([])
    const [openProject, setOpenProject] = useState(false)
    const [openGroupProjects, setOpenGroupProjects] = useState(false)
    const [allUsers, setAllUsers] = useState([])





    useEffect(() => {


        if(isError){
            console.log("error")
        }
        dispatch(getProjects());

        axios.get('http://localhost:5000/api/user')
        .then(({ data }) => {
            setAllUsers(data)
        })
        .catch(err => console.log(err))
              
     
    }, [dispatch] );





    return (
        <>

            <Router>
         
                <Routes>
                  
                        <Route path='/' element={
                            <Home 
                            signButton={signButton}
                            setSignButton={setSignButton}/>
                        }>
                        </Route>

                        <Route path='/UserPage' element={
                            <UserPage 
                            register = {register}
                            setRegister={setRegister}
                            signButton={signButton}
                            setSignButton={setSignButton}
                            setOneProject={setOneProject}
                            oneProject={oneProject}
                            setUserProjects={setUserProjects}
                            userProjects={userProjects}
                            openProject={openProject}
                            setOpenProject={setOpenProject}
                            allUsers={allUsers}
                            setAllUsers={setAllUsers}
                            groupMemberProjects={groupMemberProjects}
                            setGroupMemberProjects={setGroupMemeberProjects}
                            openGroupProjects={openGroupProjects}
                            setOpenGroupProjects={setOpenGroupProjects}
                            OpenGroupProjects={openGroupProjects}
                          
                          
                            />
                        }>
                        </Route>
                        
                        <Route path='/IntroPage' element={
                            <IntroPage 
                            register = {register}
                            setRegister={setRegister}
                            signButton={signButton}
                            setSignButton={setSignButton}
                            setUserProjects={setUserProjects}
                            userProjects={userProjects}
                            />
                        }>
                        </Route>
                        <Route>
                          
                        </Route>

                </Routes>
                <Footer />

            </Router>



        </>
    );
}

export default App;

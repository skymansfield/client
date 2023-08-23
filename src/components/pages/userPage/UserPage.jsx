import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../redux/features/projectSlice';
import ProjectAdd from "../../projects/ProjectAdd";
import Projects from '../../projects/Projects'
import VendorAdd from '../../VendorAdd';
import UserAdd from '../../user/UserAdd';
import SignIn from '../../SignIn';
import NavBar from '../../navBar/NavBar';
import CommentsSection from '../../comments/CommentsSection';
import './userPage.css'


const UserPage = ({ setOpenGroupProjects, openGroupProjects,setGroupMemberProjects, groupMemberProjects, setAllUsers, allUsers, register, setRegister, signButton, setSignButton, setUserProjects, userProjects, setOneProject, oneProject, openProject, setOpenProject, }) => {

    const { isOpen } = useSelector((store) => store.modal)
    const { user } = useSelector((state) => state.user)
    const { projects, isError, isSuccess } = useSelector((state) => state.project);
    const [currentCommentArray, setCurrentCommentArray] = useState([])
    const [projectId, setProjectId] = useState('')
    const [openMyProjects, setOpenMyProjects] = useState(true)
    const [scroll, setScroll] = useState(false)
    const refRef = useRef(null)



    useEffect(() => {
        if (isError) {
            console.log("error")
        }
        if (isSuccess) {
            getProjects()
            setOneProject(projects.filter((item) => (item._id === projectId)))
        }
 
    }, [isError, isSuccess, projects]);


    // useLayoutEffect(() => {

    //     window.addEventListener('scroll', onScroll)
    //     return () => window.removeEventListener('scrool', onScroll)
    // }, [])

    // const topPos = refRef.current.getBoundingClientRect().top
    // console.log(topPos)

    // const onScroll = () => {

    //     const scrollPos = window.scrollY + window.innerHeight
    //     if (topPos < scrollPos) {
    //         console.log("it registers a scroll happened")
    //     }
    // }

    return (
        <>
     
                   
                   {scroll ? <div id="userPageHeader">

</div> : <div id="userPageHeader1">
   
</div>}
<NavBar
                    register={register}
                    setRegister={setRegister}
                    signButton={signButton}
                    setSignButton={setSignButton} />

                 {register && <UserAdd />}
                {isOpen && <SignIn
                    signButton={signButton}
                    setSignButton={setSignButton}
                />}
        <div id="backgroundArea">

            {/* <div ref={refRef} /> */}
    
            <div id="wholeUserPage">
       
     
        
     
                <div id="userPage">
                    <div id="left">
                    <ProjectAdd
                            userProjects={userProjects}
                            setUserProjects={setUserProjects} />
                            <VendorAdd />
         
                    </div>

                    <div id="middle">
                
                        <h1 className="pageHeader">Welcome {user.firstName} to your Project Center</h1>
                   
                        <Projects
                            userProjects={userProjects}
                            setUserProjects={setUserProjects}
                            oneProject={oneProject}
                            setOneProject={setOneProject}
                            openProject={openProject}
                            setOpenProject={setOpenProject}
                            currentCommentArray={currentCommentArray}
                            setCurrentCommentArray={setCurrentCommentArray}
                            projectId={projectId}
                            setProjectId={setProjectId}
                            allUsers={allUsers}
                            setAllUsers={setAllUsers}
                            setGroupMemberProjects={setGroupMemberProjects}
                            groupMemberProjects={groupMemberProjects}
                            openGroupProjects={openGroupProjects}
                            setOpenGroupProjects={setOpenGroupProjects}
                            setOpenMyProjects={setOpenMyProjects}
                            openMyProjects={openMyProjects}
                        />
                    </div>

                    <div id="right">
              
                    <CommentsSection
                          openProject={openProject}
                          setOpenProject={setOpenProject}
                          oneProject={oneProject}
                          setOneProject={setOneProject}
                          userProjects={userProjects}
                          setUserProjects={setUserProjects}
                          currentCommentArray={currentCommentArray}
                          setCurrentCommentArray={setCurrentCommentArray}
                          projectId={projectId}
                          setProjectId={setProjectId}
                          groupMemberProjects={groupMemberProjects}
                          openGroupProjects={openGroupProjects}
                          openMyProjects={openMyProjects}
                   
                          />

                    </div>
                </div>
            </div>
        </div>
        </>

    )

}


export default UserPage

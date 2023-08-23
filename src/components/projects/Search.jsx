import React from 'react';
import { useSelector } from 'react-redux';


const Search = ({setOpenGroupProjects, setOpenProject, setOpenMyProjects, setGroupMemberProjects}) => {
    const { projects} = useSelector((state) => state.project);
    const { user } = useSelector((state) => state.user);

    return (

        <div id="searchBtnDiv">

            <button onClick={()=>{
                setOpenProject(false)
                setOpenMyProjects(true)
                setOpenGroupProjects(false)
                }}className="formButton">My Projects</button>
            <button onClick={()=>{
                        const groupMemberArray = projects.filter((item) => item.projectHelpers.includes(user.userName))
                        setGroupMemberProjects(groupMemberArray)
                     
                setOpenProject(false)
                setOpenMyProjects(false)
                setOpenGroupProjects(true)
                }
                }className="formButton">Group Member Projects</button>
{/*             
            <button className="formButton">Completed Projects</button>
            <button className="formButton">In Progress Projects</button> */}

        </div>



    )


}

export default Search
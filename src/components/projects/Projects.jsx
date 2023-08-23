import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject, getProjects, editProject } from '../redux/features/projectSlice';
import MilestoneAdd from "../../milestones/MilestoneAdd";
import Search from "./Search";
import { convertDate, calculateCost, calculateProgress } from "../functions/Conversion";
import trashWhite from '../../resources/logos/trashWhite.gif'
import './projects.css'
import Milestone from "../../milestones/milestone";

const Projects = ({ setOpenMyProjects, openMyProjects, allUsers, projectId, setProjectId, setUserProjects, userProjects, setOneProject, oneProject, openProject, setOpenProject, currentCommentArray, setCurrentCommentArray, groupMemberProjects, setGroupMemberProjects, setOpenGroupProjects, openGroupProjects }) => {

    const dispatch = useDispatch();

    const { projects, isError, isSuccess } = useSelector((state) => state.project);
    const { user } = useSelector((state) => state.user)
    const [currentMilestones, setCurrentMilestones] = useState([])
    const [newHelper, setNewHelper] = useState("")
    const [milestoneForm, setMilestoneForm] = useState(false)
    // const [allProjects, setAllProjects] = useState([])

    useEffect(() => {

        if (isError) {
            console.log("error")
        }
        if (isSuccess) {
            getProjects()
        }
        const filteredProjects = projects.filter((item) => item.projectOwner === user.userName)
        setUserProjects(filteredProjects)

        // setAllProjects(userProjects.concat(groupMemberProjects).flat())
        // console.log(allProjects, "all")


    }, [isError, isSuccess, projects]);

    const handleOpenProject = (id) => {
        setOneProject(userProjects.filter((item) => (item._id === id)))
        setOpenMyProjects(false)
        setOpenProject(true)
    }
    const handleOpenGroupProject = (id) => {
        setOneProject(groupMemberProjects.filter((item) => (item._id === id)))
        setOpenProject(true)
        setOpenGroupProjects(false)
    }
    const handleAddHelper = (id, helpers) => {

        const helper = {
            _id: id,
            projectHelpers: [...helpers, newHelper]

        };
        dispatch(editProject(helper))

    }

    const handleCompleteDate = (id) => {

        const editedProject = {
            _id: id,
            actualCompletedDate: {
                date: new Date(),
                completedBy: user.userName
            }
        };
        dispatch(editProject(editedProject))
    }

    const handleDelete = (id) => {
        dispatch(deleteProject(id))
    }

    const handleEdit = (id) => {

        const editedProject = {
            _id: id,
            budget: 10000
        };
        dispatch(editProject(editedProject))
    }


    return (
        <>

            <Search
                setOpenProject={setOpenProject}
                openGroupProjects={openGroupProjects}
                setOpenGroupProjects={setOpenGroupProjects}
                setOpenMyProjects={setOpenMyProjects}
                openMyProjects={openMyProjects}
                setGroupMemberProjects={setGroupMemberProjects}
       
            />

            {userProjects.map((project) => {
                return (
                    <>
                        {openMyProjects && (

                            <div id="projectsMap" key={project._id}>
                                <div id="projectsCard">
                                    <div id="projectsHeaderDiv">
                                        <div className="projectBtnDiv">
                                            <button className="projectBtn" onClick={() => {
                                                handleOpenProject(project._id)
                                                setProjectId(project._id)
                                                setCurrentMilestones(project.milestones)
                                                setCurrentCommentArray(project.commentSection)
                                            }}>Open Project</button>
                                            <button className="projectBtn" onClick={() => handleDelete(project._id)}>Delete</button>
                                        </div>
                                        <h1 className="projectTitle">{project.projectName}</h1>
                                    </div>

                                    <div id="projectsInfoDiv">
                                        <div className="dateInfo">
                                        <div>Project Owner: {project.projectOwner}</div>
                                            <div className="projectsInfo">Start Date: {convertDate(project.createdAt)}</div>
                                            <div className="projectsInfo">Due Date: {convertDate(project.projectedCompleteDate)}</div>
                                            <div className="projectsInfo">Completed Date: {convertDate(project.actualCompletedDate.date)}</div>
                                            <div className="projectsInfo">Completed By: {project.actualCompletedDate.completedBy}</div>
                                        </div>
                                        <div className="budgetInfo">
                                            <div className="projectsInfo">Budget: ${project.budget}</div>
                                            <div className="projectsInfo">Actual Cost: ${calculateCost(project.milestones)}</div>
                                        </div>
                                        <div className="progress">
                                            <label htmlFor="progressBar">Progress:</label>
                                            <div className="progressDiv">
                                            <div className="projectsInfo progressBar" style={{width:calculateProgress(project.milestones)}}>{calculateProgress(project.milestones)}</div>  <div class="w3-grey">
                                            </div>
                                            </div>
                                            <div className="projectsInfo">Total Milestones: {project.milestones.length}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        )}
                    </>)
            })}

            {groupMemberProjects.map((group, index) => {
                return (
                    <>
                        {openGroupProjects && (
                            <div id="projectsCard">
                                <div id="projectsHeaderDiv">
                                    <div className="projectBtnDiv">
                                        <button className="projectBtn" onClick={() => {
                                            handleOpenGroupProject(group._id)
                                            setProjectId(group._id)
                                            setCurrentMilestones(group.milestones)
                                            setCurrentCommentArray(group.commentSection)
                                        }}>Open Project</button>
                                        <button className="projectBtn" onClick={() => handleDelete(group._id)}>Delete</button>
                                    </div>
                                    <h1 className="projectTitle">{group.projectName}</h1>
                                </div>

                                <div id ="projectsInfoDiv">
                                    <div className="dateInfo">
                                    <div>Project Owner:<br/>{group.projectOwner}</div>
                                        <div className="projectsInfo">Start Date: {convertDate(group.createdAt)}</div>
                                        <div className="projectsInfo">Due Date: {convertDate(group.projectedCompleteDate)}</div>
                                        <div className="projectsInfo">Completed Date: {convertDate(group.actualCompletedDate.date)}</div>
                                        <div className="projectsInfo">Completed By: {group.actualCompletedDate.completedBy}</div>
                                    </div>
                                    <div className="budgetInfo">
                                        <div className="projectsInfo">Budget: ${group.budget}</div>
                                        <div className="projectsInfo">Actual Cost: ${calculateCost(group.milestones)}</div>
                                    </div>
                                    <div className="progress">
  
                                        <div className="projectsInfo">Total Milestones: {group.milestones.length}</div>
                                        <label htmlFor="progressBar">Progress:</label>
                                            <div className="progressDiv">
                                            <div className="projectsInfo progressBar" style={{width:calculateProgress(group.milestones)}}>{calculateProgress(group.milestones)}</div> 
                                            </div>
                                        <div className="projectsInfo">Total Milestones: {group.milestones.length}</div>
                                    </div>

                                </div>
                            </div>

                        )}
                    </>

                )
            })}

            {oneProject.map((one, index) => {
                return (
                    <>
                        {openProject && (
                            <div id="projectsMap" key={one._id}>
                                <div id="projectsCard">
                                    <div id="projectsHeaderDiv">
                                        <div className="projectBtnDiv">
                                            <button className="taskButtons projectBtn" onClick={() => handleDelete(one._id)}><img className="trashCan" src={trashWhite} /></button>
                                            <button className="taskButtons projectBtn" onClick={() => handleEdit(one._id)} >	<span className="iconButtons">&#9998;</span></button>
                                            <button className="taskButtons projectBtn" onClick={() => { handleCompleteDate(one._id) }}><span className="iconButtons">&#10004;</span></button>
                                        </div>
                                        <h1 className="projectTitle">{one.projectName}</h1>
                                    </div>

                                    <div id="projectsInfoDiv">
                                        <div className="dateInfo milestones">
                                            <div className="projectsInfo">Start Date: {convertDate(one.createdAt)}</div>
                                            <div className="projectsInfo">Due Date: {convertDate(one.projectedCompleteDate)}</div>
                                            <div className="projectsInfo">Completed Date: {convertDate(one.actualCompletedDate.date)}</div>
                                            <div className="projectsInfo">Completed By: {one.actualCompletedDate.completedBy}</div>
                                        </div>
                                        <div className="budgetInfo milestones">
                                            <div className="projectsInfo">Budget: ${one.budget}</div>
                                            <div className="projectsInfo">Actual Cost: ${calculateCost(one.milestones)}</div>
                                        </div>
                                        <div className="progress milestones">
                                        <label htmlFor="progressBar">Progress:</label>
                                            <div className="progressDiv">
                                            <div className="projectsInfo progressBar" style={{width:calculateProgress(one.milestones)}}>{calculateProgress(one.milestones)}</div> 
                                            </div>
                                            <div className="projectsInfo">Total Milestones:{one.milestones.length}</div>
                                        </div>
                                        <div className="helper milestones">

                                            <div>Project Owner:<br/>{one.projectOwner}</div>

                                            <label className="projectLabel" htmlFor="projectHelper">Project Helpers:</label>
                                            {one.projectHelpers.map((helper) => {
                                                return (
                                                    <div>{helper}</div>
                                                )
                                            })}
                                            <select className='selectInput' onChange={(e) => {
                                                setNewHelper(e.target.value)
                                            }}>
                                                {allUsers.map((option, index) => {
                                                    return (
                                                        <option key={index}>{option.userName}</option>
                                                    )
                                                })}
                                            </select>
                                            <button className="formButton" onClick={() => {
                                                handleAddHelper(one._id, one.projectHelpers)

                                            }}>Add Helper</button>
                                        </div>

                                    </div>
                                    <div id="milestonesDiv">
                                        <div className="subHeader">
                                            <div className="subHeader">Milestones</div>
                                            <button className="formButton milestoneButton" onClick={() => setMilestoneForm(true)}>Add Milestone</button>
                                        </div>
                                        {milestoneForm && (
                                            <MilestoneAdd
                                                projectId={projectId}
                                                currentMilestones={currentMilestones}
                                                setCurrentMilestones={setCurrentMilestones}
                                                setOneProject={setOneProject}
                                                oneProject={oneProject}
                                                setMilestoneForm={setMilestoneForm} />

                                        )}


                                    </div>
                                    <div id="milestoneCards">
                                        <Milestone
                                            oneProject={oneProject} />
                                    </div>
                                </div>
                            </div>
                        )}

                    </>)
            })}


        </>
    )
}

export default Projects
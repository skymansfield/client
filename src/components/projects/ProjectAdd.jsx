import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, deleteProject, getProjects, editProjects } from '../redux/features/projectSlice';

const ProjectAdd = ({userProjects,setUserProjects}) => {
    const { user} = useSelector((state) => state.user);
    const { projects, isError, isSuccess } = useSelector((state) => state.project);
    const [projectName, setProjectName] = useState('')
    const [projectLocation, setProjectLocation] = useState('')
    const [projectStart, setProjectStart] = useState('')
    const [projectedCompletedDate, setProjectedCompletedDate] = useState('')
    const [budget, setBudget] = useState(0)
    const [actualCost, setActualCost] = useState('')
    const [projectImages, setProjectImages] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {

        if (isError) {
            console.log("error")
        }
        if (isSuccess) {
            getProjects()
        }
        const filteredProjects = projects.filter((item) => item.projectOwner === user.userName)
        setUserProjects(filteredProjects)

    }, [isError, isSuccess, projectName]);

    const handleCreateProject = (e) => {
        e.preventDefault();
        const newProject = {
            projectName: projectName,
            projectLocation:projectLocation,
            projectedCompleteDate: projectedCompletedDate,
            budget: budget,
            projectImages: projectImages,
            projectOwner: user.userName,
            actualCompletedDate:{
                date:"",
                completedBy:""}

        };
        dispatch(createProject(newProject));
        setProjectName("")
        setProjectLocation("")
        setProjectedCompletedDate("")
        setBudget("")
        setProjectImages("")
        
    };

    return (
        <>
            <div className="formHeader">Add New Project</div>
            <form id="addForm" action="/api/user/new-user" method="post">
                <label className="formLabel" htmlFor="projectName">Project Name</label>
                <input className="formInput" onChange={(e) => setProjectName(e.target.value)} id="projectName" name="projectName" value={projectName} type="text" />
                <label className="formLabel" htmlFor="projectLocation" >Project Location</label>
                <input className="formInput" onChange={(e) => setProjectLocation(e.target.value)} id="projectLocation" value={projectLocation} type="text" name="projectLocation" />
                <label className="formLabel" htmlFor="projectedCompletedDate">Complete By Date</label>
                <input className="formInput" onChange={(e) => setProjectedCompletedDate(e.target.value)} id="projectedCompletedDate" value={projectedCompletedDate} type="date" name="projectedCompletedDate" />
                <label className="formLabel" htmlFor="budget">Budget</label>
                <input className="formInput" onChange={(e) => setBudget(e.target.value)} id="budget" value={budget} type="Number" name="budget" />
                <label className="formLabel" htmlFor="projectImages" >Add Image</label>
                <input className="fileUpload" onChange={(e) => setProjectImages(e.target.value)} id="projectImages" value={projectImages} type="file" name="projectImages" />
                <button className="formButton" onClick={handleCreateProject}>Submit</button>
            </form>
        </>


    )


}

export default ProjectAdd

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { milestoneAdd, getProjects } from '../components/redux/features/projectSlice';
import './milestone.css'

const MilestoneAdd = ({ projectId, setCurrentMilestones,currentMilestones, setMilestoneForm, setOneProject, oneProject}) => {
    const { user} = useSelector((state) => state.user);
    const { projects, isError, isSuccess } = useSelector((state) => state.project);
    const [milestoneName, setMilestoneName] = useState('')
    const [milestoneVendor, setMilestoneVendor] = useState('')
    const [milestoneBudget, setMilestoneBudget] = useState('')
    const [notes, setNotes]= useState()
    const dispatch = useDispatch()

    useEffect(() => {

        if (isError) {
            console.log("error")
        }
        if (isSuccess) {
            getProjects()
            setOneProject(projects.filter((item) => (item._id === projectId)))
            setCurrentMilestones(oneProject[0].milestones)
          
        }
       
    }, [isError, isSuccess, projects, milestoneName]);


    const handleAddMilestone = () => {
  
console.log(user.userImage)
        const milestoneToAdd = {
            milestoneName: milestoneName,
            milestoneVendor: milestoneVendor,
            milestoneBudget: milestoneBudget,
            milestoneActualCost: 0,
            // notes:[{
            //     note:notes,
            //     user:user.userName,
            //     image:user.userImage,
            //     dateAdded: new Date()
            // }],
            completedDate:"",
            completedBy:""

        }

        const newMilestoneArray = [...currentMilestones, milestoneToAdd]
     
        const sendToRedux = {
            milestonesToAdd: newMilestoneArray,
            projectId: projectId
        }
        dispatch(milestoneAdd(sendToRedux))
        setMilestoneForm(false)

    }

    return (
 
            
        <div id="milestonesAddCard">

            <div className="milestoneInputs">
           
                 <div className="milestone1">
                <label className="milestoneLabel" htmlFor="milestoneName">Milestone Name</label>
                <input className="milestoneInput" onChange={(e) => setMilestoneName(e.target.value)} id="milestoneName" name="milestoneName" value={milestoneName} type="text" />
                <label className="milestoneLabel" htmlFor="milestoneBudget">Milestone Budget $</label>
                <input className="milestoneInput" onChange={(e) => setMilestoneBudget(e.target.value)} id="milestoneBudget" value={milestoneBudget} type="Number" name="milestoneBudget" />
                <label className="milestoneLabel" htmlFor="milestoneVendor" >Milestone Vendor</label>
                <input className="milestoneInput" onChange={(e) => setMilestoneVendor(e.target.value)} id="milestoneVendor" value={milestoneVendor} type="text" name="milestoneVendor" />
                <label className="milestoneLabel" htmlFor="notes" >Notes</label>
                <textarea className="milestoneInput notes" onChange={(e) => setNotes(e.target.value)} id="notes" value={notes} type="text" name="notes" col="40"
                row="5" />
                  <button className="milestoneButton formButton" onClick={handleAddMilestone}>Add</button>
                </div>


           
             
                   </div>
                 
               
        </div>
        
  
    
    )


}

export default MilestoneAdd

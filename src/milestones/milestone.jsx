import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editProject } from "../components/redux/features/projectSlice";
import { convertDate } from "../components/functions/Conversion";
import trashWhite from '../resources/logos/trashWhite.gif'

const Milestone = ({ oneProject }) => {

    const { user } = useSelector((state) => state.user)
    const [milestoneComplete, setMilestoneComplete] = useState({})
    const [milestoneActualCost, setMilestoneActualCost] = useState("")
    const [openComplete, setOpenComplete] = useState(false)
    const [openAddNote, setOpenAddNote] = useState(false)
    const [notesArray, setNotesArray] = useState([])
    const [newNote, setNewNote] = useState("")
    const [milestoneNameNotes, setMilestoneNameNotes] = useState("")
    const [updatedNotesMilestone, setUpdatedNotesMilestone] = useState({})
    const dispatch = useDispatch();
    const milestonesArray = oneProject.map((item) => item.milestones).flat()


    const handleOpenComplete = (milestoneName, milestoneVendor, milestoneBudget) => {
        setOpenComplete(true)
        setMilestoneComplete({
            milestoneName: milestoneName,
            milestoneVendor: milestoneVendor,
            milestoneBudget: milestoneBudget,
            notes: notesArray,
            completedDate: new Date(),
            completedBy: user.userName
        })
    }

    const handleDeleteMilestone = (milestoneName) => {
        const updatedArray = milestonesArray.filter((item) => item.milestoneName !== milestoneName)

        const editedMilestones = {
            _id: oneProject[0]._id,
            milestones: updatedArray
        }
        dispatch(editProject(editedMilestones))

    }

    const handleMilestoneComplete = (milestoneName, milestoneVendor, milestoneBudget) => {

        const removedArray = milestonesArray.filter((item) => item.milestoneName != milestoneName)
        const completedMilestone = {

            milestoneName: milestoneName,
            milestoneVendor: milestoneVendor,
            milestoneBudget: milestoneBudget,
            milestoneActualCost: milestoneActualCost,
            notes: notesArray,
            completedDate: new Date(),
            completedBy: user.userName

        };

        const editedMilestones = {
            _id: oneProject[0]._id,
            milestones: [...removedArray, completedMilestone]
        }
        dispatch(editProject(editedMilestones))
        setOpenComplete(false)
    }
    const handleOpenAddNote = (milestoneName, milestoneVendor, milestoneBudget) => {
        setOpenAddNote(true)
        setMilestoneNameNotes(milestoneName)
        setUpdatedNotesMilestone({
            milestoneName: milestoneName,
            milestoneVendor: milestoneVendor,
            milestoneBudget: milestoneBudget,
            notes: notesArray
        })
    }


    const handleAddNote = (milestoneName, milestoneVendor, milestoneBudget) => {

        const addedNote = {
            note: newNote,
            user: user.userName,
            image: user.userImage,
            dateAdded: new Date()
        }
        const updatedNotes = [...notesArray, addedNote]
        const noteAddMilestone = {

            milestoneName: milestoneName,
            milestoneVendor: milestoneVendor,
            milestoneBudget: milestoneBudget,
            milestoneActualCost: 0,
            notes: updatedNotes,

        };
        const index = milestonesArray.findIndex((item) => item.milestoneName === milestoneNameNotes)
        milestonesArray.splice(index, 1, noteAddMilestone)
        const editedNotes = {
            _id: oneProject[0]._id,
            milestones: milestonesArray
        }
        dispatch(editProject(editedNotes))
        setOpenAddNote(false)

    }

    return (
        <>
            {milestonesArray.map((milestone) => {

                return (

                    <div id="milestonesCard">
                        <div id="milestoneTop">
                            <div className="projectTitle">{milestone.milestoneName}</div>
                            <div className="projectBtnDiv">

                                <button onClick={() => { handleDeleteMilestone(milestone.milestoneName) }} className="taskButtons projectBtn"><img className="trashCan" src={trashWhite} /></button>
                                <button className="taskButtons projectBtn">	<span className="iconButtons">&#9998;</span></button>
                                <button onClick={() => {
                                    handleOpenComplete(milestone.milestoneName, milestone.milestoneVendor, milestone.milestoneBudget, milestone.milestoneActualCost)
                                    setNotesArray(milestone.notes.flat())
                                }
                                } className="taskButtons projectBtn complete"><span className="iconButtons">&#10004;</span></button>
                            </div>
                        </div>

                        <div id="milestonesInfoDiv">
                            <div>
                                <div className="projectsInfo">Budget:<br /> ${milestone.milestoneBudget}</div>
                                <div className="projectsInfo">Actual Cost:<br /> ${milestone.milestoneActualCost}</div>
                            </div>
                            <div>
                                <div className="projectsInfo">Completed Date:<br /> {convertDate(milestone.completedDate)}</div>
                                <div className="projectsInfo">By: <br />{milestone.completedBy}</div>
                            </div>
                            <div className="projectsInfo notes">Notes:
                                <button className="formButton" onClick={() => {
                                    handleOpenAddNote(milestone.milestoneName, milestone.milestoneVendor, milestone.milestoneBudget, milestone.milestoneActualCost)
                                    setNotesArray(milestone.notes.flat())
                                }}>Add Note</button>
                            </div>
                            <div id="notesArea" >
                                {milestone.notes.map((notes, index) => {
                                    return (
                                        <div id="notesDiv" key={index}>
                                            <div className="notesDiv">{notes.note}</div>
                                            <div className="notesDiv">{notes.user}</div>
                                            <div className="notesDiv">{convertDate(notes.dateAdded)}</div>


                                        </div>
                                    )

                                })}
                            </div>

                        </div>
                        {openAddNote && (
                            <div id="addNoteDiv">
                                <div onClick={() => setOpenAddNote(false)} className="closeModal">X</div>
                                <div className="projectsInfo">Milestone: {updatedNotesMilestone.milestoneName}</div>
                                <label className="milestoneLabel" htmlFor="notes" >Note</label><br/>
                                <textarea className="noteInput" onChange={(e) => setNewNote(e.target.value)} id="notes" value={newNote} type="text" name="notes" col="40"
                                    row="10" />

                                <button className="formButton" onClick={() => {
                                    handleAddNote(updatedNotesMilestone.milestoneName, updatedNotesMilestone.milestoneBudget, updatedNotesMilestone.milestoneActualCost,)
                                }}>Add</button>
                            </div>
                        )}
                    </div>

                )
            })}

            {openComplete && (
                <div id="completeMilestoneDiv">
                    <div onClick={() => setOpenComplete(false)} className="closeModal">X</div>
                    <div className="projectsInfo">Milestone: {milestoneComplete.milestoneName}</div>
                    <div className="projectsInfo">Budget: $ {milestoneComplete.milestoneBudget}</div>
                    <div className="projectsInfo">Complete Date: {convertDate(milestoneComplete.completedDate)}</div>
                    <div className="projectsInfo">Completed By: {milestoneComplete.completedBy}</div>
                    <label className="milestoneLabel" htmlFor="milestoneActualCost">Actual Cost $</label>
                    <input className="milestoneInput" onChange={(e) => setMilestoneActualCost(e.target.value)} id="milestoneActualCost" value={milestoneActualCost} type="Number" name="milestoneActualCost" />
                    <button className="formButton" onClick={() => { handleMilestoneComplete(milestoneComplete.milestoneName, milestoneComplete.vendor, milestoneComplete.milestoneBudget, milestoneComplete.notes) }}>Confirm Complete</button>
                </div>
            )}


        </>
    )


}

export default Milestone

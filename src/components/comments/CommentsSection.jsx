import React, { useState, useEffect } from 'react'
import { convertDate } from '../functions/Conversion';
import { editProject, getProjects } from "../redux/features/projectSlice";
import { useSelector, useDispatch } from 'react-redux';
import CommentAdd from './CommentAdd';
import "./comments.css"

const CommentsSection = ({ openProject, groupMemberProjects, openGroupProjects, openMyProjects, userProjects,oneProject, setOneProject, projectId, currentCommentArray, setCurrentCommentArray }) => {

    const dispatch = useDispatch();
    const { projects, isError, isSuccess } = useSelector((state) => state.project);
    const [commentDelete, setCommentDelete] = useState('')

    useEffect(() => {

        if (isError) {
            console.log("error")
        }
        if (isSuccess) {
            getProjects()
            setOneProject(projects.filter((item) => (item._id === projectId)))
         
        }

    }, [isError, isSuccess, projects, commentDelete]);

    const handleDeleteComment = () =>{
        const updatedArray = currentCommentArray.filter((item) => item.comment !== commentDelete)
   
      
        const editedComments = {
            _id:projectId,
            commentSection: updatedArray
        }
        dispatch(editProject(editedComments))
        
      }

    return (
        <>
            <div className="formHeader">Project Comments</div>
            {userProjects.map((project, index) => {
                return (
                    <>    
                  
                        {openMyProjects && (
                            <>
                             <h3 className="formLabel">{project.projectName}</h3>
                            <div key={index} id='commentsDiv'>
                          
                                {project.commentSection.map((comments) => {
                                     
                                    return (
                                        <>
                                            <div id="commentInfo">
                                                <span className='comment'>{comments.comment}</span> <br />
                                                <span className='commentDetails'>{convertDate(comments.commentDate)}<span> Made by:{comments.userName}</span><span> <img className='userImage' src={comments.userImage}/></span></span>
                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                            </>

                        )}
                    </>)
            })}
                        {groupMemberProjects.map((group, index) => {
                return (
                    <>    
                  
                        {openGroupProjects && (
                            <>
                             <h3 className="formLabel">{group.projectName}</h3>
                            <div key={index} id='commentsDiv'>
                          
                                {group.commentSection.map((comments) => {
                                     
                                    return (
                                        <>
                                            <div id="commentInfo">
                                                <span className='comment'>{comments.comment}</span> <br />
                                                <span className='commentDetails'>{convertDate(comments.commentDate)}<span> Made by:{comments.userName}</span><span> <img className='userImage' src={comments.userImage}/></span></span>
                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                            </>

                        )}
                    </>)
            })}

            {oneProject.map((project, index) => {
                return (
                    <>
                        {openProject && (
                            <>
                            <h3 className="formLabel">{project.projectName}</h3>
                            <div id="commentAdd">
                            <CommentAdd
                                    projectId={projectId}
                                    currentCommentArray={currentCommentArray}
                                    setCurrentCommentArray={setCurrentCommentArray}
                                    setOneProject={setOneProject}
                                    oneProject={oneProject}
                                />
                                </div>
                            <div key={index} id='commentsDivOne'>       
                                {project.commentSection.map((comments) => {
                                 
                                    return (
                                        <>
                                              <div id="commentInfo">
                                                <span className='comment'>{comments.comment}</span> <br />
                                                <span className='commentDetails'>{convertDate(comments.commentDate)}<span> Made by:{comments.userName}</span><span><img className='userImage' src={comments.userImage}/></span></span>
                                                <button className="formButton" onClick={()=>handleDeleteComment(setCommentDelete(comments.comment))}>Delete</button>
                                            </div>

                                        </>
                                    )
                                })}
                                 </div>
                            </>
                        )}
                    </>)
            })}

        </>
    )
}
export default CommentsSection

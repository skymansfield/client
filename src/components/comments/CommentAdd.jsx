import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProjects,commentAdd } from '../redux/features/projectSlice';


const CommentAdd = ({ projectId, setOneProject, oneProject, currentCommentArray, setCurrentCommentArray }) => {

    const dispatch = useDispatch()
    const { projects, isError, isSuccess } = useSelector((state) => state.project);
    const { user } = useSelector((state) => state.user)
    const [newComment, setNewComment] = useState('')

    
    useEffect(() => {

        if (isError) {
            console.log("error")
        }
        if (isSuccess) {
            getProjects()
            setOneProject(projects.filter((item) => (item._id === projectId)))
            setCurrentCommentArray(oneProject[0].commentSection)
        }

    }, [isError, isSuccess, projects, newComment]);


    const handleAddComment = () => {
    
        const commentToAdd = {
            comment: newComment,
            userName: user.userName,
            userImage: user.userImage,
            date:new Date()
        }
        const newCommentArray = [...currentCommentArray, commentToAdd]
        const sendToRedux = {
            commentsToAdd: newCommentArray,
            projectId: projectId
        }
        dispatch(commentAdd(sendToRedux))
        setNewComment("")

    }


    return (
        <>


            <input id="newComment" className="formInput" name="newComment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                col='30'
                row='10'
            />
            <button id="commentButton" className="formButton" onClick={handleAddComment}>Add Comment</button>


        </>

    )

}

export default CommentAdd
















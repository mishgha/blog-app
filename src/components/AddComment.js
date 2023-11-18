import React, { useState } from 'react'
import { isLoggedIn } from '../authorization';

function AddComment() {

    const [newComment, setNewComment] = useState({
        commentText: ''
    })
    const [login,setLogin] = useState(false);
    const [userDetail,setUserDetail] = useState(undefined);

    const handleAddComment = async () => {

        setLogin(isLoggedIn());
        set

        if(!login)
        {
            console.log("not logged in");
        }

        
        const response = await postNewComment(newComment,postId,userId);
    
        if (response.success) {
            setCommentData(prevData => ({
                ...prevData,
                comments: [...prevData.comments, response.newComment]
            }));
            setNewComment("");
        } else {
            // Handle error
            toast.error("Failed to post comment");
        }
    };

    return (
    <div className="my-4">
    <h2>Add Comment</h2>
    <div className="mb-3">
        <textarea 
            className="form-control" 
            placeholder="Your Comment" 
            //value={newComment}
            //onChange={(e) => setNewComment(e.target.value)}
            rows="4"
        ></textarea>
    </div>
    <button className="btn btn-primary" onClick={handleAddComment}>Post Comment</button>
    </div>
  )
}

export default AddComment
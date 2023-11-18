import React from 'react'
import Base from '../components/Base'
import { useNavigate } from 'react-router-dom'
import { addPost, postForApproval, removePost } from '../services/post-service';
import { useState, useEffect } from 'react';
import { Button, CardBody, CardText, Container } from 'reactstrap';
import { toast } from 'react-toastify';

function PostForApproval() {
    const navigate = useNavigate();
    const [postContent,setPostContent] = useState({
        content : []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await postForApproval();
              setPostContent(data);
              console.log("All posts waiting for approval are: ", data);
            } catch (error) {
              console.error("Error fetching unapproved posts: ", error);
            }
          };
      
          fetchData();
    },[]);

    const handleApprove = async (userId,post) => {
        console.log("User in the post: ", userId);

        //Add post to the original databse
        addPost(userId,post).then((response) => {
            console.log("Post is approved",response);
            toast.success("Post Approved");
        }).catch(error => {
            console.log("error in approving the post", error);
        })
        
        //Remove post from the Post for Approval database
        removePost(post?.postId).then((response) => {
            console.log("Post removed from post for approval databse",response);
        }).catch(error => {
            console.log("Error is removing the post from post for approval database", error);
            toast.error("Error in post aprroval")
        })

        setPostContent((prevContent) => ({
            content: prevContent.content.filter((p) => p.id !== post?.postId)
        }));
        window.location.reload();
    }

    const handleReject = async (postId) => {
        
        //Remove post from the Post for Approval database
        removePost(postId).then((response) => {
            console.log("Post removed from post for approval databsae",response);
            toast.success("Post rejected");
        }).catch(error => {
            console.log("Error is removing the post from post for approval database", error);
            toast.error("Error in post rejection");
        })

        setPostContent((prevContent) => ({
            content: prevContent.content.filter((p) => p.id !== postId)
        }));
        window.location.reload();
      };
  return (
    <Base>
        <div>
            <Container>
                <CardBody>
                    <CardText>
                    <h1>Posts that needs Approval: </h1>
                    {
                    postContent && postContent.content.map((post,index) => (
                        <div key={post?.postId} className="post p-3 border mb-3 rounded bg-white">
                        <div dangerouslySetInnerHTML={{ __html: post?.postText}}>
                        </div>
                        <button onClick={() => handleApprove(post?.userTableByUserId?.userId,post)}>Approve</button>
                        <button onClick={() => handleReject(post?.postId)}>Reject</button>
                        </div>
                    ))
                    }
                    </CardText>
                </CardBody>
                
            </Container>
        </div>
    </Base>
  )
}

export default PostForApproval
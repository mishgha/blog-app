import React from 'react'
import Base from '../components/Base'
import { Container } from 'reactstrap'
import { deletePost, loadAllPosts } from '../services/post-service';
import { useState, useEffect } from 'react';
import { Button, CardText } from 'reactstrap';

function ManagePost() {
    const [postData,setPostData] = useState({content:[]});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const posts = await loadAllPosts();
            setPostData(posts);
            console.log("postData: ", posts);
          } catch (error) {
            console.error("Error in fetchData:", error);
          }
        };
    
        fetchData();
      }, []); 
    
    const handlePostDelete = (postId) =>
    {
        deletePost(postId).then((response) => {
            console.log(response);
            const updatedUserData = postData.filter(post => post?.postId !== postId);
            setUserData(updatedUserData);

        }).catch(error => {
            console.log("Error is deleting the post: ", error);
        })

        window.location.reload();
    }
  return (
    <Base>
        <Container>
        <div>
            <h1>MANAGE POST</h1>
           </div>
           {
            postData?.content?.map((post, index) => (                                  
                <div key={post?.postId} className="post p-3 border mb-3 rounded bg-white">
                    <CardText>
                        Posted By <b>{post?.userTableByUserId?.userEmail}</b>
                    </CardText>
                    <CardText dangerouslySetInnerHTML={{ __html: post?.postText }}>
                    </CardText>
                    <Button onClick={() => handlePostDelete(post?.postId)}>Delete</Button>
                </div>
            ))
           }
        </Container>
    </Base>
  )
}

export default ManagePost
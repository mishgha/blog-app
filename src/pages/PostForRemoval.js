import React from 'react'
import { deletePost, loadAllPosts } from '../services/post-service';
import { useState, useEffect } from 'react';
import Base from '../components/Base';
import { Container } from 'reactstrap';
import {CardBody} from 'reactstrap';
import {CardText} from 'reactstrap';
import { toast } from 'react-toastify';

function PostForRemoval() {
    const [postContent,setPostContent] = useState({
        content : []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await loadAllPosts();
              setPostContent(data);
              console.log("All posts loaded: ", data);
            } catch (error) {
              console.error("Error fetching posts: ", error);
            }
          };
      
          fetchData();
    },[]);

    const handleReject = async (postId) => {

        deletePost(postId).then(response => {
            console.log(response);
            toast.success("Post Deleted");
        }).catch(error => {
            console.log("Error detected in deleting the post ", error)
            toast.error("Error in deleting the post")
        })
        window.location.reload();

    }


  return (
    <Base>
    <div>
        <Container>
            
                <h1>Posts that needs Deletion: </h1>
                {
                    postContent && postContent.content.map((post,index) => (
                        post?.postReport == 1 && (
                            <div key={post?.postId} className="post p-3 border mb-3 rounded bg-white">
                            {
                            
                                <CardBody>
                                    <CardText>
                                        <div>
                                            <div dangerouslySetInnerHTML={{ __html: post?.postText}}></div>
                                            <button onClick={() => handleReject(post?.postId)}>Reject</button>
                                        </div>
                                    </CardText>
                                </CardBody>
                            }
                            </div>
                        )
                    ))
                }
                
        </Container>
    </div>
</Base>
  )
}

export default PostForRemoval
import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Container } from 'reactstrap'
import { getPostByUserId } from '../services/post-service';
import { getCurrentUserDetail } from '../authorization';
import { Button, CardBody, CardText} from 'reactstrap';
import { Link } from 'react-router-dom';


function MyPosts() {
    const [postContent,setPostContent] = useState([])

    const [userId, setUserID] = useState(null);

    useEffect ( () => {
        async function fetchData(){ 

            const user = getCurrentUserDetail();
            console.log("user id: ", user?.userId);
            setUserID(user?.userId);

            const data = await getPostByUserId(user?.userId);

            setPostContent(data);
            console.log("All posts are: ", data);
        }
        
        fetchData();
    },[]);

    const showSuggestion = async (userId,post) => {
        
    }
  return (
    <Base>
        <Container>
        <CardBody>
                    <CardText>
                    <h1>My Posts are: </h1>
                    {
                    postContent && postContent?.map((post,index) => (
                        <div key={post?.postId} className="post p-3 border mb-3 rounded bg-white">
                        <div dangerouslySetInnerHTML={{ __html: post?.postText}}>
                        </div>
                        <Link to={'/user/viewSuggestion/'+post?.postId}>View Suggestions</Link>
                        </div>
                    ))
                    }
                    </CardText>
        </CardBody>
        </Container>
    </Base>
  )
}

export default MyPosts
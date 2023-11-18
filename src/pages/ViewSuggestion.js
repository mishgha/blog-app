import React, { useEffect, useState } from 'react'
import Base from '../components/Base';
import { useParams } from 'react-router-dom';
import { getPostByPostId } from '../services/post-service';
import { Container } from 'reactstrap';
import { getCurrentUserDetail } from '../authorization';
import { loadAllSuggestionsOfPost } from '../services/suggestion-service';
import { loadAllRepliesOfSuggestion } from '../services/reply-service';
import { postNewReplyToSuggestion } from '../services/reply-service';
import { Button } from 'reactstrap';
import { CardBody, CardText } from 'reactstrap';
import { toast } from 'react-toastify';

function ViewSuggestion() {
  const postId = useParams();
  const [post,setPost] = useState(undefined);
  const [userDetail,setUserDetail] = useState(undefined);
  const [suggestionData,setSuggestionData] = useState({suggestions:[]});
  const [replyData,setReplyData] = useState({ replies: [] });
  const [reply,setReply] = useState(false);
  const [newReply, setNewReply] = useState({
    replyText: ''
  })

  useEffect(() => {
    console.log("postId:", postId?.postId);
    const user = getCurrentUserDetail();
    setUserDetail(user);

    const fetchData = async () => {
      try {
        const suggestion = await loadAllSuggestionsOfPost(postId?.postId);
        setSuggestionData(suggestion);
        const response = await getPostByPostId(postId?.postId);
        console.log("The post I have received is: ", response);
        setPost(response);

      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    
    fetchData();
  }, [postId]);


  const showAllReplies = async (suggestionId) => {
    try{
        const data = await loadAllRepliesOfSuggestion(suggestionId);
        setReplyData(data);
        console.log("All replies are: ", data);
        console.log("All replies are in setReplyData", replyData);
        setReply(true);
    }
    catch(error)
    {
        console.log("Error in fetching replies: ", error);
        toast.error("Cannot fetch replies");
    }
  }

  const handleAddReply = async(suggestionId) => {

    console.log("inHandleAddReply(newReply): ", newReply);
    const response = await postNewReplyToSuggestion(newReply,suggestionId,postId?.postId,userDetail?.userId).then((response) => {
        setReplyData(prevData => ({
            ...prevData,
            replies: [...prevData.replies, response.newReply]
        }))
        window.location.reload();
        console.log("inHandleAddReply: ", replyData);
    }).catch(error => {
        console.log(error);
        toast.error("Failed to post reply");
    })
}
  const hideAllReplies = async () => {
    setReply(false);
  }


  return (
    <Base>
      <div>
      {post && (
        <div>
          <Container>
            <h2>Post Details</h2>
            <div dangerouslySetInnerHTML={{ __html: post?.postText}}/>
            <h3> Suggestions:</h3>
              {
                suggestionData?.content?.map((suggestion,index) => (
                  <div key={suggestion?.suggestionId} className="suggestion p-3 border mb-3 rounded bg-white">
                    <p className="mb-1 font-weight-bold">Suggestion: {suggestion?.suggestionText}</p>
                    <Button onClick={() => showAllReplies(suggestion?.suggestionId)}>Show Replies</Button>
                    <Container>
                    <CardBody>
                      <CardText>
                        {
                          reply && 
                            (
                              <>
                              <div className="my-4">
                              <h4>Add Reply</h4>
                                  <div className="mb-3">
                                      <textarea 
                                        className="form-control" 
                                        placeholder="Your Reply" 
                                        value={newReply.replyText}
                                        onChange={(event) => setNewReply({ replyText: event.target.value })}                                        
                                        rows="4"
                                      ></textarea>
                                  </div>
                                  <button className="btn btn-primary" onClick={() => handleAddReply(suggestion?.suggestionId)}>Post Reply</button> 
                                </div>                                             
                                {
                                  replyData.replies.map((reply, index) => (
                                        <div key={reply?.replyId} className="reply p-3 border mb-3 rounded bg-white">
                                        <p>Reply: {reply?.replyText}</p>
                                        </div>
                                  ))
                                }
                              <Button onClick={() => hideAllReplies()}>Hide Replies</Button>
                              </>
                            )   
                        }
                      </CardText>
                    </CardBody>
                  </Container>
                  </div>
                  
                ))
              }
            
          </Container>
        </div>
      )}
      </div>
    </Base>
  )
}
export default ViewSuggestion;
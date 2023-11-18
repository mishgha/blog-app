import React, { useEffect, useState } from 'react'
import Base from '../components/Base';
import { loadPost } from '../services/post-service';
import { Card, CardBody, CardText, Container } from 'reactstrap';
import { addSuggestionToPost, loadAllSuggestionsOfUserOnPost } from '../services/suggestion-service';
import { toast } from 'react-toastify';
import { loadAllRepliesOfSuggestion } from '../services/reply-service';
import { getCurrentUserDetail } from '../authorization';
import { Button } from 'reactstrap';
import { postNewReplyToSuggestion } from '../services/reply-service';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function AddSuggestion() 
{
  const navigate = useNavigate();
  const { postId, userId } = useParams();
  const [post,setPost] = useState(undefined);
  const [newSuggestion,setNewSuggestion] = useState({
    suggestionText:''
  })
  const [suggestionData, setSuggestionData] = useState({ suggestions: [] });
  const [newReply, setNewReply] = useState({
    replyText: ''
  })
  const [replyData, setReplyData] = useState({ replies:[] });
  const [reply, setReply] = useState(false);
  const [userDetail,setUserDetail] = useState(undefined);


  useEffect (()=>{
    const data = loadPost(postId).then(response => {
      setPost(response);
      console.log("the post is: ", response);
    })

    const data1 = loadAllSuggestionsOfUserOnPost(userId,postId).then(response => {
      setSuggestionData(response);
      console.log("the suggestions on this post are: ", response);
    }).catch(error => {
      console.log("cannot print suggestions: ", error);
      toast.error("Error in loading suggestions");
    })

    const user = getCurrentUserDetail();
    setUserDetail(user);

    console.log("In suggestionData: ", suggestionData);

  },[])

  const handleAddSuggestion = async () => {
    console.log("before sending new suggestion is: ", newSuggestion);
    const data = await addSuggestionToPost(userId,postId,newSuggestion).then((response) => {
      setNewSuggestion(response);
      console.log("Response getting after adding suggestion: ",newSuggestion);
      window.location.reload();
    })
  }

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
    const response = await postNewReplyToSuggestion(newReply,suggestionId,postId,userDetail?.userId).then((response) => {
        setReplyData(prevData => ({
            ...prevData,
            comments: [...prevData.comments, response.newReply]
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
      <Container>
        <h1>Suggestions</h1>
        <Card>  
        <CardBody>
        <CardText>
          Posted By <b>{post?.userTableByUserId?.userEmail}</b>
        </CardText>
        <CardText dangerouslySetInnerHTML={{ __html: post?.postText }}>
        </CardText>
        </CardBody>
        <Container>
          <div className="my-4">
            <h2>Add Suggestion</h2>
              <div className="mb-3">
                <textarea 
                className="form-control" 
                placeholder="Your Suggestion" 
                value={newSuggestion.suggestionText}
                onChange={(event) => setNewSuggestion({ suggestionText: event.target.value })}                                        
                rows="4"
                ></textarea>
              </div>
            <button className="btn btn-primary" onClick={() => handleAddSuggestion()}>Post Suggestion</button> 
          </div>
          <div>
            <h3>Your Suggestions:</h3>
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
                                  replyData.replies.map((reply, index) => {
                                    if(reply?.userTableByUserId?.userId == userDetail?.userId || post?.userTableByUserId?.userId === reply?.userTableByUserId?.userId)
                                    {
                                      return(
                                        <div key={reply?.replyId} className="reply p-3 border mb-3 rounded bg-white">
                                        <p>Reply: {reply?.replyText}</p>
                                        </div>
                                      )
                                    }
                                    
                                  })
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
              
          </div>

        </Container>
        </Card>
      </Container>
    
    </div>
    </Base>
  )
}

export default AddSuggestion;
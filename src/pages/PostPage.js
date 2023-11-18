import { Link, useParams, useNavigate } from "react-router-dom";
import Base from "../components/Base";
import { Card, CardBody, CardText, Col, Container, Row, Button,Form } from "reactstrap";
import { useEffect, useState } from "react";
import { loadPost, likePost, unlikePost, reportPost, unReportPost } from "../services/post-service";
import { toast } from "react-toastify";
import { getCurrentUserDetail, isLoggedIn } from "../authorization";
import { loadAllCommentsOfPost } from "../services/comment-service";
import { postNewComment, likeComment, unlikeComment, reportComment, unReportComment } from "../services/comment-service";
import { loadAllRepliesOfComment, postNewReply } from "../services/reply-service";


function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    return date.toLocaleString(undefined, options);
}

const PostPage = () => 
{
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [login, setLogin] = useState(false);
    const [like, setLike] = useState(false);
    const [report,setReport] = useState(false);
    const [commentData, setCommentData] = useState({ comments: [] });
    const [newComment, setNewComment] = useState({
        commentText: ''
    })
    const [newReply, setNewReply] = useState({
        replyText: ''
    })
    const [userDetail,setUserDetail] = useState(undefined);
    const [replyData, setReplyData] = useState({ replies:[] });
    const [reply,setReply] = useState(false);
    const [userId,setUserID] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLogin(isLoggedIn());
            await fetchPost();

            const user = getCurrentUserDetail();
            setUserDetail(user);
            setUserID(user?.userId);
            
            const data = await loadAllCommentsOfPost(postId);
            setCommentData(data);
            console.log("All comments are: ", data);
            console.log("All comments are in setComments: ", commentData);
        }


        
        fetchData();
    }, [postId]);

    const showAllReplies = async (commentId) => {
        try{
            const data = await loadAllRepliesOfComment(commentId);
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

    const hideAllReplies = () => {
        setReply(false);
    }

    const handleCommentLike = async (commentId) => {
        if (login) {
            try {
                await likeComment(commentId); 
                const updatedComments = commentData.comments.map(comment => 
                    comment.commentId === commentId 
                    ? {...comment, commentLike: comment.commentLike + 1} 
                    : comment);
                setCommentData({ comments: updatedComments });
            } catch (error) {
                console.log("Error in liking the comment: ", error);
                toast.error("Unable to like the comment");
            }
        }
        
     
        else {
            navigate("/login");
        }
    };
    
    const handleCommentUnlike = async (commentId) => {
        try {
            await unlikeComment(commentId); 
            const updatedComments = commentData.comments.map(comment => 
                comment.commentId === commentId 
                ? {...comment, commentLike: comment.commentLike - 1} 
                : comment);
            setCommentData({ comments: updatedComments });
            
    
    
        } catch (error) {
            console.log("Error in unliking the comment: ", error);
            toast.error("Unable to unlike the comment");
        }
    
    };

    const handleCommentReport = async (commentId) => {
        if (login) {
            try {
                await reportComment(commentId);
                const updatedComments = commentData.comments.map(comment => 
                    comment.commentId === commentId 
                    ? {...comment, commentReport: comment.commentReport = 1} 
                    : comment); 
                setCommentData({ comments: updatedComments });

            } catch (error) {
                console.log("Error in reporting the comment: ", error);
                toast.error("Unable to report the comment");
            }
        } else {
            navigate("/login");
        }
    };
    
    const handleCommentUnreport = async (commentId) => {
        try {
            await unReportComment(commentId);
            const updatedComments = commentData.comments.map(comment => 
                comment.commentId === commentId 
                ? {...comment, commentReport: comment.commentReport = 0} 
                : comment); 
            setCommentData({ comments: updatedComments });

        } catch (error) {
            console.log("Error in unreporting the comment: ", error);
            toast.error("Unable to unreport the comment");
        }
    };

    const handleAddComment = async () => {

        setLogin(isLoggedIn());

        if(!login)
        {
            navigate("/login");
        }

        console.log("inHandleAddComment(newComment): ", newComment);
        const response = await postNewComment(newComment,postId,userDetail?.userId).then((response) => {
            setCommentData(prevData => ({
                ...prevData,
                comments: [...prevData.comments, response.newComment]
            }));
            
            window.location.reload();
            console.log("inHandleAddComment: ", commentData);
        }).catch(error => {
            console.log(error);
            toast.error("Failed to post comment");
        });
    }

    const handleAddReply = async(commentId) => {
        setLogin(isLoggedIn());
        if(!login)
        {
            navigate("/login");
        }

        console.log("inHandleAddReply(newReply): ", newReply);
        const response = await postNewReply(newReply,commentId,postId,userDetail?.userId).then((response) => {
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

    const fetchPost = () => {
        loadPost(postId).then(data => {
            console.log("In post page: ", data);
            setPost(data);
        }).catch(error => {
            console.log("Was not able to fetch the post by id: ", error);
            toast.error("Not able to load the post");
        });
    };

    const handleLike = () => {
        if (login) {
            likePost(post.postId)
                .then(fetchPost) // Fetch updated post data after liking
                .catch(error => {
                    console.log("Error in liking the post: ", error);
                    toast.error("Unable to like the post");
                });
                setLike(true)
        } else {
            navigate("/login");
        }
    }

    const handleUnLike = () => {
        unlikePost(post.postId)
            .then(fetchPost)
            .catch(error => {
                console.log("Error in unliking the post: ", error);
                toast.error("Unable to unlike the post");
            });
            setLike(false)

    }

    const handleReport = () => {
        if (login) {
            reportPost(post.postId)
                .then(fetchPost => {
                    setReport(true)
                }) // Fetch updated post data after liking
                .catch(error => {
                    console.log("Error in reporting the post: ", error);
                    toast.error("Unable to report the post");
                });
        } else {
            navigate("/login");
        }
    }

    const handleUnReport = () => {
        unReportPost(post.postId)
            .then(fetchPost => {
                setReport(false)
            }) // Fetch updated post data after unliking
            .catch(error => {
                console.log("Error in unrepoting the post: ", error);
                toast.error("Unable to unreport the post");
            });
    }



    return (
        <Base>
            <Container>
                <Row>
                    <Col md={{ size: 12 }}>
                        <Card className="mt-3">
                            <CardBody>
                                <CardText>
                                    Posted By <b>{post?.userTableByUserId?.userEmail}</b> on {formatDate(post?.postTime)};
                                </CardText>
                                <CardText dangerouslySetInnerHTML={{ __html: post?.postText }}>
                                </CardText>

                                {!like && <Button onClick={handleLike}>Like({post?.postLike})</Button>}
                                {like && <Button onClick={handleUnLike} style={{ backgroundColor: 'blue', color: 'white' }}>Liked({post?.postLike})</Button>}

                                {!report && <Button onClick={handleReport}>Report</Button>}
                                {report && <Button onClick={handleUnReport} style={{ backgroundColor: 'red', color: 'white' }}>Reported</Button>}

                                <Link to={'/user/addSuggestion/'+userId+'/'+post?.postId}>Add a suggestion</Link>
                            </CardBody>
                            <Container>
                                <div className="my-4">
                                <h2>Add Comment</h2>
                                <div className="mb-3">
                                    <textarea 
                                        className="form-control" 
                                        placeholder="Your Comment" 
                                        value={newComment.commentText}
                                        onChange={(event) => setNewComment({ commentText: event.target.value })}                                        
                                        rows="4"
                                    ></textarea>
                                </div>
                                <button className="btn btn-primary" onClick={() => handleAddComment()}>Post Comment</button> 
                                </div>
                            </Container>
                            <CardBody>
                                <CardText>
                                    <h3>Comments: </h3>
                                    {  
                                        commentData.comments?.map((comment, index) => (
                                            
                                            <div key={comment?.commentId} className="comment p-3 border mb-3 rounded bg-white">
                                                <p className="mb-1 font-weight-bold">Comment: {comment?.commentText}</p>
                                                <p className="mb-1 text-muted small">Posted on: {formatDate(comment?.commentTime)}</p>
                                                    
                                                <Button onClick={() => handleCommentLike(comment?.commentId)}>Like({comment?.commentLike})</Button>
                                                <Button onClick={() => handleCommentUnlike(comment?.commentId)} /*style={{ backgroundColor: 'blue', color: 'white' }}*/>unLike</Button>

                                                <Button onClick={() => handleCommentReport(comment?.commentId)}>Report({comment?.commentReport})</Button>
                                                <Button onClick={() => handleCommentUnreport(comment?.commentId)} /*style={{ backgroundColor: 'red', color: 'white' }}*/>unReport</Button>
                                                <div>
                                                <Button onClick={() => showAllReplies(comment?.commentId)}>Show Replies</Button>
                                                </div>
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
                                                                    <button className="btn btn-primary" onClick={() => handleAddReply(comment?.commentId)}>Post Reply</button> 
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
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default PostPage;
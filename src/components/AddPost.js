import { Button, Card, CardBody, Container, Input, Label } from "reactstrap";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { createPost as doCreatePost} from "../services/post-service"
import { getCurrentUserDetail } from "../authorization";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const AddPost = () => {

    const editor = useRef(null);
    const [content,setContent] = useState('');
    const [user,setUser] = useState(undefined);
    const navigate = useNavigate();
    const [post, setPost] = useState({
        postText: '',
    })

    useEffect( () => {
        const userDetail = getCurrentUserDetail();
        setUser(userDetail);
    }, []);

    const fieldChanged = (event)=>{
        setPost({...post,'postText':event});
    }

    const createPost = (event) => {
        event.preventDefault();
        if(post.postText.trim() == '')
        {
            alert("Post content is required");
            return;
        }

        //submit the form on the server
        post['userId'] = user.userId;
        console.log(post)
        doCreatePost(post).then((event) => {
            toast.success("Post submitted for approval")
        }).catch((error)=>{
            toast.error("Post not created due to some error");
            console.log("Error in adding post on the server: ", error);
        })

        navigate('/home');

    }

    return (
        <div className="wrapper">
            <h1>User Dashboard</h1>
            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    <h3>What's going on in your mind?</h3>
                    <form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title">Post Text</Label>
                            <JoditEditor
                            ref = {editor}
                            value = {content}
                            onChange = {fieldChanged}
                            />
                        </div>

                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="primary">Post</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset</Button>
                        </Container>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost;
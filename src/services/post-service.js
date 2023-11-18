import { privateAxios } from "./helper"
import { myAxios } from "./helper";

//adding posts to the server
export const createPost = (postData) => {
    return privateAxios
    .post(`/user/${postData.userId}/add-post-for-approval`,postData)
    .then(response => response.data);
};

//get all posts from the server
export const loadAllPosts=(pageNumber=0,pageSize=50)=>{
    return myAxios
    .get(`/home?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data);
};

//load single post from given ID
export const loadPost = (postId) => {
    console.log("In post-service: ", postId);
    const resp = myAxios
    .get("/posts/"+postId)
    .then((response)=>response.data);

    console.log("In Post-service: ", resp);
    return resp;
};

//like Post
export const likePost = (postId) => {
    return privateAxios
    .post(`/post/${postId}/like`)
    .then((response) => response.data);
};

//unlike Post
export const unlikePost = (postId) => {
    return privateAxios
    .post(`/post/${postId}/unlike`)
    .then((response) => response.data);
}

//report Post
export const reportPost = (postId) => {
    const resp = privateAxios
    .post(`/post/${postId}/report`)
    .then((response) => response.data);

    console.log("in post service reported post: ", resp);

    return resp;
};

//unreport Post
export const unReportPost = (postId) => {
    const resp = privateAxios
    .post(`/post/${postId}/unreport`)
    .then((response) => response.data);

    console.log("in post service unreported post: ", resp);
    
    return resp;
};

//getting all posts which need approval
export const postForApproval = () => {
    const resp = privateAxios
    .get('/all-unapproved-posts')
    .then((response) => response.data);

    console.log("in post service get all unapproved posts: ", resp);

    return resp;
}

//adding post to original post database
export const addPost = (userId,postData) => {
    return privateAxios
    .post(`/user/${userId}/add-post`,postData)
    .then(response => response.data);
}

//removing the post from the post for approval database
export const removePost = (postId) => {
    return privateAxios
    .delete(`/post/${postId}/reject-post`)
    .then(response => response.data);
}

//deleting the post
export const deletePost = (postId) => {
    return privateAxios
    .delete(`/post/${postId}/delete-post`)
    .then((response) => response.data);
}

//get posts by user Id
export const getPostByUserId = (userId) => {
    return privateAxios
    .get(`/user/${userId}/all-posts`)
    .then(response => response.data);
}

//get Post by post Id
export const getPostByPostId = (postId) => {
    return privateAxios
    .get(`/posts/${postId}`)
    .then(response => response.data);
}


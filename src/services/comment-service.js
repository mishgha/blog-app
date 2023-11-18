import { myAxios, privateAxios } from "./helper";

//get all comments from the server
export const loadAllCommentsOfPost=(postId)=>{
    return myAxios
    .get(`/post/${postId}/all-comments`)
    .then((response) => response.data);
};

export const postNewComment = (newComment,postId,userId) => {

    const payload = {
        commentText: newComment.commentText
    };
    
    const resp = privateAxios
    .post(`/user/${userId}/post/${postId}/add-comment`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log("Sending comment:", payload);

    return resp;
}

export const likeComment = (commentId) => {
    return privateAxios
    .post(`/comment/${commentId}/like`)
    .then((response) => response.data);
}

export const unlikeComment = (commentId) => {
    return privateAxios
    .post(`/comment/${commentId}/unlike`)
    .then((response) => response.data);
}

export const reportComment = (commentId) => {
    return privateAxios
    .post(`/comment/${commentId}/report`)
    .then((response) => response.data);
}

export const unReportComment = (commentId) => {
    return privateAxios
    .post(`/comment/${commentId}/unreport`)
    .then((response) => response.data);
}
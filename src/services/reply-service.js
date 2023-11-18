import { myAxios, privateAxios } from "./helper";

//get all replies from the server
export const loadAllRepliesOfComment = (commentId)=>{
    return myAxios
    .get(`/comment/${commentId}/all-replies`)
    .then((response) => response.data);
};

//get all replies from the server of suggestion
export const loadAllRepliesOfSuggestion = (suggestionId) => {
    return privateAxios
    .get(`/suggestion/${suggestionId}/all-replies`)
    .then((response) => response.data);
}

export const postNewReplyToSuggestion=(newReply,suggestionId,postId,userId) => {
    return privateAxios
    .post(`/user/${userId}/post/${postId}/suggestion/${suggestionId}/add-reply`,newReply)
    .then((response) => response.data);
}

export const postNewReply = (newReply,commentId,postId,userId) => {

    const payload = {
        replyText: newReply.replyText
    };
    
    const resp = privateAxios
    .post(`/user/${userId}/post/${postId}/comment/${commentId}/add-reply`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log("Sending reply:", payload);

    return resp;
}
import { myAxios, privateAxios } from "./helper";

//get all suggestions from the server of the post
export const loadAllSuggestionsOfPost = (postId)=>{
    return myAxios
    .get(`/post/${postId}/get-suggestions`)
    .then((response) => response.data);
};

//add suggestions to the post
export const addSuggestionToPost = (userId,postId,suggestionData) => {
    return privateAxios
    .post(`/user/${userId}/post/${postId}/add-suggestion`,suggestionData)
    .then((response) => response.data);
};

export const loadAllSuggestionsOfUserOnPost = (userId,postId) => {
    return privateAxios
    .get(`/user/${userId}/post/${postId}/get-suggestion`)
    .then((response) => response.data);
}
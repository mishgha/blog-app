import { myAxios, privateAxios } from "./helper";

export const signup = (user) => {
    return myAxios
    .post('/auth/signup', user)
    .then((response) => response.data);
};


export const login = (loginDetail) => {
    return myAxios
      .post('/auth/login', loginDetail)
      .then((response) => {
        console.log('Login response:', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Login error:', error); 
        throw error; 
      });
};

export const updateUser = (user) => {
    return privateAxios
    .put(`/user/${user.userId}/update-user`,user)
    .then((response) => {
      console.log("Update response: ", response.data)
      return response.data
    }).catch((error) => {
      console.log("updation error");
      throw error;
    })
}

export const loadAllUsers = () => {
  const data = privateAxios
  .get(`/user/all-users`)
  .then((response) => response.data);1

  console.log("data receiving is user-service: ", data);

  return data;
}

export const deleteUser = (userId) => {
  return privateAxios
  .delete(`/user/${userId}/delete-user`)
  .then((response) => response.data);
}
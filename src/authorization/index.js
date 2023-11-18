//authentication => isLoggedIn
export const isLoggedIn = () => {
    const data = localStorage.getItem("data")
    if(data == null) {
        return false;
    } else {
        return true;
    }
};

//doLogin=> data => set to localstorage
export const doLogin = (data,next) => {
    localStorage.setItem("data",JSON.stringify(data))
    next();
};

//doLogout=> data => remove from localstorage
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
};

//getCurrentUser
export const getCurrentUserDetail = () => {
    if(isLoggedIn()){
        const data = JSON.parse(localStorage.getItem("data"))?.userDto;
        return data;
    } else {
        return undefined;
    }
}

//isAdmin
export const isAdmin = () => {
    const userDetail = getCurrentUserDetail();
    const userRoles = userDetail?.userRoles;

    if(userRoles?.includes('ROLE_ADMIN'))
    {
        console.log("role: " , userRoles);
        console.log("going to admin dashboard");
        return true;
    } else {
        return false;
    }
}

//isUser
export const isUser = () => {
    const userDetail = getCurrentUserDetail();
    const userRoles = userDetail?.userRoles;

    if(userRoles?.includes('ROLE_USER'))
    {
        return true;
    } else {
        return false;
    }
}

//isModerator
export const isModerator = () => {
    const userDetail = getCurrentUserDetail();
    const userRoles = userDetail?.userRoles;

    if(userRoles?.includes('ROLE_MODERATOR'))
    {
        return true;
    } else {
        return false;
    }
}

//getToken
export const getToken = () => {
    if(isLoggedIn())
    {
        const tokenData = JSON.parse(localStorage.getItem("data"))?.token;
        return tokenData;
    } else {
        return null;
    }
}
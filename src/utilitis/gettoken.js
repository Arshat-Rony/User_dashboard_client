import jwt_decode from "jwt-decode";

const gettoken = () => {
    const token = localStorage.getItem('token')
    const user = jwt_decode(token)
    return user
};

export {
    gettoken
}


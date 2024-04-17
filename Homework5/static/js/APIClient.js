import HTTPClient from "./HTTPClient.js";

const API_BASE = `/api`;


const getCurrentUser = () => {
    return HTTPClient.get(`${API_BASE}/users/current`);
};

const logIn = (username, password) => {
    console.log(username, password)
    const data = {
      username: username,
      password: password
    }
    return HTTPClient.post(`${API_BASE}/users/login`, data);
};
  
const logOut = () => {
    return HTTPClient.post(`${API_BASE}/users/logout`, {});
};

export default {
    getCurrentUser,
    logIn,
    logOut
};
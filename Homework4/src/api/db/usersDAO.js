let users = require('./data/users.json');

//This file mimics making asynchronous request to a database

module.exports = {
    // "Authenticating" a user. 
    // For this assignment, just receive a username and verify that it corresponds to one of the existing users to grant access.
    // make sure that it always find the user
    // if it doesn't find the user, reject the promise

    authenticate: (username) => {
        return new Promise((resolve, reject) => {
            const user = Object.values(users).find(user => user.username === username);
            if(user) {
                resolve(user);
            }
            else {
                reject();
            }
        });
    },

   


    // getting a specific user's object
    getUser: (user_id) => {
        return new Promise((resolve, reject) => {
            console.log(user_id);
            const user = Object.values(users).find(user => user.id === user_id);
            console.log(user);
            if(user) {
                resolve(user);
            }
            else {
                reject();
            }
        });
    },

    getUsers: () => {
        return new Promise((resolve, reject) => {
            resolve(Object.values(users));
        });
    },

    logoutUser: (userId) => {
        return new Promise((resolve, reject) => {
            console.log(userId);
            const user = Object.values(users).find(user => user.id === userId);
            console.log(user);
            if(user) {
                resolve(user);
            }
            else {
                reject();
            }
        });
    }

   
};
let howls = require('./data/howls.json');


//This file mimics making asynchronous request to a database

module.exports = {
    // create a new howl
    createHowl : (howl) => {
        
        return new Promise((resolve, reject) => {
            // Get the largest id and increment by 1
            let id = howls.length + 1;
            // Create the new howl object
            const newHowl = {
                id: id,
                userId: howl.userId,
                datetime : howl.datetime,
                text : howl.text,
            };
            // Add the new howl to the howls object
            howls.push(newHowl);
            resolve(newHowl);
        });
    },


    // get all howls
    getHowls : () => {
        return new Promise((resolve, reject) => {
            resolve(howls);
        });
    },  


    // getting a howl posted by a specific user
    // userId is the id of the user who posted the howl
    // make sure the newly added howls are displayed first
    
    getHowlsByUserId : (userId) => {
        return new Promise((resolve, reject) => {
            const howlsByUserId = howls.filter(howl => howl.userId === userId).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
            if(howlsByUserId) {
                resolve(howlsByUserId);
            }
            else {
                reject();
            }
        });
    },
};
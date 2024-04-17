let userFollowing = require('./data/follows.json');
let howls = require('./data/howls.json');
let users = require('./data/users.json');


// "1": {
//     "userId": 1,
//     "following": [
//       24,
//       6,
//       7
//     ]
//   },

module.exports = {
    // Getting howls posted by all users followed by the "authenticated" user
    // makr sure the newly added howls are displayed first
    getHowlsByFollowing: (userId) => {
        return new Promise((resolve, reject) => {
            // gets ids of the users followed by the "authenticated" user
            const userfollowingIds = userFollowing[userId].following;
            // get list of howls posted by the users followed by the "authenticated" user
            const followingHowls = howls.filter(howl => userfollowingIds.includes(howl.userId)).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
            if(followingHowls) {
                resolve(followingHowls);
            }
            else {
                reject();
            }
        });
    },


    // Getting the list of users followed by a specific user
    getFollowingByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            // gets ids of the users followed by the "authenticated" user
            const userfollowingIds = userFollowing[userId].following;
            // get list of users through their ids
            const following = Object.values(users).filter(user => userfollowingIds.includes(user.id));
            if(following) {
                resolve(following);
            }
            else {
                reject();
            }
           
        });
    },

    //Following a user
    followUser: (userId, followingId) => {
        return new Promise((resolve, reject) => {
            userFollowing[userId].following.push(followingId);
            resolve(userFollowing[userId].following);
        });
    },

    //Unfollowing a user
    unfollowUser: (userId, followingId) => {
        return new Promise((resolve, reject) => {
            // removes the id of the user being unfollowed from the list of users followed by the "authenticated" user
            userFollowing[userId].following = userFollowing[userId].following.filter(id => id !== followingId);
            resolve(userFollowing[userId].following);
        });
    },

    isFollowing :(userId, followingId) => {
        return new Promise((resolve, reject) => {
            // checks if the user is following the user with the followingId
            const isFollowing = userFollowing[userId].following.includes(followingId);
            resolve(isFollowing);
        });
    },

    // "1": {
//     "userId": 1,
//     "following": [
//       24,
//       6,
//       7
//     ]
//   },
    



    


};
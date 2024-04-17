const API_BASE = '/api';

function checkResponse(res) {
    if(!res.ok) {
      throw new Error("There was an error in fetch");
    }
    return res;
  }
  
function handleError(error) {
    console.log("ERROR", error);
    throw error;
}

// authenticate user
const authenticate = (username) => {
    return fetch(API_BASE+'/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({username: username})
    })
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

// get the currently authenticated user's object
const getUser = (username) => {
    return fetch(API_BASE+'/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username})
    })
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
}

//Getting a specific user's object
const getUserById = (userId) => {
    return fetch(API_BASE+`/users/${userId}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

const getUsers = () => {
    return fetch(API_BASE+'/users')
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
}

// creating a new howl
const createHowl = (howl) => {
    return fetch(API_BASE+'/howl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(howl)
    })
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

// getting a howl posted by a specific user
const getHowlsByUserId = (userId) => {
    return fetch(API_BASE+`/howls/${userId}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

// Getting howls posted by all users followed by the "authenticated" user
// apiRouter.get('/howls/following/:userId', (req, res) => {
const getHowlsByFollowing = (userId) => {
    return fetch(API_BASE+`/howls/following/${userId}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

// // Getting the list of users followed by a specific user
// apiRouter.get('/following/:userId', (req, res) => 
const getFollowing = (userId) => {
    return fetch(API_BASE+`/following/${userId}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

// apiRouter.post('/follow/:userId/:followingId', (req, res) => 
const followUser = (userId, followingId) => {
    return fetch(API_BASE+`/follow/${userId}/${followingId}`, {
        method: 'POST'
    })
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

// given the userId and the id of the user to be unfollowed
// apiRouter.post('/unfollow/:userId/:followingId', (req, res) => {

const unfollowUser = (userId, followingId) => {
    return fetch(API_BASE+`/unfollow/${userId}/${followingId}`, {
        method: 'POST'
    })
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};

//check if the user is following the user with the followingId
const isFollowing = (userId, followingId) => {
    return fetch(API_BASE+`/isfollowing/${userId}/${followingId}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
};


const getHowls = () => {
    return fetch(API_BASE+'/howls')
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
}

const logoutUser = (userId) => {
    return fetch(API_BASE+`/logout/${userId}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .catch(handleError);
}

export default {
    authenticate,
    getUser,
    getUserById,
    getUsers,
    createHowl,
    getHowlsByUserId,
    getHowlsByFollowing,
    getFollowing,
    followUser,
    unfollowUser,
    getHowls,
    logoutUser,
    isFollowing
}
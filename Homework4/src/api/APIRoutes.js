const express = require('express');
const apiRouter = express.Router();
/************\
* API ROUTES *
\************/

const usersDAO = require('./db/usersDAO');
const howlsDAO = require('./db/howlsDAO');
const followsDAO = require('./db/followsDAO');


apiRouter.use(express.json()); 

// authenticate user : working

apiRouter.post('/authenticate', (req, res) => {     
    const username = req.body.username;
    usersDAO.authenticate(username).then(user => {
        console.log("k ", user)
        res.json(user);
    }
    )
    .catch(err => {
        console.log("e ", err);
        res.status(401).json({error: 'Unauthorized'});
    }
    );
});

// logout authenticated user through a userId
apiRouter.post('/logout', (req, res) => {
    const userId = req.body.userId;
    usersDAO.logout(userId).then(user => { 
        res.json(user);
    })
    .catch(err => {
        res.status(401).json({error: 'Unauthorized'});
    });
});





//Getting a specific user's object

apiRouter.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    usersDAO.getUser(userId).then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

apiRouter.get('/users', (req, res) => {
    usersDAO.getUsers().then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// creating a new howl
apiRouter.post('/howl', (req, res) => {
    const howl = req.body;
    howlsDAO.createHowl(howl).then(howl => {
        res.json(howl);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// getting a howl posted by a specific user
apiRouter.get('/howls/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    howlsDAO.getHowlsByUserId(userId).then(howls => {
        res.json(howls);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// Getting howls posted by all users followed by the "authenticated" user
apiRouter.get('/howls/following/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    followsDAO.getHowlsByFollowing(userId).then(howls => {
        res.json(howls);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// get all howls
apiRouter.get('/howls', (req, res) => {
    howlsDAO.getHowls().then(howls => {
        res.json(howls);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});



// Getting the list of users followed by a specific user
apiRouter.get('/following/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    followsDAO.getFollowingByUserId(userId).then(following => {
        res.json(following);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// following and Unfollowing a user
// given the userId and the id of the user to be followed
// "4": {
//     "userId": 4,
//     "following": [
//       23,
//       13,
//       16,
//       7
//     ]
//   },
apiRouter.post('/follow/:userId/:followingId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const followingId = parseInt(req.params.followingId);
    followsDAO.followUser(userId, followingId).then(following => {
        res.json(following);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// given the userId and the id of the user to be unfollowed
apiRouter.post('/unfollow/:userId/:followingId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const followingId = parseInt(req.params.followingId);
    followsDAO.unfollowUser(userId, followingId).then(following => {
        res.json(following);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// check if the user is following another user
apiRouter.get('/isfollowing/:userId/:followingId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const followingId = parseInt(req.params.followingId);
    followsDAO.isFollowing(userId, followingId).then(isFollowing => {
        res.json(isFollowing);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

module.exports = apiRouter;

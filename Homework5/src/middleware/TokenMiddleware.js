const crypto = require('crypto');

const TOKEN_COOKIE_NAME = "NCParksToken";
const API_SECRET = process.env.API_SECRET;
console.log(API_SECRET);

exports.TokenMiddleware = (req, res, next) => { 
  let token = req.cookies[TOKEN_COOKIE_NAME] || null;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1].trim();
  }

  if (!token) {
    return res.status(401).json({error: 'Not authenticated'});
  }

  try {
    // split back into header, payload, and signature
    const parts = token.split('.');
    // decode the header, payload, and signature by converting from base64 to utf-8
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
    const signature = parts[2];
    // create a new HMAC by hashing the header and payload with the API_SECRET
    const hmac = crypto.createHmac('sha256', API_SECRET);
    hmac.update(parts[0] + '.' + parts[1]);
    // create a new signature by encoding the HMAC in base64 and replacing characters
    const computedSignature = hmac.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    if (signature !== computedSignature) {
      throw new Error("Invalid token");
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token expired");
    }
    // set the user in the request object to the payload user
    req.user = payload.user;
    next();
  } catch (err) {
    res.status(401).json({error: 'Invalid token'});
  }
};

exports.generateToken = (req, res, user) => {
  const payload = {
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      avatar: user.avatar
    },
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // encode the header and payload in base64 and replace characters
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  // create a new hashed based message authentication code (HMAC) with the API_SECRET
  const hmac = crypto.createHmac('sha256', API_SECRET);
  // update the HMAC with the encoded header and payload
  hmac.update(encodedHeader + '.' + encodedPayload);
  // create a new signature by encoding the HMAC in base64 and replacing characters
  const signature = hmac.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  // create a new token by concatenating the encoded header, payload, and signature
  const token = `${encodedHeader}.${encodedPayload}.${signature}`;

  // set the token as a cookie with the name NCParksToken
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000
  });
};

exports.removeToken = (req, res) => {
  // remove the token by setting the cookie to an empty string and setting the max age to -360000
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000
  });
};

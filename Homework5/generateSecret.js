const fs = require('fs');
const crypto = require('crypto');

// Generate a random API secret key
const apiSecretKey = crypto.randomBytes(32).toString('hex');

// Write the API secret key to the .env file
fs.writeFileSync('.env', `API_SECRET=${apiSecretKey}\n`, 'utf8');

console.log('Generated API secret key and written to .env file.');
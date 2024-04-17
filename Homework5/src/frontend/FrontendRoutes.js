const express = require('express');
const frontendRouter = express.Router();

const path = require('path');
// Designate the static folder as serving static resources
frontendRouter.use(express.static('static'));
frontendRouter.use(express.urlencoded({extended: true}));
const html_dir = path.join(__dirname, '../../templates/');

/*****************\
* FRONTEND ROUTES *
\*****************/

frontendRouter.get('/login', (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});


frontendRouter.get('/', (req,  res) => {
  res.sendFile(`${html_dir}homepage.html`);
});

module.exports = frontendRouter;
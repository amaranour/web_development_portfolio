const express = require('express');
const frontendRouter = express.Router();

// Designate the static folder as serving static resources
frontendRouter.use(express.static('static'));

const path = require('path');
const html_dir = path.join(__dirname, '../../templates/');

frontendRouter.get('/', (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

frontendRouter.get('/mainpage', (req,  res) => {
  res.sendFile(`${html_dir}mainpage.html`);
});

frontendRouter.get('/userprofile', (req, res) => {
  res.sendFile(`${html_dir}userprofile.html`);
});

module.exports = frontendRouter;
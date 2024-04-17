const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 80;

const html_path = __dirname + '/templates/'; // HTML files folder
// Configure Multer for file uploads
const upload = multer({ dest: 'static/file_uploads' });


// Set up Middleware
app.use(express.static('static'));
// module needed for interacting with the file system
const fs = require('fs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to display form (assuming you're serving an HTML file with your form)
app.get('/', (req, res) => {
    res.sendFile(html_path + 'form.html');
});

// Route to handle form submission
app.post('/send', upload.single('myfile'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    
    

    // Array to collect error messages
    let errors = [];

    // Validate image upload
    if (!req.file) errors.push("Please select an image.");

    // Validate sender's first and last names
    if (!req.body.sender_firstname) errors.push("Sender's first name is required.");
    if (!req.body.sender_lastname) errors.push("Sender's last name is required.");

    // Validate recipient's first and last names
    if (!req.body.recipient_firstname) errors.push("Recipient's first name is required.");
    if (!req.body.recipient_lastname) errors.push("Recipient's last name is required.");

    // Validate message length
    if (!req.body.message || req.body.message.length < 10) errors.push("Message is required and must be at least 10 characters long.");

    // Validate email if email notification is selected
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (req.body.notify === 'email' && (!req.body.email || !emailRegExp.test(req.body.email))) errors.push("Invalid or missing email.");
    const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    // Validate phone number if SMS notification is selected
    if (req.body.notify === 'sms' && (!req.body.phone || !phoneRegExp.test(req.body.phone))) errors.push("Phone number is required for SMS notification.");

    // Validate payment information
    if (!req.body.card_type || !req.body.card_number || !req.body.expiration_date || !req.body.ccv || !req.body.amount || !req.body.terms) errors.push("All payment information is required.");

    // Validate card number format (simplified example)
    if (!req.body.card_number.match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) errors.push("The card number format is invalid.");

    // Validate expiration date is not in the past
    let inputDate = new Date(req.body.expiration_date);
    let today = new Date();
    if (inputDate < today) errors.push("The entered date is expired.");

    // Validate CCV (simplified example)
    if (!req.body.ccv.match(/^\d{3,4}$/)) errors.push("The CCV must be a 3 or 4 digit number.");

    // Validate amount is a number (can include decimals)
    if (isNaN(parseFloat(req.body.amount))) errors.push("The amount must be a number and can include decimal values.");

    // Check for errors and respond accordingly
    if (errors.length > 0) {
        res.sendFile(html_path + 'error.html');
    }
    const bannedUsers = ["Stu Dent", "Stuart Dent"];



    if (bannedUsers.includes(req.body.recipient_firstname) || bannedUsers.includes(req.body.recipient_lastname)) {
         // If there's an uploaded file, delete it
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Failed to delete uploaded file for banned user:", err);
                }
                console.log("Uploaded file deleted for banned user.");
            });
        }
            res.sendFile(html_path + 'error.html');
    } else {
        res.sendFile(html_path + 'success.html');
    }

    

    
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

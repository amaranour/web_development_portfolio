document.addEventListener('DOMContentLoaded', function() {
    
    const x = document.querySelector("#imginput")
    
    x.addEventListener('change', event =>{
        /**
         * This function is used to preview the image that is chosen by the user
         *  it handle the file selection changes 
         * it retrieves the selected file and creates a FileReader object, and
         * assigns its onload event handler
         */
       
            var input = event.target;
            
            var image = document.getElementById('preview');
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    image.src = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            } 
    });

    // input validation

    const imageInput = document.querySelector("#imginput");
    
    const form = document.querySelector('form');
    const sender_firstname = document.querySelector('#sender_firstname');
    const sender_lastname = document.querySelector('#sender_lastname');
    const recipient_firstname = document.querySelector('#recipient_firstname');
    const recipient_lastname = document.querySelector('#recipient_lastname');
    const message = document.querySelector('#story');
    const recipient_email_radio = document.querySelector('#email');
    const recipient_sms_radio = document.querySelector('#sms');
    const do_not_notify_radio = document.querySelector('#do_not_notify');
    const email = document.querySelector('#email_input');
    const phone = document.querySelector('#phone_number');
    const visa_card = document.querySelector('#card_type');
    const card_number = document.querySelector('#card_number');
    const expiration_date = document.querySelector('#expiration_date');
    const ccv = document.querySelector('#ccv');
    const amount_sent = document.querySelector('#amount');
    const check_box = document.querySelector('#terms');
    const submit_button = document.querySelector('#submit_button');
    const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneRegExp = "[0-9]{3}-[0-9]{3}-[0-9]{4}";
    form.addEventListener("submit", e => {
        console.log("submitting form");
        if (imageInput.files.length < 1) {
            alert("Please select an image");
             e.preventDefault();
        }
        if (sender_firstname.value.length < 1 ) {
            alert("Sender's first name is required");
            e.preventDefault();
        }
        if (sender_lastname.value.length < 1) {
            alert("Sender's last name is required");
            e.preventDefault();
        }
        if (recipient_firstname.value.length < 1) {
            alert("Recipient's first name is required");
            e.preventDefault();
        }
        if (recipient_lastname.value.length < 1) {
            alert("Recipient's last name is required");
            e.preventDefault();
        }
        if (message.value.length < 10 ) {
            alert("Message is required and be at least 10 characters long");
            e.preventDefault();
        }
        if (recipient_email_radio.checked){
            if (email.value.length < 1 && !emailRegExp.test(email.value)) {
                alert("Email is required and should be a valid email address");
                e.preventDefault();
            }
        } else if (recipient_sms_radio.checked) {
            if (phone.value.length < 1 &&!phoneRegExp.test(phone.value)) {
                phone.style.backgroundColor = "red";
                alert("Phone number is required");
                e.preventDefault();
            } else {
                phone.style.backgroundColor = "lightgreen";
            }
        } else if (!do_not_notify_radio.checked) {
            alert("Please select a notification method");
            e.preventDefault(); 

        }
        if (visa_card.value.length < 1 && card_number.value.length < 1 && expiration_date.value.length < 1 && ccv.value.length < 1 && amount_sent.value.length < 1 && !check_box.checked) {
            alert("all payment information is required");
            e.preventDefault();
        }
        if (card_number.validity.invalid) {
            alert("The card number must follow format XXXX-XXXX-XXXX-XXXX where all Xs are numbers");
            e.preventDefault();
        }
        let inputDate = new Date(expiration_date.value);
        let today = new Date();
        
        if (inputDate < today) {
            alert("The enterred date is expired");
            e.preventDefault();
        }
        if (ccv.validity.invalid) {
            alert("The ccv must be a 3 or 4 digit number");
            e.preventDefault();
            
        }
        if (amount_sent.validity.invalid) {
            alert("The amount must be a number, it could include decimal values");
            e.preventDefault();
        }
    });
        


    


});


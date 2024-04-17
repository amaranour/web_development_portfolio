
import api from './APIClient.js';


document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.querySelector('#username-input');


const loginButton = document.querySelector('#login-button');
console.log(loginButton);

// load the dom first

    loginButton.addEventListener('click', e => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        console.log(username)
          if (username === '') { 
              alert('Username cannot be empty');
                return;
              
          }
          
        // if the username is authenticated take them to their main page and fill it with the info
        api.authenticate(username).then(user => {
            console.log('user', user);
            sessionStorage.setItem('userInfo', JSON.stringify(user));
            window.location.href = '/mainpage';
        }).catch(err => {
            alert('Invalid username');
        }); 
    });
});


      





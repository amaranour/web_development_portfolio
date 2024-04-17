
import api from './APIClient.js';

document.addEventListener('DOMContentLoaded', () => {

    api.getCurrentUser().then(userData => {
        document.querySelector('#current-user').innerHTML = `<strong>${userData.first_name} ${userData.last_name} </strong> (${userData.username}) `;
        const span = document.createElement('span');
        span.innerHTML = `<img src="${userData.avatar}" alt="avatar" class="avatar">`;
        document.querySelector('#current-user').appendChild(span);
    }).catch((err) => {
        if(err.status === 401) {
            console.log("We are not logged in");
            document.location = './login';
        }
          else {
            console.log(`${err.status}`, err);
        }
    });

    const logoutlink = document.querySelector('#logout');
    logoutlink.addEventListener('click', e => {
        e.preventDefault();
        api.logOut().then(() => {
            document.location = './login';
        }).catch((error) => {
            console.log("Error logging out", error);
        });
    });
});
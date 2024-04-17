
import api from './APIClient.js';

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored user information
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(userInfo.first_name);

    if (!userInfo) {
        console.log("No user info found. Redirecting to login.");
        window.location.href = '/'; // Redirect if no user info is found
        return;
    }

    //create an img element
    // add the img to the #avatar span
    const img = document.createElement('img');
    img.src = userInfo.avatar;

    document.querySelector('#username').innerHTML = userInfo.username;
    document.querySelector('#avatar').appendChild(img);
    // add dropdown menu to the avatar containing log out link allowing user to log out
    const logout = document.querySelector('.log-out');
    console.log('logout', logout); 
    logout.addEventListener('click', e => {
        sessionStorage.removeItem('userInfo');
        window.location.href = '/';
    });
   
    
    
    // Helper function to fetch user details and format howl for display
function createHowlElement(howl) {
    return api.getUserById(howl.userId).then(user => {
        // Create the howl element
        const howlDiv = document.createElement('div');
        howlDiv.innerHTML = `
        <article class="mb-4">
        <div class="article-header d-flex justify-content-between">
            <div class="article-info d-flex gap-3">
              <!-- to be filled when getting the user logs -->
                <span id= 'imageavatarlink'><img src="${user.avatar}" alt="avatar" ></span>
               
                    <span id='firstname'>${user.first_name}</span>
                    <span id ='lastname'>${user.last_name}</span>
                
                <span id ='username'> ${'@' + user.username}</span>
            </div>
            <div class="article-date">
              <span>${formatDateTime(howl.datetime)}</span> 
            </div>
          </div>
          <br>
          <p id='text'>${howl.text}</p>
          
        
        </article>  `;

        // grab each avatar 
        const avatar = howlDiv.querySelector('img');
        console.log(avatar);
        avatar.addEventListener('click', e => {
            sessionStorage.setItem('profileInfo', JSON.stringify(user));
            window.location.href = '/userprofile';
        });
        
        return howlDiv;
    });
}
// Function to fetch and display all howls
function fetchAndDisplayAllHowls() {
    Promise.all([
        api.getHowlsByFollowing(userInfo.id),
        api.getHowlsByUserId(userInfo.id)
    ]).then(([followingHowls, userHowls]) => {
        const combinedHowls = [...followingHowls, ...userHowls];
        // Ensure sorting is correct by re-applying it every time we fetch
        combinedHowls.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

        const howlsContainer = document.querySelector('#howls');
        howlsContainer.innerHTML = ''; // Clear previous howls
        combinedHowls.forEach(howl => createHowlElement(howl).then(element => howlsContainer.appendChild(element)));
    }).catch(console.error);
}

// Assuming userInfo.id is available
fetchAndDisplayAllHowls();


    // Function to format the datetime string into a more readable format
    // Dec insteas of december
    function formatDateTime(datetime) {
        const date = new Date(datetime);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
   
    // in case the howl button is clicked we call the api 
    // to create the new howl to post it to the server
    const howlButton = document.querySelector('#howl-button');
    console.log(howlButton);
    howlButton.addEventListener('click', e => {
        const howlText = document.querySelector('#howl-text').value;
        if (howlText) {
            const newHowl = {
                userId: userInfo.id,
                datetime: new Date().toISOString(),
                text: howlText
            };
            
            api.createHowl(newHowl).then(howl => {
                createHowlElement(howl).then(howl => {
                    
                    
                    document.querySelector('#howl-text').value = '';
                    // IF WE REFRESH WE KEEP THE NEWLY ADDED HOWL IN ORDER
                    // keep track of the last howl added 
                    const howlsContainer = document.querySelector('#howls');
                    howlsContainer.insertBefore(howl, howlsContainer.firstChild);
                    

                    
                    
                });
                console.log('Howl created:', howl);
            }).catch(err => console.error(err));
        } else {
            alert('Please enter a howl');
        } 
    });


    // get all howls
    api.getHowls().then(howls => {
        console.log(howls);
    }).catch(err => console.error(err));
    
});
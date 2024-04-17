

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


    const profileInfo = JSON.parse(sessionStorage.getItem('profileInfo'));
    console.log(profileInfo.username);

    // put the profileInfo howls on the page
    const howlsDiv = document.querySelector('#howls');
    console.log(howlsDiv);
    api.getHowlsByUserId(profileInfo.id).then(howls => {
        howls.forEach(howl => {
            const howlDiv = document.createElement('div');

            howlDiv.innerHTML = `
            <article class="mb-4">
            <div class="article-header d-flex justify-content-between">
                <div class="article-info d-flex gap-3">
                  <!-- to be filled when getting the user logs -->
                    <span id= 'imageavatarlink'><img src="${profileInfo.avatar}" alt="avatar" ></span>
                   
                        <span id='firstname'>${profileInfo.first_name}</span>
                        <span id ='lastname'>${profileInfo.last_name}</span>
                    
                    <span id ='username'> ${'@' + profileInfo.username}</span>
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
        
        avatar.addEventListener('click', e => {
            sessionStorage.setItem('profileInfo', JSON.stringify(user));
            window.location.href = '/userprofile';
        });
         howlsDiv.appendChild(howlDiv);
        });
    });

    


    function formatDateTime(datetime) {
        const date = new Date(datetime);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
   



    
    const optionsButton = document.getElementById('dropdownMenuButton');
    console.log(optionsButton);
    const profileOptions = document.getElementById('profileOptions');
    let followerFetched = false;

    optionsButton.addEventListener('click', () => {


        if (!followerFetched) {
            // Toggle the 'd-none' class to show/hide the profile options
            // when the options button is clicked, show each user the profile user following
            api.getFollowing(profileInfo.id).then(followers => {
                console.log(followers);
                // add the followers inside the div under profileOptions id
                
                followers.forEach(follower => {
                    // add each follower in one row inside the profileOptions div
                    
                    const followerDiv = document.createElement('div');
                    // structure: avatar 2spaces firstname 2spaces lastname 2spaces username
                    // leave 2 spaces between each element    
                    followerDiv.innerHTML = `
                    <div class="d-flex gap
                    -8">
                    <span> <img src="${follower.avatar}" alt="avatar" class="me-2"> </span>
                    <span  id = "f" class="me-2">${follower.first_name}</span>
                    <span id ="l" class="me-2">${follower.last_name}</span>
                    <span>${'@' +follower.username}</span>
                    </div>

                    `;
                    // each avatar is clickable and redirects to the user profile
                    const avatar = followerDiv.querySelector('img');
                    console.log(avatar);
                    avatar.addEventListener('click', e => {
                        sessionStorage.setItem('profileInfo', JSON.stringify(follower));
                        window.location.href = '/userprofile';
                    });

                    profileOptions.appendChild(followerDiv);
                    

                }); 

                followerFetched = true; // Update flag
                profileOptions.classList.remove('d-none'); // Show followers
                }).catch(err => console.error(err));
        } else {
            profileOptions.classList.toggle('d-none');
        }
        
            

    
    });


    // Add the profile information to the page
    
    const profileDiv = document.querySelector('#info-pro');
    profileDiv.innerHTML = `
        
        <img src="${profileInfo.avatar}" alt="avatar" class="img-fluid" id="avatar">
        <div class="ms-2">

            <h3 id="fullname">${profileInfo.first_name} ${ profileInfo.last_name}</h3>
            <h4 id="username">${'@' + profileInfo.username}</h4>
        </div>
    `

    // Add the follow button to the page
    const followButton = document.querySelector('#followBtn');
    console.log(followButton);
    if (userInfo.id === profileInfo.id) {
        followButton.classList.add('d-none');
    } else {
        api.isFollowing(userInfo.id, profileInfo.id).then(isFollowing => {
            if (isFollowing) {
                followButton.innerHTML = 'Unfollow';
            } else {
                followButton.innerHTML = 'Follow';
            }
        });
    }

    console.log('here');

    followButton.addEventListener('click', () => {
        console.log('follow button clicked');
        if (followButton.innerHTML === 'Follow') {
            api.followUser(userInfo.id, profileInfo.id).then(following => {
                followButton.innerHTML = 'Unfollow';
                // add confirmaion message to the user
                alert('You are now following ' + profileInfo.first_name + ' ' + profileInfo.last_name);
                
                
            });
        } else {
            api.unfollowUser(userInfo.id, profileInfo.id).then(following => {
                followButton.innerHTML = 'Follow';
                // add confirmaion message to the user
                alert('You are no longer following ' + profileInfo.first_name + ' ' + profileInfo.last_name);
            });
        }
    });


});
## Homework 4 

### An interesting challenge you encountered when implementing Howler. What was the issue, and how did you solve it?

a challenge I encountered was appending the new howls posted to the timeline and keeping the order right. combining howls posted by followers and the user because I have two end points one to feth the howls of the user followers and one to fetch the howls of the user. I used  promise.all and call the two api endpoints and sort them in descending order.


### What additional feature would you add to Howler, and how would you suggest it should be implemented?

I would probably make the howler more secure by adding the password for the user to put in to login. I would implement that by taking the password and hash it 
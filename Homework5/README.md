## Homework 5

### An interesting challenge you encountered when implementing JTW algorithms. What was the issue, and how did you solve it?

a challenge I encountered was storing the api secret key in .env. when the .env can't be seen in github, running the docker was shwing an error saying that .env is not in the diretory. I had to create a .env.example and copy it to .env to be able to run the docker on vm


### What security risks/vulnerabilities/weaknesses, if any, are present in your implementation? How can they be exploited, and what are some ways to fix them? Are there any tradeoffs if you implement any of the fixes?

the .env could have been exploited if I were to push it to github. However using docker capability to store sensitive information was helpful in abstracting the secret key from anyone.
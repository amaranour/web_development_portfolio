let user = {
    name: "John",
    age: 30
  };
  
  user.sayHi = function() {
    console.log("Hello!");
  };

  console.log(user.sayHi);
  user.sayHi
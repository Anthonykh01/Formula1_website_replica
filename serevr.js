//This is a simple server playground to teach you how to handle AJAX requests
//It teaches you how to handle GET and POST AJAX requests from the client
//Please use the page1.html, page2.html, page3.html etc.. on the front-end according to
//what is being explained

const express = require("express");
const app = express(); //create an express app
const fs = require("fs"); // To use server file system we need the built in Node js module fs

//Essential Reading: I want you to read about HTTP methods more:
//https://www.w3schools.com/tags/ref_httpmethods.asp

//We will use the following middleware method
//express.urlencoded({ extended: true }) is a middleware fct that parses incoming requests
// with urlencoded payloads.
//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object
//as strings or arrays
//Check later in this file when we receive stuff via POST via AJAX
app.use(express.urlencoded({ extended: true }));

//I need a middleware to help express understand and parse JSON received from clients
// parse application/json
app.use(express.json());

//You might get on the client side (inside your web browser ye3ni) errors such as;
//Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource
//at http://localhost:8081/. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).

//Add a middleware function that allows server Cross Origin Requests
//I got this from https://stackoverflow.com/questions/57716816/express-js-cross-origin-request-blocked

//Remember app.use() allows us to mount middleware logic usually in the form of a function
//Below we are creating our own middleware
//To read about creating middleware methods in Express JS please read:
//https://expressjs.com/en/guide/using-middleware.html
//https://www.tutorialspoint.com/expressjs/expressjs_middleware.htm
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
app.use(function (req, res, next) {
  //Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.
  //For requests without credentials, the literal value "*" can be specified as a wildcard;
  //the value tells browsers to allow requesting code from any origin to access the resource
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers: [<header-name>[, <header-name>]*]
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  //next() means move to the next defined middleware function or to your routes (app.get(), app.post())
  next();
});


app.get("/ReceiveJSONFromServer", (req, res) => {
  const JSObj = {
    d: {
      name: "max verstappen",
      team: "redbull",
     points: 305,

    },
  };

  //Remember we can transform any JavaScript Object to a JSON string
  //by using JSON.stringify() - we took this method in the JS part of the course
  //We can transform a JSON string to a JS object (the opposite of above)
  //by using JSON.parse(JSONSTRINGHERE). If you know JSON.stringify() & JSON.parse() you know literally
  //How to manipulate and parse JSON strings in JS.
  const JSONString = JSON.stringify(JSObj);
  //console.log(JSONString); // will print {"book":{"name":"Harry Potter and the Goblet of Fire","author":"J. K. Rowling","year":2000,"genre":"Fantasy Fiction","bestseller":true}}

  //To send JSON file to the client - remember we learned about a method
  //called json() in express js
  res.json(JSONString);
});


const server = app.listen(8081, function () {
  const port = server.address().port;
  console.log(`The server is listening at  ${port}`);
});

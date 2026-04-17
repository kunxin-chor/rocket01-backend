// require is a function that imports other JavaScript
// file or package into the current Js file
// By default NodeJS look for the folder or file
// in the `node_modules` folder.
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// read the content of the .env file
// and add the variables in them to process.env
require('dotenv').config();

console.log(process.env.FOURSQUARE_API_KEY);

// create a new express application
const app = express();
app.use(cors()); // enable cross origin resources sharing

// enable ejs
app.set('view engine', 'ejs');

// a route is a URL fragment linked to a function
// when Express detects a request for that URL fragment
// the function will be called
app.get("/", function (req, res) {
    // req = request: whatever the client sends will be in here
    // res = response: we use res to send data back to the client
    res.send("hello world");
})

app.get('/about', function (req, res) {
    res.send("<h1>About Us</h1>");
})

// get user request via route parameters
app.get('/hello/:name', function (req, res) {
    // when accessing placeholders in the URL, it's always req.parmas
    // (i.e the placeholders are known as 'route parameters')
    const userName = req.params.name;
    res.send("Hello, " + userName);
});

app.get('/sum/:n1/:n2', function (req, res) {
    // route parameters are always strings
    const number1 = parseInt(req.params.n1);
    const number2 = parseInt(req.params.n2);
    const total = number1 + number2;
    res.send("Total is " + total);
})

// query string
// example string: ?n1=10&n2=33&n3=44
app.get('/find-lowest', function (req, res) {
    // if the url uses query strings, then we do req.query
    const n1 = Number(req.query.n1);
    const n2 = Number(req.query.n2);
    const n3 = Number(req.query.n3);
    const smallest = Math.min(n1, n2, n3);
    res.send("The smallest number is " + smallest);
})

// send back HTML
app.get('/contact-us', function (req, res) {
    // send back the content of contact.ejs
    res.render('contact');
})

app.get('/foursquare-api/places/search', async function (req, res) {

    /*
        fetch('https://places-api.foursquare.com/places/search?query=chicken%20rice&near=Singapore', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
  */

    // axips.get can have up to three parametes
    // 1st parameter: the URL
    // 2nd parameter: the configuration options
    //  the params key is for query string
    //  the headers key is to set in request header

    const response = await axios.get("https://places-api.foursquare.com/places/search", {
        params: req.params,
        headers: {
            Authorization: "Bearer " + process.env.FOURSQUARE_API_KEY,
            Accept: "application/json",
            // Unique to FourSquare, it is to state which version of Foursquare
            "X-Places-Api-Version": "2025-06-17"

        }
    })

    res.json(response.data);

})

app.listen(3000, function () {
    console.log("Server has started");
})
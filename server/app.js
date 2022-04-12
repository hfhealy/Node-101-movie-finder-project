/* Server should log each request using morgan's dev format
Server should indicate when it is listening and on which port
Server should respond to GET requests to /?i=tt3896198 with movie data
Server should respond to GET requests to /?i=tt3896198 with movie data without fetching from the OMDb API
Server should respond to GET requests to /?t=baby%20driver with movie data
Server should respond to GET requests to /?t=baby%20driver with movie data, without fetching from the OMDb API
All tests should pass */

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const config = require('dotenv').config();

const app = express();

app.use(morgan('dev'));
let localStorage = [];
//create a route for /
app.get('/', function(req, res){
// console.log(req.url[2]);

    //find out if it's queried by i or t using req.url with index

        //if it's i then search in local storage to see if id exists. 
        //req.query query key value pair, in this example is the ID. if it's with the t, it's the title.
        if (req.url[2] == "i") {
            for (j = 0; j<localStorage.length; j++) {
                if (req.query.i == localStorage[j]["Id"]) {
                    res.send(localStorage[j])
                    // console.log("line 31", localStorage);
                    return 
                } 
            }
            axios.get(`http://www.omdbapi.com/${req.url}&apikey=${process.env.API_KEY}`) 
                .then(movieData => {
                        let movie = {
                            Id: movieData.data.imdbID,
                            Title: movieData.data.Title
                        };
                        localStorage.push(movie);
                        res.send(movie);
                        
                    })
                    // console.log("line 45", localStorage);
        }
            //if it does exist then return results from array lookup 
            //if it does not exist use axios to make call to omdb
            //from the response create an object and push it into local storage
            //and return same object to requestor 
        if (req.url[2] == "t") {
            console.log("line 52", req.url[2]);
            for (h = 0; h<localStorage.length; h++) {
                console.log("line 53", req.query.t, localStorage[h]["Title"].toLowerCase());
                if (req.query.t == localStorage[h]["Title"].toLowerCase()) {
                    console.log("line 56", localStorage);
                    res.send(localStorage[h])
                    console.log("line 57", localStorage[h]);
                    return 
                } 
            }
            axios.get(`http://www.omdbapi.com/${req.url}&apikey=${process.env.API_KEY}`) 
                .then(movieData => {
                    let movie = {
                        Id: movieData.data.imdbID,
                        Title: movieData.data.Title
                    };
                    console.log("movie", movie);
                    console.log("movie data", movieData.data.Title);
                    localStorage.push(movie);
                    res.send(movie);
                    
                })
                    

    }
        })
        //if its t search in local storage and compare object by title
            //if it does exist and it matches return the object data 
            //if it doesnt match make axios call to omdb
            //create response object push into local storage array
            //respond with the new object data 





module.exports = app;
// import express
const express = require("express");
const app = express();
app.use(express.json());

// import the list of profiles
let profilesList = require("./data.js");

// a test endpoint - not part of the assessment
app.get("/", (req, res) => {
    res.status(200).send({ msg: "Welcome to our page!" });
});

// @TODO: Implement the API's GET endpoint
app.get("/api/profiles/:city?", (req, res) => {
    // example of accessing a single person in the profilesList
    if (req.params.city === undefined) {
        res.status(200).send(profilesList);
    } 
    else if (req.params.city !== undefined) {
        res.status(200).send(profilesList.filter((p) => {
            return p.city === req.params.city;
        }));
    }
    else {
        const message = {
            statusCode:404,
            message:"No Dating Profiles found in data list"
        }
        res.status(404).send(message);
    }
});

// @TODO: Implement the API's POST endpoint
app.post("/api/profiles", (req, res) => {
    console.log("I received this from the client:")
    console.log(req.body)
    if("name" in req.body && "age" in req.body && "occupation" in req.body && "city" in req.body){
        const newDatingProfile = req.body
        profilesList.push(newDatingProfile)
        const message = {
            msg:"Created",
            inserted:newDatingProfile
        }
        res.status(201).send(message);
    }
    else{
        const message = {
            statusCode:500,
            message:`Error when inserting User Dating Profile with name ${req.body.name} into data list.`
        }
        res.status(500).send(message)
    }
});

// @TODO: Impelement the API's DELETE endpoint
app.delete("/api/profiles", (req, res) => {});

// anyone who imports this file will be able to use the "app" variable
module.exports = app;

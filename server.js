// Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const data = require("./db.json")

const app = express();
// Sets up port to deploy on Heroku
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts index.html on page load
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts notes.html page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Grabs data from db.json and adds it to notes.html
app.route("/api/notes")
    .get(function (req, res) {
        res.json(data);
    })


// Logs that express is listening to port 5000
app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
});

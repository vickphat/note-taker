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

    // Adds a new note to the array inside the db.json file
    .post(function (req, res) {

        let dataArray = path.join(__dirname, "./db.json");
        let newNote = req.body;

        let noteID = 80;
        for (let i = 0; i < data.length; i++) {
            let singleNote = data[i];

            if (singleNote.id > noteID) {
                noteID = singleNote.id;
            }
        }
        // Gives an ID to the newly created note  
        newNote.id = noteID + 1;
        data.push(newNote);

        // Adds new notes into db.json array
        fs.writeFile(dataArray, JSON.stringify(data), (err) =>
            err ? console.log(err) : console.log("Note was saved!")
        )

        // Shows content of notes upon the save button press 
        res.json(newNote);
    });

// Deletes note from the db.json array
app.delete("/api/notes/:id", function (req, res) {

    let dataArray = path.join(__dirname, "./db.json");
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == req.params.id) {
            data.splice(i, 1);
            break;
        }
    }
    // Rewrites db.json file after delete
    fs.writeFile(dataArray, JSON.stringify(data), (err) =>
        err ? console.log(err) : console.log("Note was deleted!")
    )

    // Shows the removal of the saved note upon delete button press 
    res.json(data);
});

// Logs that express is listening to port 5000
app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
});

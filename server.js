// Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const data = require("./db.json")

const app = express();
const PORT = process.env.PORT || 5000;

// Logs that express is listening to port 5000
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
})

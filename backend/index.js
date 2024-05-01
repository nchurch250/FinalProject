var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";


app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String
}, { collection: 'locations' });

const Location = mongoose.model('Location', locationSchema);

mongoose.connect('mongodb://127.0.0.1:27017/finaldata')
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

app.get("/", async (req, res) => {

});

app.get("/read", async (req, res) => {
    const locations = await Location.find();

    res.json(locations)
});

app.get("/read/:id", async (req, res) => {
    const id = req.params.id;

    const product = await Location.find({"id": id});

    res.json(product);
});
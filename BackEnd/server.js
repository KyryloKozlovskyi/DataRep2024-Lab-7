// Enable EXPRESS
const express = require('express');
const app = express();
const port = 4000; // Port number

// Enable COORS to allow communication between app and server
// This middleware allows your frontend app to make API requests to the backend
const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection with Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.egsdr.mongodb.net/DB11');

// Database schema and data model:
const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
});

const Movie = mongoose.model('Movie', movieSchema);

// GET request to send json
app.get('/api/movies', (req, res) => {
    // Movie data stored in JSON format
    const movies = [
        {
            "Title": "Avengers: Infinity War (server)",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War (server)",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
            "Title": "World War Z (server)",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
    ]
    res.status(200).json({ movies }) // Responds with JSON
})

// POST request that logs the title, year, and poster URL of the movie object passed from the React app
app.post("/api/movies", (req, res) => {
    console.log("Movie added!") // Log to the console
})

// Port listener
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log to the console
});
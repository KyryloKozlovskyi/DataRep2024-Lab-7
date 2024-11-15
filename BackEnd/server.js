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

// Method to Add Data to MongoDB
// Updates the db
app.post('/api/movies', async (req, res) => {
    const { title, year, poster } = req.body;
    const newMovie = new Movie({ title, year, poster });
    await newMovie.save();
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

// Fetch all movie records
// It’s sent back in JSON format.
app.get('/api/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies);
});

// Retrieve Data by ID
// If a movie is found, it’s sent back in JSON format.
app.get('/api/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
});

// Port listener
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log to the console
});
import React, { useState } from 'react';
import axios from 'axios';

// Create component
const Create = () => {
    // Adds state variables to functional components
    // Stores data returned from an API and manages the state of the application.
    const [title, setTitle] = useState(''); // manages title state
    const [year, setYear] = useState(''); // manages year state
    const [poster, setPoster] = useState(''); // manages poster state

    // create.js
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`); // Log movie data

        // Movie format
        const movie = {
            title: title,
            year: year,
            poster: poster
        };

        // POST call to the server
        axios.post('http://localhost:4000/api/movies', movie)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data));
    };

    // Returns the relevant message
    return (
        <div>
            <h2>This is my Create Component.</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* Input box for movie title*/}
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    {/* Input box for movie year*/}
                    <label>Add Movie Year: </label>
                    <input type="text"
                        className="form-control"
                        value={year}
                        onChange={(e) => { setYear(e.target.value) }}
                    />
                    {/* Input box for movie poster*/}
                    <label>Add Movie Poster: </label>
                    {/* Input button */}
                    <input type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <input type="submit" value="Add Movie" />
            </form>
        </div>
    );
}

export default Create; // Exports the component
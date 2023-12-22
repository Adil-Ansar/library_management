// Import necessary modules
const express = require("express"); // Import Express.js framework
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const dotenv = require("dotenv"); // Load environment variables
const server = express(); // Create an Express server instance
const { dbConnect } = require("./helper/dbConnect");

const { baseRouter, basePath } = require("./helper/routeHandler"); // Import baseRouter and basePath

// Middleware to parse incoming JSON requests
server.use(bodyParser.json({ limit: "100mb" }));

// Middleware to parse incoming URL-encoded requests
server.use(bodyParser.urlencoded({ extended: true }));

// Load environment variables from config.env file
dotenv.config({ path: "config.env" });

// Handling a simple GET request to the root URL
server.get("/", (req, res) => {
    res.send("I am a server");
});

// Using baseRouter for a specific base path
server.use(basePath, baseRouter);

// Middleware to handle 404 (Route Not Found) errors
server.use((req, res, next) => {
    const error = new Error("Route Not found.. to"); // Creating an error object
    error.status = 404; // Setting the error status code
    next(error); // Passing the error to the next middleware
});

// Error handling middleware for other types of errors
server.use((error, req, res, next) => {
    res.status(error.status || 500); // Setting the response status code
    res.json({ error: { message: error.message } }); // Sending JSON response with error message
});

// Start the server and listen on the specified port

dbConnect()
server.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`); // Logging server start message
})

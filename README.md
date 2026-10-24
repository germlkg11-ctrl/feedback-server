# Feedback Server

A beginner Node.js project that receives feedback ratings, validates them, saves valid submissions to a JSON file, and displays saved feedback on a separate page.

## What It Does

- Serves a feedback form in the browser.
- Accepts feedback using an HTTP POST request.
- Validates ratings from 1 to 5.
- Saves valid feedback in `feedback.json`.
- Provides a JSON route at `/feedback.json`.
- Displays saved ratings and comments on `list.html`.

## What I Learned

- How a Node.js HTTP server receives and responds to requests.
- The difference between GET and POST requests.
- How to validate user input and return an HTTP 400 response for invalid ratings.
- How to read and write JSON data using Node.js.
- How frontend JavaScript fetches data from a server and builds table rows.
- How to use Git branches, commits, pull requests, and merges.

A server is a program that listens for requests from clients, processes those requests, and sends responses back.

## Running the Project

1. Install Node.js.
2. Open a terminal in the project folder.
3. Run `node server.js`.
4. Open `http://localhost:8080/` in your browser.

To view saved feedback, open `http://localhost:8080/list.html`.
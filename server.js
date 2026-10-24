

const http = require("http");
const fs = require("fs");

function handleRequest(request, response) {
  console.log(request.method + " " + request.url);

  // Serve the feedback page.
  if (request.method === "GET" && request.url === "/") {
    const page = fs.readFileSync("index.html");

    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    response.end(page);
    return;
  }

  // Serve the stylesheet.
if (request.method === "GET" && request.url === "/style.css") {
  const stylesheet = fs.readFileSync("style.css");

  response.writeHead(200, {
    "Content-Type": "text/css; charset=utf-8"
  });

  response.end(stylesheet);
  return;
}
// Serve the JavaScript file.
if (request.method === "GET" && request.url === "/script.js") {
  const script = fs.readFileSync("script.js");

  response.writeHead(200, {
    "Content-Type": "text/javascript; charset=utf-8"
  });

  response.end(script);
  return;
}
  // Serve the about page.
  if (request.method === "GET" && request.url === "/about") {
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });

    response.end("This server was written by Germain in Lesson 20.");
    return;
  }


  // Receive the submitted feedback.
  if (request.method === "POST" && request.url === "/feedback") {
    let body = "";

    request.on("data", function (chunk) {
      body += chunk.toString();
    });

    request.on("end", function () {
      console.log("Raw body:", body);

      const fields = new URLSearchParams(body);
      const ratingText = fields.get("rating");
      const rating = Number(ratingText);

      console.log("Submitted rating:", ratingText);

      if (
        ratingText === null ||
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5
      ) {
        response.writeHead(400, {
          "Content-Type": "text/plain; charset=utf-8"
        });

        response.end(
          "Invalid rating. Please submit a rating from 1 to 5."
        );
         return;
      }

      response.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
      });

      response.end(
        "Thank you! Your rating was " + rating + "."
      );
    });

    return;
  }
  // Respond when a route exists but the method is not allowed.
  const knownRoutes = ["/", "/style.css", "/about", "/feedback"];

  if (knownRoutes.includes(request.url)) {
    response.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      "Allow": request.url === "/feedback" ? "POST" : "GET"
    });

    response.end("Method not allowed: " + request.method);
    return;
  }
  // Respond when no route matches.
  response.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  response.end("Not found: " + request.url);
}

const server = http.createServer(handleRequest);

server.listen(8080, function () {
  console.log(
    "Waiting on http://localhost:8080 ... press Ctrl+C to stop"
  );
});


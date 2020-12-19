let app = require("express")();
let mongoose = require("mongoose");
let cors = require("cors");
require("dotenv").config();

let battleRoutes = require("./routes/battles");
let searchRoute = require("./routes/battles/search");

const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.CORS_ALLOWED_DOMAIN,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// All the routes
battleRoutes(app);
searchRoute(app);

app.get("*", function (req, res, next) {
  let err = new Error("Page Not Found");
  err.statusCode = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error("Error ", err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Failed to start server", error);
  } else {
    mongoose.connect(
      process.env.MONGO_CONNECTION_STRING,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (er) => {
        if (er) console.log("Mongo db connection error-", er);
      }
    );

    console.log("Server started at ", PORT);
  }
});

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

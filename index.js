let app = require("express")();
let mongoose = require("mongoose");
require("dotenv").config();

require("dotenv").config({ path: __dirname + "/.env.local" });

let BattlesSchema = require("./models/battles");

const PORT = process.env.PORT;

app.get("/list", async (req, res) => {
  let list = await BattlesSchema.find(
    { location: { $ne: null || "" } },
    { location: 1 }
  ).distinct("location");
  console.log(list);

  res.send(list);
});

app.get("/count", async (req, res) => {
  let count = await BattlesSchema.countDocuments();

  res.send({ total: count });
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

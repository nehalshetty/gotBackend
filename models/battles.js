const { Schema, model } = require("mongoose");

const BattlesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = model("battles", BattlesSchema);

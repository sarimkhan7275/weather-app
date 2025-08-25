const mongoose = require("mongoose");

const userCitiesSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  cities: [{ type: String }]
});

module.exports = mongoose.model("UserCities", userCitiesSchema);

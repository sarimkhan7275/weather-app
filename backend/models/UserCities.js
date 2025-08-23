const mongoose = require("mongoose");

const userCitiesSchema = new mongoose.Schema({
  userId: { type: String, required: true },   // In real app, this would link to a User model
  cities: [{ type: String }]
});

module.exports = mongoose.model("UserCities", userCitiesSchema);

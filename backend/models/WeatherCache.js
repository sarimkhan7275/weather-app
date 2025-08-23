const mongoose = require("mongoose");

const weatherCacheSchema = new mongoose.Schema({
  city: { type: String, required: true, lowercase: true },
  type: { type: String, enum: ["current", "forecast"], required: true }, // differentiate
  data: { type: Object, required: true }, // weather JSON from API
  cachedAt: { type: Date, default: Date.now }
});

// expire cache automatically after X seconds (e.g., 10 minutes = 600s)
weatherCacheSchema.index({ cachedAt: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model("WeatherCache", weatherCacheSchema);

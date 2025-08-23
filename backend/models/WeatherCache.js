const mongoose = require("mongoose");

const weatherCacheSchema = new mongoose.Schema({
  city: { type: String, required: true, lowercase: true },
  type: { type: String, enum: ["current", "forecast"], required: true }, 
  data: { type: Object, required: true }, 
  cachedAt: { type: Date, default: Date.now }
});

weatherCacheSchema.index({ cachedAt: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model("WeatherCache", weatherCacheSchema);

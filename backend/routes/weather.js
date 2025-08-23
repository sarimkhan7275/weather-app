const express = require("express");
const axios = require("axios");
const Search = require("../models/Search");
const router = express.Router();
const UserCities = require("../models/UserCities");
const WeatherCache = require("../models/WeatherCache");

const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";


// ✅ Current + Forecast (with cache)
router.get("/:city/full", async (req, res) => {
  const city = req.params.city.toLowerCase();

  try {
    // -----------------------------
    // 1. Check cache for current
    // -----------------------------
    let currentCache = await WeatherCache.findOne({ city, type: "current" });
    let currentWeather;

    if (currentCache) {
      console.log("⚡ Serving current weather from cache");
      currentWeather = currentCache.data;
    } else {
      const currentResponse = await axios.get(OPENWEATHER_URL, {
        params: { q: city, appid: process.env.OPENWEATHER_KEY, units: "metric" },
      });

      currentWeather = {
        city: currentResponse.data.name,
        country: currentResponse.data.sys.country,
        temperature: currentResponse.data.main.temp,
        description: currentResponse.data.weather[0].description,
        icon: currentResponse.data.weather[0].icon,
      };

      await WeatherCache.create({ city, type: "current", data: currentWeather });
    }

    // -----------------------------
    // 2. Check cache for forecast
    // -----------------------------
    let forecastCache = await WeatherCache.findOne({ city, type: "forecast" });
    let forecast;

    if (forecastCache) {
      console.log("⚡ Serving forecast from cache");
      forecast = forecastCache.data;
    } else {
      const forecastResponse = await axios.get(FORECAST_URL, {
        params: { q: city, appid: process.env.OPENWEATHER_KEY, units: "metric" },
      });

      const daily = {};
      forecastResponse.data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        const time = item.dt_txt.split(" ")[1];
        if (time === "12:00:00") {
          daily[date] = {
            date,
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          };
        }
      });

      forecast = Object.values(daily);

      await WeatherCache.create({ city, type: "forecast", data: forecast });
    }

    // -----------------------------
    // 3. Return merged response
    // -----------------------------
    res.json({
      city: currentWeather.city,
      country: currentWeather.country,
      current: currentWeather,
      forecast,
    });
  } catch (error) {
    console.error("❌ Weather error:", error.message);
    res.status(400).json({ error: "Weather data not available" });
  }
});




// ✅ Add city to favorites
router.post("/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  console.log("req.body:", req.body);
  const { city } = req.body;

  


  try {
    let userCities = await UserCities.findOne({ userId });
    console.log(userCities,"usererrrrr")

    if (!userCities) {
      userCities = new UserCities({ userId, cities: [city] });
    } else {
      if (!userCities.cities.includes(city)) {
        userCities.cities.push(city);
      }
    }

    await userCities.save();
    res.json(userCities);
  } catch (error) {
    res.status(500).json({ error: "Failed to add city" });
  }
});


// ✅ Remove city from favorites
router.delete("/:userId/favorites/:city", async (req, res) => {
  const { userId, city } = req.params;

  try {
    let userCities = await UserCities.findOne({ userId });

    if (!userCities) {
      return res.status(404).json({ error: "User not found" });
    }

    userCities.cities = userCities.cities.filter(c => c.toLowerCase() !== city.toLowerCase());
    await userCities.save();

    res.json(userCities);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove city" });
  }
});

// ✅ Get all favorite cities
router.get("/:userId/favorites", async (req, res) => {
  const { userId } = req.params;

  try {
    let userCities = await UserCities.findOne({ userId });

    if (!userCities) {
      return res.json({ userId, cities: [] });
    }

    res.json(userCities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});



module.exports = router;















// ✅ Current weather
// router.get("/:city", async (req, res) => {
//   const city = req.params.city.toLowerCase();

//   try {
//     // 1. Check cache
//     let cache = await WeatherCache.findOne({ city, type: "current" });
//     if (cache) {
//       console.log("⚡ Serving from cache");
//       return res.json(cache.data);
//     }

//     // 2. Fetch from OpenWeather API
//     const response = await axios.get(OPENWEATHER_URL, {
//       params: {
//         q: city,
//         appid: process.env.OPENWEATHER_KEY,
//         units: "metric"
//       }
//     });

//     const data = {
//       city: response.data.name,
//       country: response.data.sys.country,
//       temperature: response.data.main.temp,
//       description: response.data.weather[0].description,
//       icon: response.data.weather[0].icon
//     };

//     // 3. Save to cache
//     await WeatherCache.create({ city, type: "current", data });

//     res.json(data);
//   } catch (error) {
//     res.status(400).json({ error: "City not found" });
//   }
// });


// // ✅ 5-day forecast (daily summary)
// router.get("/:city/forecast", async (req, res) => {
//   const city = req.params.city;

//   try {
//     const response = await axios.get(FORECAST_URL, {
//       params: {
//         q: city,
//         appid: process.env.OPENWEATHER_KEY,
//         units: "metric"
//       }
//     });

//     // Forecast data is every 3 hours → pick one entry per day (e.g., 12:00)
//     const daily = {};
//     response.data.list.forEach(item => {
//       const date = item.dt_txt.split(" ")[0]; // "2025-08-22"
//       const time = item.dt_txt.split(" ")[1]; // "12:00:00"
//       if (time === "12:00:00") {
//         daily[date] = {
//           date,
//           temperature: item.main.temp,
//           description: item.weather[0].description,
//           icon: item.weather[0].icon
//         };
//       }
//     });

//     res.json({
//       city: response.data.city.name,
//       country: response.data.city.country,
//       forecast: Object.values(daily) // array of 5 days
//     });
//   } catch (error) {
//     res.status(400).json({ error: "Forecast not available" });
//   }
// });


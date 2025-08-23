
---

## ✨ Features
- 🌍 **Current Weather**: Temperature, conditions, and location details  
- 📅 **5-Day Forecast**: Daily breakdown of upcoming weather  
- ➕ **Add / Remove Cities**: Search for new cities and save preferences  
- ⚡ **Data Caching**: Reduces API calls by serving cached results (e.g., valid for 10 minutes)  
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile  
- 🚨 **Error Handling**: Graceful handling of invalid cities, network issues, and API limits  

---

## 🛠️ Tech Stack
### Frontend
- **React.js** + **Vite**  
- **TailwindCSS** for styling  
- **Axios** for API communication  

### Backend
- **Node.js** + **Express.js**  
- **MongoDB (Mongoose)** for storing preferences & cached weather data  
- **Axios** for calling OpenWeatherMap API  
- **Caching middleware** for optimized performance  

### Database
- **MongoDB Atlas** (Cloud-hosted, can also run locally with Docker or MongoDB Community Edition)  

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/sarimkhan7275/weather-app.git
cd weather-app


## 🛠️ Technical Approach
Built a MERN stack app with a React frontend and Node/Express backend. Integrated OpenWeatherMap API, added MongoDB for caching and user preferences, and ensured responsive UI. Implemented error handling and optimized API usage with caching.

## 🧩 Problem-Solving Skills
Handled API rate limits via caching, managed invalid inputs gracefully, improved performance with reduced API calls, and designed a scalable, user-friendly solution.

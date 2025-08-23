import WeatherDashboard from "./components/weather-dashboard"


function App() {

  return (
<div className="h-screen ">
  <img
    className="w-full h-full object-cover absolute inset-0 -z-10"
    src="/bg-3.jpg"
    alt="background-image"
  />
  <WeatherDashboard />
</div>

  )
}

export default App

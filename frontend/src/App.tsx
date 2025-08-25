import WeatherDashboard from "./components/weather-dashboard"


function App() {

  return (
<div className="h-[1000px] md:h-screen ">
  <img
    className="w-full h-full object-cover"
    src="/bg-3.jpg"
    alt="background-image"
  />
  <WeatherDashboard />
</div>

  )
}

export default App

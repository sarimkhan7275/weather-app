import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'
import { monthNames } from '@/utils/constant'
import Loader from './loader'
import { SavedCities } from './saved-cities'
import { useAppDispatch, useAppSelector } from "@/utils/hooks"
import { add_fav_city_api, get_weather_data_api } from "@/redux/action"
import { ArchiveAdd } from "iconsax-reactjs"

export default function WeatherDashboard() {

  const [query, setQuery] = useState("delhi")
  const [cityName, setCityName] = useState(query)
  const { weatherData, weatherData_loading, weatherData_error} = useAppSelector((state)=>state.Reducer)
  const dispatch = useAppDispatch();



  const addToFav = ()=>{
    dispatch(add_fav_city_api({city : cityName}))
  }


  useEffect(()=>{
    let interval;
    interval = setTimeout(()=>{
      setCityName(query)
    },1000)

    return ()=>clearTimeout(interval)
  },[query])

  useEffect(()=>{
    if(cityName.length>0){
      dispatch(get_weather_data_api(cityName))
    }
  },[cityName])




  const today = new Date();
  const day = today.getDate();
  const month = monthNames[today.getMonth()]; 
  const formattedDate = `Today ${day} ${month}`;

  return (
    <div className="text-white p-3 md:p-6 w-full md:w-[80%] h-full md:h-[calc(100vh-50px)] absolute top-0 transform -translate-x-1/2 left-1/2 rounded-b-2xl backdrop-blur-xl " style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}} >
      {/* Header */}
      <div className="h-[40px] md:h-[60px] flex justify-between  items-center" >
        <div className="h-full " ><img className="h-full w-full object-contain " src="/cloudy.png" alt="weather-image" /></div>
        <div className='w-[180px] md:w-[500px] ' >
          <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Search cities' className='w-full bg-white/20 h-[40px] backdrop-blur-2xl outline-none border-none focus-visible:ring-0 rounded-4xl ' />
        </div>
        <div>
          <SavedCities/>
        </div>
      </div>

      {/* 1. LOADING STATE */}
      {weatherData_loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      
      {/* 2. EMPTY / ERROR STATE */}
      { weatherData_error && (
          <div className="mt-20 w-[70%] rounded-2xl bg-white/10 mx-auto h-[100px] flex justify-center items-center text-slate-300">
            <p>No weather data available for this city ❌</p>
          </div>
      )}


      <div className='w-[100%] md:w-[70%] mx-auto ' >
      {
        !weatherData_loading && weatherData &&
        <div>
          {/* CURRENT WEATHER */}
          <div className='mt-10 ' >
            <h1 className='text-xl md:text-2xl font-bold text-center ' >Current Weather</h1>
            
            <div className='flex justify-between items-center  mt-4 mx-auto rounded-2xl p-4 bg-white/15 backdrop-blur-2xl ' >
              <div>
                <h3 className='text-center text-lg md:text-xl font-semibold ' >{weatherData?.current?.city}</h3>
                <p className='text-center text-xs md:text-sm text-slate-200 font-normal ' >{formattedDate}</p>
              </div>
              <div>
                <h3 className='text-center text-lg md:text-xl font-semibold ' >{Math.floor(weatherData?.current?.temperature)}° C</h3>
                <p className='text-center text-xs md:text-sm text-slate-200 font-normal ' >{weatherData?.current?.description}</p>
              </div>
              <div className='h-[40px] md:h-[50px] flex items-center gap-x-3 ' >
                <img className='h-full w-full object-contain ' src={`https://weather-app-rho-weld.vercel.app/assets/icons/${weatherData?.current?.icon}.png`} alt="cloud-png" />
                <div className="cursor-pointer " onClick={addToFav} >
                  <ArchiveAdd size="30" color="#FFBF00" variant="Bold"/>
                </div>
              </div>
            </div>
          
          </div>

          {/* WEATHER FORECAST */}
          <div className='mt-8 ' >
            <h1 className='text-xl md:text-2xl font-bold text-center ' > Weather Forecast</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 mx-auto gap-2 md:gap-4 mt-4 ' >
              {
                weatherData?.forecast.map((el: any, i: number) => {
                  const dayName = new Date(el.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  });

                  return (
                    <div
                      key={`forecast-data-${i}`}
                      className="flex justify-between items-center rounded-2xl p-4 bg-white/5 backdrop-blur-2xl"
                    >
                      <div>
                        <h3 className="text-center text-md md:text-lg font-semibold">{dayName}</h3>
                      </div>
                      <div>
                        <h3 className="text-center text-md md:text-lg font-semibold">
                          {Math.floor(el.temperature)}° C
                        </h3>
                        <p className="text-center text-xs md:text-sm text-slate-200 font-normal">
                          {el.description}
                        </p>
                      </div>
                      <div className="h-[40px] md:h-[50px]">
                        <img
                          className="h-full w-full object-contain"
                          src={`https://weather-app-rho-weld.vercel.app/assets/icons/${el.icon}.png`}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      }
      </div>

    </div>
  )
}

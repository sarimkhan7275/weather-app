import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { del_fav_city_api, get_fav_city_api } from "@/redux/action"
import { useAppDispatch, useAppSelector } from "@/utils/hooks"
import { HeartAdd, Trash } from "iconsax-reactjs"
import { useEffect } from "react"
import Loader from "./loader"

export const SavedCities = () => {

  const dispatch = useAppDispatch()
  const {get_fav_city_loading, get_fav_city_success, get_fav_city_error} = useAppSelector((state)=>state.Reducer)


  useEffect(()=>{
    dispatch(get_fav_city_api())
  },[])

  const handleDel = (cityName:string) => {
    dispatch(del_fav_city_api(cityName))
  }


  return (
    <DropdownMenu>
    <DropdownMenuTrigger><HeartAdd size="32" color="#56C69B" variant="Bulk"/></DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white/5 rounded-2xl border-none backdrop-blur-sm p-2 space-y-2" >
      {
        get_fav_city_error && <div className="text-center py-10 px-3 text-white text-xs font-semibold " >Ohho! something went wrong! </div>
      }
      {
        get_fav_city_loading && <div><Loader/></div>
      }

      {
        get_fav_city_success?.cities?.length==0 ? <div className="text-white text-xs font-semibold py-4 px-2 " >No favourite city added ye!</div>:
        get_fav_city_success?.cities?.map((el:string, i:number)=>(
          <div key={`fav-cities-${i}`} className='flex justify-between items-center mx-auto rounded-full p-1 px-3 gap-x-4 text-white bg-white/15 backdrop-blur-2xl ' >
            <h3 className='text-center text-lg md:text-sm font-semibold ' >{el}</h3>
            <div className='h-[40px] md:h-[30px] ' >
              <img className='h-full w-full object-contain ' src={`https://weather-app-rho-weld.vercel.app/assets/icons/04d.png`} alt="cloud-png" />
            </div>
          <div onClick={()=>handleDel(el)} >
            <Trash size="18" color="#FF0000" variant="Bulk"/>
          </div>
        </div>
        ))
      }
    </DropdownMenuContent>
    </DropdownMenu>
  )
}

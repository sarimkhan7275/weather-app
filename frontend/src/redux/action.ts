import axios from "axios";
import { 
  GET_WEATHER_DATA_LOADING, 
  GET_WEATHER_DATA_SUCCESS, 
  GET_WEATHER_DATA_ERROR, 
  ADD_FAV_CITY_LOADING,
  ADD_FAV_CITY_SUCCESS,
  ADD_FAV_CITY_ERROR,
  GET_FAV_CITY_LOADING,
  GET_FAV_CITY_SUCCESS,
  GET_FAV_CITY_ERROR,
  DEL_FAV_CITY_LOADING,
  DEL_FAV_CITY_SUCCESS,
  DEL_FAV_CITY_ERROR
} from "./type";
import { BASE_URL } from "@/utils/constant";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import type { AppDispatch } from "./store";


let userId = localStorage.getItem("userId");
if (!userId) {
  userId = uuidv4();
  localStorage.setItem("userId", userId);
}

export const get_weather_data_api = (city: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_WEATHER_DATA_LOADING });
  try {
    const res = await axios.get(`${BASE_URL}/api/weather/${city}/full`);

    dispatch({
      type: GET_WEATHER_DATA_SUCCESS,
      payload: res.data, 
    });
  } catch (error) {
    console.error("Weather fetch error:", error);
    dispatch({ type: GET_WEATHER_DATA_ERROR });
  }
};

export const get_fav_city_api = () => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_FAV_CITY_LOADING });
  try {
    const res = await axios.get(`${BASE_URL}/api/weather/${userId}/favorites`);

    dispatch({type: GET_FAV_CITY_SUCCESS, payload: res.data});

  } catch (error) {
    toast("Something went wrong please try again.")
    dispatch({ type: GET_FAV_CITY_ERROR });
  }
};


export const add_fav_city_api = (data: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: ADD_FAV_CITY_LOADING });
  try {
    const res = await axios.post(`${BASE_URL}/api/weather/${userId}/favorites`,data);
    dispatch(get_fav_city_api());
    dispatch({type: ADD_FAV_CITY_SUCCESS});
    toast("Added to favourite city.")

  } catch (error) {
    toast("Something went wrong please try again.")
    dispatch({ type: ADD_FAV_CITY_ERROR });
  }
};

///:userId/favorites/:city

export const del_fav_city_api = (city: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: DEL_FAV_CITY_LOADING });
  try {
    const res = await axios.delete(`${BASE_URL}/api/weather/${userId}/favorites/${city}`);
    dispatch(get_fav_city_api());
    dispatch({type: DEL_FAV_CITY_SUCCESS});
    toast(`${city} city remove from favourite`)

  } catch (error) {
    toast("Something went wrong please try again.")
    dispatch({ type: DEL_FAV_CITY_ERROR });
  }
};



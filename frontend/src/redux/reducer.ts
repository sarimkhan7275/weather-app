import { ADD_FAV_CITY_ERROR, ADD_FAV_CITY_LOADING, ADD_FAV_CITY_SUCCESS, DEL_FAV_CITY_ERROR, DEL_FAV_CITY_LOADING, DEL_FAV_CITY_SUCCESS, GET_FAV_CITY_ERROR, GET_FAV_CITY_LOADING, GET_FAV_CITY_SUCCESS, GET_WEATHER_DATA_ERROR, GET_WEATHER_DATA_LOADING, GET_WEATHER_DATA_SUCCESS } from "./type"

const initialState = {
    weatherData : null,
    weatherData_loading : false,
    weatherData_error : false,

    add_fav_city_loading : false,
    add_fav_city_error : false,

    get_fav_city_loading : false,
    get_fav_city_success : null,
    get_fav_city_error : false,

    del_fav_city_loading : false,
    del_fav_city_error : false
}

export const Reducer = (state=initialState, {type, payload} : any) => {
    switch(type){
        // GET WEATHER
        case GET_WEATHER_DATA_LOADING:{
            return {...state , weatherData_loading : true}
        }
        case GET_WEATHER_DATA_SUCCESS:{
            return {...state , weatherData : payload, weatherData_loading : false, weatherData_error : false }
        }
        case GET_WEATHER_DATA_ERROR : {
            return {...state, weatherData_loading : false, weatherData_error : true, weatherData : null }
        }

        // ADD TO FAV CITY
        case ADD_FAV_CITY_LOADING:{
            return {...state , add_fav_city_loading : true}
        }
        case ADD_FAV_CITY_SUCCESS:{
            return {...state , add_fav_city_loading : false, add_fav_city_error : false }
        }
        case ADD_FAV_CITY_ERROR : {
            return {...state, add_fav_city_loading : false, add_fav_city_error : true }
        }

        // GET FAV CITY
        case GET_FAV_CITY_LOADING:{
            return {...state , get_fav_city_loading : true}
        }
        case GET_FAV_CITY_SUCCESS:{
            return {...state , get_fav_city_success : payload, get_fav_city_loading : false, get_fav_city_error : false }
        }
        case GET_FAV_CITY_ERROR : {
            return {...state, get_fav_city_loading : false, get_fav_city_error : true }
        }

        // DEL FAV CITY
        case DEL_FAV_CITY_LOADING:{
            return {...state , del_fav_city_loading : true}
        }
        case DEL_FAV_CITY_SUCCESS:{
            return {...state , del_fav_city_loading : false, del_fav_city_error : false }
        }
        case DEL_FAV_CITY_ERROR : {
            return {...state, del_fav_city_loading : false, del_fav_city_error : true }
        }

        default: {
            return state
        }
    }
}
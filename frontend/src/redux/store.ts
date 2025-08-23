import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk"; 
import { Reducer } from "./reducer";

const rootReducer = combineReducers({
    Reducer
});


export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = legacy_createStore(rootReducer, applyMiddleware(thunk), );

export default store;

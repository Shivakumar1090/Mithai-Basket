import { combineReducers } from "redux";
import Cart_Reducer from "./cart";
import userReducer from "./user";

const rootreducers = combineReducers({
    cart : Cart_Reducer,
    user: userReducer,
});

export default rootreducers;
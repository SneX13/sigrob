import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";

/* There is o single store in the application, so we use reducer composition instead of many stores to split data
handling logic and combine 2 reducers into one. */
export default combineReducers({
    auth,
    message,
});

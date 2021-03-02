import {createStore} from "redux";
import {reducer} from "./addressReducer";

export const store = createStore(reducer);
import { combineReducers } from "redux";
import { addressReducer } from "./addressReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  address: addressReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

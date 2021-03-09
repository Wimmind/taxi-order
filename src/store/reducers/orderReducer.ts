import { OrderState } from "../../types/orderTypes";
import { OrderActionTypes, OrderAction } from "../../types/orderTypes";

const initialState = {
  crewsInfo: [],
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderAction
) => {
  switch (action.type) {
    case OrderActionTypes.SET_NEW_CREWS_INFO: {
      return {
        crewsInfo: action.payload,
      };
    }
    default:
      return state;
  }
};

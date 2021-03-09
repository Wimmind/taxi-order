import {
  orderInfoType,
  OrderAction,
  OrderActionTypes,
} from "../../types/orderTypes";
import { getCrews } from "../../API";

export const fetchCrewInfo = (order: orderInfoType): OrderAction => {
  const newCrewsInfo = getCrews(order);

  return {
    type: OrderActionTypes.SET_NEW_CREWS_INFO,
    payload: newCrewsInfo,
  };
};

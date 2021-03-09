import crews_info from "./crews";
import {
  crewInfoType,
  orderInfoType,
  generatedOrderType,
} from "./types/orderTypes";

export const makeOrder = (data: generatedOrderType) => {
  const response = {
    code: 0,
    descr: "OK",
    data: {
      order_id: 4,
    },
  };
  setTimeout(() => console.log(response), 1000);
};

export const getCrews = (order: orderInfoType) => {
  return crews_info.map((crew: crewInfoType, index: number) => {
    crew.coords[0] = order.coords[0] + 0.0006 * (index + 1);
    crew.coords[1] = order.coords[1] + 0.0006 * (index + 1);
    return crew;
  });
};

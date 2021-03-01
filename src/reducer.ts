import { Action } from "./actions";

export interface AddressState {
  address: string;
  coords: number[];
}

const initialState = {
  address: "",
  coords: [56.8498, 53.2045],
};

export const reducer = (state: AddressState = initialState, action: Action) => {
  switch (action.type) {
    case "SET_ADDRESS": {
      return { address: action.payload, coords: state.coords };
    }
    default:
      return state;
  }
};

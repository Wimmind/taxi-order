import { AddressState } from "../../types/addressTypes";
import { AddressActionTypes, AddressAction } from "../../types/addressTypes";

const initialState = {
  address: "",
  isValidAddress: true,
  invalidMessage: "",
  coords: [56.840039, 53.219403],
};

export const addressReducer = (
  state: AddressState = initialState,
  action: AddressAction
) => {
  switch (action.type) {
    case AddressActionTypes.SET_ADDRESS: {
      return { ...state, address: action.payload };
    }
    case AddressActionTypes.FETCH_ADDRESS_VALID: {
      return { ...state, isValidAddress: action.payload };
    }
    case AddressActionTypes.SET_INVALID_ADDRESS_MESSAGE: {
      return { ...state, invalidMessage: action.payload };
    }
    case AddressActionTypes.SET_NEW_COORDS: {
      return { ...state, coords: action.payload };
    }
    default:
      return state;
  }
};

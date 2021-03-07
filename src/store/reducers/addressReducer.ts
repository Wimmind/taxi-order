import {
  AddressActionTypes,
  AddressAction,
} from "../actions/addressActions";

export interface AddressState {
  address: string;
  isValidAddress: boolean;
  invalidMessage: string;
  coords: number[];
}

const initialState = {
  address: "Пушкинская 144",
  isValidAddress: true,
  invalidMessage: "",
  coords: [],
};

export const addressReducer = (state: AddressState = initialState, action: AddressAction) => {
  switch (action.type) {
    case AddressActionTypes.SET_ADDRESS: {
      return {
        address: action.payload,
        isValidAddress: state.isValidAddress,
        invalidMessage: state.invalidMessage,
        coords: state.coords,
      };
    }
    case AddressActionTypes.FETCH_ADDRESS_VALID: {
      return {
        address: state.address,
        isValidAddress: action.payload,
        invalidMessage: state.invalidMessage,
        coords: state.coords,
      };
    }
    case AddressActionTypes.SET_INVALID_ADDRESS_MESSAGE: {
      return {
        address: state.address,
        isValidAddress: state.isValidAddress,
        invalidMessage: action.payload,
        coords: state.coords,
      };
    }
    case AddressActionTypes.SET_NEW_COORDS: {
      return {
        address: state.address,
        isValidAddress: state.isValidAddress,
        invalidMessage: state.invalidMessage,
        coords: action.payload,
      };
    }
    default:
      return state;
  }
};

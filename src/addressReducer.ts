import { AddressActionTypes, AddressAction } from "./addressActions";

export interface AddressState {
  address: string;
  isValidAddress: boolean;
  invalidMessage: string;
}

const initialState = {
  address: "Пушкинская 144",
  isValidAddress: true,
  invalidMessage: ""
};

export const reducer = ( state: AddressState = initialState, action: AddressAction) => {
  switch (action.type) {
    case AddressActionTypes.SET_ADDRESS: {
      return { address: action.payload, isValidAddress: state.isValidAddress, invalidMessage: state.invalidMessage  };
    }
    case AddressActionTypes.FETCH_ADDRESS_VALID: {
      return { address: state.address, isValidAddress: action.payload, invalidMessage: state.invalidMessage };
    }
    case AddressActionTypes.SET_INVALID_ADDRESS_MESSAGE: {
      return { address: state.address, isValidAddress: state.isValidAddress, invalidMessage: action.payload };
    }
    default:
      return state;
  }
};

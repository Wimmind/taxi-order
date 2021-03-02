import { AddressActionTypes, AddressAction } from "./actions";

export interface AddressState {
  address: string;
  isValidAddress: boolean;
}

const initialState = {
  address: "",
  isValidAddress: true,
};

export const reducer = (
  state: AddressState = initialState,
  action: AddressAction
) => {
  switch (action.type) {
    case AddressActionTypes.SET_ADDRESS: {
      return { address: action.payload, isValidAddress: state.isValidAddress };
    }
    case AddressActionTypes.FETCH_ADDRESS_VALID: {
      return { address: state.address, isValidAddress: !state.isValidAddress };
    }
    default:
      return state;
  }
};

import { AddressAction, AddressActionTypes } from "../../types/addressTypes";

export const setAddress = (address: string): AddressAction => {
  return {
    type: AddressActionTypes.SET_ADDRESS,
    payload: address,
  };
};

export const toggleValidityAddress = (
  isValidAddress: boolean
): AddressAction => {
  return {
    type: AddressActionTypes.FETCH_ADDRESS_VALID,
    payload: isValidAddress,
  };
};

export const setInvalidAddressMessage = (
  invalidMessage: string
): AddressAction => {
  return {
    type: AddressActionTypes.SET_INVALID_ADDRESS_MESSAGE,
    payload: invalidMessage,
  };
};

export const setCoords = (coords: number[]): AddressAction => {
  return {
    type: AddressActionTypes.SET_NEW_COORDS,
    payload: coords,
  };
};

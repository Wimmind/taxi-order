export enum AddressActionTypes {
  SET_ADDRESS = "SET_ADDRESS",
  FETCH_ADDRESS_VALID = "FETCH_USERS_SUCCESS",
  SET_INVALID_ADDRESS_MESSAGE = "SET_INVALID_ADDRESS_MESSAGE"
}
interface setNewAddressAction {
  type: AddressActionTypes.SET_ADDRESS;
  payload: string;
}
interface toggleValidityAddress {
  type: AddressActionTypes.FETCH_ADDRESS_VALID;
  payload: boolean;
}
interface setInvalidAddressMessage {
  type: AddressActionTypes.SET_INVALID_ADDRESS_MESSAGE;
  payload: string;
}

export type AddressAction = setNewAddressAction | toggleValidityAddress | setInvalidAddressMessage;

export const setNewAddressAction = (address: string): setNewAddressAction => ({
  type: AddressActionTypes.SET_ADDRESS,
  payload: address,
});

export const toggleValidityAddress = (isValidAddress: boolean): toggleValidityAddress => ({
  type: AddressActionTypes.FETCH_ADDRESS_VALID,
  payload: isValidAddress
});

export const setInvalidAddressMessage = (invalidMessage: string): setInvalidAddressMessage => ({
  type: AddressActionTypes.SET_INVALID_ADDRESS_MESSAGE,
  payload: invalidMessage
});

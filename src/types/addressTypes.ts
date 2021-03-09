export interface AddressState {
  address: string;
  isValidAddress: boolean;
  invalidMessage: string;
  coords: number[];
}

export enum AddressActionTypes {
  SET_ADDRESS = "SET_ADDRESS",
  FETCH_ADDRESS_VALID = "FETCH_USERS_SUCCESS",
  SET_INVALID_ADDRESS_MESSAGE = "SET_INVALID_ADDRESS_MESSAGE",
  SET_NEW_COORDS = "SET_NEW_COORDS",
}
interface setNewAddressAction {
  type: AddressActionTypes.SET_ADDRESS;
  payload: string;
}
interface toggleValidityAddressAction {
  type: AddressActionTypes.FETCH_ADDRESS_VALID;
  payload: boolean;
}
interface setInvalidAddressMessageAction {
  type: AddressActionTypes.SET_INVALID_ADDRESS_MESSAGE;
  payload: string;
}
interface setCoordsAction {
  type: AddressActionTypes.SET_NEW_COORDS;
  payload: number[];
}

export type AddressAction =
  | setNewAddressAction
  | toggleValidityAddressAction
  | setInvalidAddressMessageAction
  | setCoordsAction;

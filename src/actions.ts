export enum AddressActionTypes {
  SET_ADDRESS = "SET_ADDRESS",
  FETCH_ADDRESS_VALID = "FETCH_USERS_SUCCESS",
}
interface setNewAddressAction {
  type: AddressActionTypes.SET_ADDRESS;
  payload: string;
}
interface toggleValidityAddress {
  type: AddressActionTypes.FETCH_ADDRESS_VALID;
}

export type AddressAction = setNewAddressAction | toggleValidityAddress;

export const setNewAddressAction = (address: string): setNewAddressAction => ({
  type: AddressActionTypes.SET_ADDRESS,
  payload: address,
});

export const toggleValidityAddress = (): toggleValidityAddress => ({
  type: AddressActionTypes.FETCH_ADDRESS_VALID,
});

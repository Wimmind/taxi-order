export type Action = { type: "SET_ADDRESS"; payload: string };

export const setNewAddressAction = (address: string): Action => ({
  type: "SET_ADDRESS",
  payload: address,
});

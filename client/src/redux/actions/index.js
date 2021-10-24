import { GET_SERVICES } from "./variables";

export const getServices = (payload) => {
  return {
    type: GET_SERVICES,
    payload,
  };
};

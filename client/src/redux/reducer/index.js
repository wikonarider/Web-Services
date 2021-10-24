import { GET_SERVICES } from "../actions/variables";
const initialState = {
  services: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;

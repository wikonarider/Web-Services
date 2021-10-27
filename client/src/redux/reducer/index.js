import { type } from "../actions/variables";
const initialState = {
  services: [],
  users: [],
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    //___________________________________________________________
    case type.GET_SERVICES:
      console.log("Payload en reducer", action.payload);
      console.log("globalState de servicios", state.services);
      return {
        ...state,
        services: payload,
      };

    //_____________________________________________________________
    case type.GET_USERS:
      return { ...state, users: payload };

    default:
      return state;
  }
};

export default rootReducer;

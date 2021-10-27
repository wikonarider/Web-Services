import { type } from "../actions/variables";
const initialState = {
  services: [],
  users:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //___________________________________________________________
    case type.GET_SERVICES:
      console.log("Payload en reducer", action.payload);
      console.log("globalState de servicios", state.services);
      return {
        ...state,
        services: action.payload,
      };

    //_____________________________________________________________

    default:
      return state;
  }
};

export default rootReducer;

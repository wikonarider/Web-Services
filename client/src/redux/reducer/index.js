import { type } from '../actions/variables';

const initialState = {
  services: [],
  users: [],
  groups: [],
  cookies: [],
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    //usar importacion type que incluye las constantes para facilitarte,agregar constantes si es necesario en variables.js ""

    case type.GET_SERVICES:

      console.log("Payload en reducer", payload);
      console.log("globalState de servicios", state.services);

      return {
        ...state,
        services: payload,
      };

    case type.CREATE_SERVICE:
      return { ...state };

    case type.SINGIN_USER:
      return { ...state,
      cookies: action.payload };

    case type.LOGOUT_USER:
      return { ...state };

    case type.GET_USERS:
      return { ...state, users: payload };

    case type.GET_GROUPS:
      return { ...state, groups: action.payload };

    default:
      return state;
  }
};

export default rootReducer;

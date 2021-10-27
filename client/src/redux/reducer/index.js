import { type } from "../actions/variables";
const initialState = {
  services: [],
  users: []
};


const rootReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
//usar importacion type que incluye las constantes para facilitarte,agregar constantes si es necesario en variables.js ""
  
    case type.GET_SERVICES:
      console.log('Payload en reducer',action.payload)
      console.log('globalState de servicios',state.services)
      return {
        ...state,
        services: payload,
      };

     case type.CREATE_SERVICE:
        return { ...state}

     case type.GET_USERS:
        return { ...state,
        users: action.payload}


    default:
      return state;
  }
};

export default rootReducer;

import { GET_SERVICES } from "../actions/variables";
const initialState = {
  services: [],
  users: []
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case GET_SERVICES:
      console.log('Payload en reducer',action.payload)
      console.log('globalState de servicios',state.services)
      return {
        ...state,
        services : action.payload
      };

      case 'CREATE_SERVICE':
        return { ...state}

        case 'GET_USERS':
        return { ...state,
        users: action.payload}


      default:
      return state;
  }
};

export default rootReducer;

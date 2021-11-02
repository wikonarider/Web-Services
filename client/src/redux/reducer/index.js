import { type } from "../actions/variables";

const initialState = {
  services: [],
  user: [],
  groups: [],
  provinces: [],
  favs: [],
  cart: [],
  categories: [],
  cookie: "",
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    //usar importacion type que incluye las constantes para facilitarte,agregar constantes si es necesario en variables.js ""

    case type.GET_SERVICES:
      // usar para testing no mas
      // console.log("Payload en reducer", payload);
      // console.log("globalState de servicios", state.services);

      return {
        ...state,
        services: payload,
      };

    case type.CREATE_SERVICE:
      return { ...state };

    case type.GET_USER_INFO:
      return { ...state, user: payload };

    case type.GET_GROUPS:
      return { ...state, groups: action.payload };

    case type.GET_PROVINCES:
      return { ...state, provinces: action.payload };

    case type.ADD_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    case type.REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter((s) => s.id !== action.payload),
      };

    case type.GET_USER_FAVS:
      return {
        ...state,
        favs: action.payload,
      };

    case type.POST_CATEGORY:
      return {
        ...state,
        categories: payload,
      };

    case type.SET_COOKIE: {
      return {
        ...state,
        cookie: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;

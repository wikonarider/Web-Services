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
  objGlobal: {
    startRange: "",
    endRange: "",
    category: [],
    page: "0",
    pageSize: "20",
    order: "rating",
    type: "DESC",
    province: "",
    city: "",
  },
  convertations: [],
  contacts: [],
  posts: [],
  endPage: false,
  darkTheme: false,
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    //usar importacion type que incluye las constantes para facilitarte,agregar constantes si es necesario en variables.js ""

    case type.GET_SERVICES:
      return {
        ...state,
        services: payload,
        endPage: false,
      };

    case type.SET_SERVICES_PAGE:
      // cheat for pages bug
      const pages = payload.filter(
        (s) => state.services.findIndex((e) => e.id === s.id) === -1
      );
      return {
        ...state,
        services: [...state.services, ...pages],
      };

    case type.SET_END_PAGE:
      return {
        ...state,
        endPage: payload,
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
    case type.SET_CART_STORAGE:
      return {
        ...state,
        cart: payload,
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

    case type.OBJ_GLOBAL:
      return {
        ...state,
        objGlobal: action.payload,
      };

    case type.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case type.GET_CONVERTATIONS:
      return {
        ...state,
        convertations: action.payload,
      };
    case type.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case type.POST_PURCHASE:
      return {
        ...state,
      };

    case type.PAYPAL:
      return {
        ...state,
      };

    case type.PUT_DARK:
      return {
        ...state,
        darkTheme: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;

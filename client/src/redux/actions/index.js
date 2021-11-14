import { type } from './variables';
import urlQuery from './urlQuery';
import axios from 'axios';

//_____________________________________________________________________________________actions service
// usar axios("/route"), no es necesario http://localhost:3001, ya
// esta configurado en el archivo index.js
export function getServices(obj) {
  return async function (dispatch) {
    try {
      var json = await axios(urlQuery(obj));
      // console.log("OBJ", obj);
      // console.log("AXIOS", json.data);
      return dispatch({
        type: type.GET_SERVICES,
        payload: json.data,
        objState: obj,
      });
    } catch (err) {
      return new Error(err);
    }
  };
}

export function getServicesById(id) {
  return async function (dispatch) {
    try {
      var json = await axios(`/services/${id}`);
      return dispatch({
        type: type.GET_SERVICES,
        payload: json.data,
      });
    } catch (err) {
      return new Error(err);
    }
  };
}

export function getGroups() {
  return async function (dispatch) {
    try {
      var json = await axios(`/groups`);
      return dispatch({
        type: type.GET_GROUPS,
        payload: json.data,
      });
    } catch (err) {
      return new Error(err);
    }
  };
}

export function putService(data) {
  return async () => {
    try {
      return await axios.post(`/services`, data);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function deleteService(id) {
  return async () => {
    try {
      return await axios.post(`/services/${id}`);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function createService(body) {
  return async function (dispatch) {
    var json = await axios.post(`/services`, body);
    return dispatch({
      type: type.CREATE_SERVICE,
      payload: json.data,
    });
  };
}

export function setServicesPage(services) {
  return {
    type: type.SET_SERVICES_PAGE,
    payload: services,
  };
}

export function setEndPage(value) {
  return {
    type: type.SET_END_PAGE,
    payload: value,
  };
}

export function postCategory(category) {
  return {
    type: type.POST_CATEGORY,
    payload: category,
  };
}

//_____________________________________________________________________________________actions user
export function postUser(data) {
  return async () => {
    try {
      return await axios.post('/users/', data);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function putUser(newData) {
  return async () => {
    try {
      return await axios.put('/users/', newData);
    } catch (err) {
      return new Error(err);
    }
  };
}
export async function getUserInfo() {
  const response = await axios.get('/users');
  return {
    type: type.GET_USER_INFO,
    payload: response.data,
  };
}

export function banUser(id) {
  return async () => {
    try {
      return await axios.post(`/users/${id}`);
    } catch (err) {
      return new Error(err);
    }
  };
}

// cookie
export const setCookie = (cookie) => {
  return {
    type: type.SET_COOKIE,
    payload: cookie,
  };
};

// favs
export const getUserFavs = async () => {
  const response = await axios(`/favs`);
  return { type: type.GET_USER_FAVS, payload: response.data };
};

//purchase
// export const postPurchase = async (array) => {
//   return async () => {
//     try {
//       return await axios.post(`/checkout`, array);
//     } catch (err) {
//       return new Error(err);
//     }
//   };
// };
export function postPurchase(body) {
  return async function (dispatch) {
    var json = await axios.post(`/checkout`, body);
    window.location.replace(json.data);
    return dispatch({
      type: type.POST_PURCHASE,
      payload: json.data,
    });
  };
}

//_____________________________________________________________________________________actions provinces

export function getProvinces() {
  return async function (dispatch) {
    try {
      var json = await axios(`/provinces`);
      return dispatch({
        type: type.GET_PROVINCES,
        payload: json.data,
      });
    } catch (err) {
      return new Error(err);
    }
  };
}

// Shopping
export function addCart(service) {
  return {
    type: type.ADD_CART,
    payload: service,
  };
}

export function removeCart(idService) {
  return {
    type: type.REMOVE_CART,
    payload: idService,
  };
}

export function setCartStorage(cart) {
  return {
    type: type.SET_CART_STORAGE,
    payload: cart,
  };
}

export function setStatusOrder(status) {
  return {
    type: type.SET_STATUS_ORDER,
    payload: status,
  };
}

// obj global
export function setObjGlobal(obj) {
  return {
    type: type.OBJ_GLOBAL,
    payload: obj,
  };
}
//------------------------------------------------------------------------------------------------------actions chat

//-----------------------------------------------------------------------------------------new convertation
export function newConvertation(contact) {
   return async function (dispatch) {
     try {
       var resp = await axios.post(`chat/convertations/${contact}`);
       return dispatch({ type: type.NEW_CONVERTATION, payload: resp.data });
     } catch (err) {
       console.log(err);
     }
   };
}

//--------------------------------------------------------------------------------------
export function paypal(body) {
  console.log('body=>>> ', body);
  return async function (dispatch) {
    try {
      const response = await axios.post(`/paypal`, body);
      window.location.replace(response.data);
      return dispatch({ type: type.PAYPAL, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

//DARK-MODE
export const putDark = (mode) => {
  return {
    type: type.PUT_DARK,
    payload: mode,
  };
};

export function forgotPassword(body) {
  console.log('body=>>> ', body);
  return async function (dispatch) {
    try {
      const response = await axios.put(`/forgotPassword`, body);
      window.location.replace('https://pf-web-service.vercel.app/home');
      return dispatch({ type: type.FORGOT_PASSWORD, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function ressetPassword(body) {
  return async function (dispatch) {
    var json = await axios.put(`/resetPassword`, body);
    console.log('response resetPassword action', json.data )
    window.location.replace('https://pf-web-service.vercel.app/home');
    return dispatch({
      type: type.RESET_PASSWORD,
      payload: json.data,
    });
  };
}
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
export function getConvertations() {
  return async function (dispatch) {
    try {
      var resp = await axios.get(`chat/convertations`);
      return dispatch({ type: type.GET_CONVERTATIONS, payload: resp.data });
    } catch (err) {
      console.log(err);
    }
  };
}

//-------------------------------------------------------------------------------------------------------clear chat
export function clearChatInfo() {
  return { type: type.CLEAR };
}
//------------------------------------------------------------------------------------get contacts bougth
export function getContactsBougth() {
  return async function (dispatch) {
    try {
      var resp = await axios.get(`chat/contactsBougth`);
      return dispatch({ type: type.GET_CONTACTS_BOUGTH, payload: resp.data });
    } catch (err) {
      console.log(err);
    }
  };
}
//----------------------------------------------------------------------------------get contacts convertation
export function getContacts() {
  return async function (dispatch) {
    try {
      var resp = await axios.get(`chat/contacts`);
      return dispatch({ type: type.GET_CONTACTS, payload: resp.data });
    } catch (err) {
      console.log(err);
    }
  };
}
//------------------------------------------------------------------------------------
export function getPots(idConv, offset) {
  if (!offset) {
    offset = 0;
  }
  return async function (dispatch) {
    try {
      var posts = await axios.get(
        `chat/posts?idConvertation1=${idConv}&offset=${offset}`
      );
      return dispatch({ type: type.GET_POSTS, payload: posts.data });
    } catch (err) {
      console.log(err);
    }
  };
}
//---------------------------------------------------------------------------------delete convertation
export function deleteConvertation(idconvertation) {
  return async () => {
    try {
      return await axios.delete(`chat/convertations/${idconvertation}`);
    } catch (err) {
      return new Error(err);
    }
  };
}
//-----------------------------------------------------------------------------------------new convertation
export function newConvertation(contact) {
  return async function () {
    try {
      return await axios.post(`chat/convertations/${contact}`);
    } catch (err) {
      console.log(err);
    }
  };
}
//-----------------------------------------------------------------------------------------------send message
export function sendMessage(msn) {
  return async function () {
    await axios
      .post(`chat`, msn)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        throw new Error(err);
      });
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

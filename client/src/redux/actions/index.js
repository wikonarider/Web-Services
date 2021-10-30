import { type } from "./variables";
import serviceURL from "./urlQuery";
import axios from "axios";

//_____________________________________________________________________________________actions service
// usar axios("/route"), no es necesario http://localhost:3001, ya
// esta configurado en el archivo index.js
export function getServices(obj) {
  return async function (dispatch) {
    try {
      var json = await axios(serviceURL(obj));
      return dispatch({
        type: type.GET_SERVICES,
        payload: json.data,
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
//_____________________________________________________________________________________actions user
export function postUser(data) {
  return async () => {
    try {
      return await axios.post("/users/", data);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function putUser(newData) {
  return async () => {
    try {
      return await axios.put("/users/", newData);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function getUsers(username) {
  return async (dispatch) => {
    try {
      const res = await axios(`/users?username=${username}`);
      return dispatch({ type: type.GET_USERS, payload: res.data });
    } catch (err) {
      return new Error(err);
    }
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

export function postLogin(body) {
  return async function (dispatch) {
    var json = await axios.post(`/login`, body);
    console.log("json", json.data);
    return dispatch({
      type: type.SINGIN_USER,
      payload: json.data,
    });
  };
}

export function postLogout() {
  return async function (dispatch) {
    var json = await axios.post(`/logout`);
    return dispatch({
      type: type.LOGOUT_USER,
      payload: json,
    });
  };
}

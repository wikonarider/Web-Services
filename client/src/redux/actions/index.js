import { type } from "./variables";
import axios from "axios";
//_____________________________________________________________________________________actions service
export function getServices(title) {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/services?title=${title}`);
    return dispatch({
      type: type.GET_SERVICES,
      payload: json.data,
    });
  };
}
export function getServicesById(id) {
  return async function (dispatch) {
    var json;
    try {
      json = await axios(`http://localhost:3001/services/${id}`);
      return dispatch({
        type: type.GET_SERVICES,
        payload: json.data,
      });
    } catch (err) {
      return new Error(err);
    }
  };
}

export function putService(id, data) {
  return async () => {
    try {
      return await axios.post(`http://localhost:3001/services/${id}`, data);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function deleteService(id) {
  return async () => {
    try {
      return await axios.post(`http://localhost:3001/services/${id}`);
    } catch (err) {
      return new Error(err);
    }
  };
}
//_____________________________________________________________________________________actions user
export function postUser(data) {
  return async () => {
    try {
      return await axios.post("http://localhost:3001/users/", data);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function putUser(newData) {
  return async () => {
    try {
      return await axios.post("http://localhost:3001/users/", newData);
    } catch (err) {
      return new Error(err);
    }
  };
}

export function getUsers(username) {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/users?username=${username}`
      );
      return dispatch({ type: type.GET_USERS, payload: res.data });
    } catch (err) {
      return new Error(err);
    }
  };
}

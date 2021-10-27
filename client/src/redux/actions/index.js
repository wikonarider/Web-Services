import { GET_SERVICES } from "./variables";
import axios from 'axios'

export function getServices(title) {
  return async function (dispatch) {
      var json = await axios(`http://localhost:3001/services?title=${title}`);
      return dispatch({
          type: GET_SERVICES,
          payload: json.data
      })
  }
}

export function createService(body) {
  return async function (dispatch) {
      var json = await axios.post(`http://localhost:3001/services`, body)
      return dispatch({
          type: 'CREATE_SERVICE',
          payload: json.data
      })
  }
}

export function getUsers(username) {
  return async function (dispatch) {
      var json = await axios(`http://localhost:3001/users?username=${username}`);
      return dispatch({
          type: 'GET_USERS',
          payload: json.data
      })
  }
}

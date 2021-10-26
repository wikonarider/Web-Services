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

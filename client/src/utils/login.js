import axios from "axios";

export async function postLogin(body) {
  var json = await axios.post(`/login`, body);
  return json;
}

export async function postLogout() {
  var json = await axios.post(`/logout`);
  return json;
}

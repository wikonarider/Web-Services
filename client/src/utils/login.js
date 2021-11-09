import axios from "axios";

export async function postLogin(body) {
  const res = await axios.post(`/auth/login`, body);
  return res.data;
}

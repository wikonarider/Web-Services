import axios from "axios";
//------------------------------------------------------------------------------------------get convertations
export function getConvertations() {
  var resp;
  try {
    resp = axios.get(`chat/convertations`);
    return resp;
  } catch (error) {
    console.err(error);
  }
}
//------------------------------------------------------------------------------------get contacts bougth
export function getContactsBougth() {
  try {
    var resp = axios.get(`chat/contactsBougth`);
    return resp;
  } catch (err) {
    console.log(err);
  }
}
//----------------------------------------------------------------------------------get contacts convertation
export function getContacts() {
  try {
    var resp = axios.get(`chat/contacts`);
    return resp;
  } catch (err) {
    console.log(err);
  }
}
//------------------------------------------------------------------------------------
export function getPots(idConv, offset) {
  if (!offset) {
    offset = 0;
  }
  try {
    var posts = axios.get(
      `chat/posts?idConvertation1=${idConv}&offset=${offset}`
    );
    return posts;
  } catch (err) {
    console.log(err);
  }
}
//---------------------------------------------------------------------------------delete convertation
export function deleteConvertation(idconvertation) {
  try {
    return axios.delete(`chat/convertations/${idconvertation}`);
  } catch (err) {
    console.log(err);
  }
}
//-----------------------------------------------------------------------------------------new convertation
export function newConvertation(contact) {
  try {
    var resp = axios.post(`chat/convertations/${contact}`);
    return resp;
  } catch (err) {
    console.log(err);
  }
}
//-----------------------------------------------------------------------------------------------send message
export function sendMessage(msn) {
  axios.post(`chat`, msn).catch((err) => {
    console.log(err);
  });
}

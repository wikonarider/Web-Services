import serviceURL from "../redux/actions/urlQuery";
import axios from "axios";

export async function getServicesPage(obj) {
  const response = await axios.get(serviceURL(obj));
  return response.data;
}

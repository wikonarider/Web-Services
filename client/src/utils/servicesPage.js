import serviceURL from '../redux/actions/urlQuery';
import axios from 'axios';

export async function getServicesPage(obj) {
  const response = await axios.get(serviceURL(obj));
  return response.data;
}

export async function getServiceById(id) {
  const response = await axios.get(`/services/${id}`);
  return response.data;
}

export async function getRelatedServices(category) {
  const response = await axios.get(
    `/services?category=${category}&page=0&pageSize=5`
  );
  return response.data;
}

export async function getServicesByIds(array) {
  const response = await axios.get(`/services?ids=${array}`);
  return response.data;
}

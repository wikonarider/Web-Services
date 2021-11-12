import axios from 'axios';

export async function createOrder(array) {
  const response = await axios.post('/orders', { servicesId: array });
  return response.data;
}

export async function getOrder() {
  const response = await axios.get('/orders');
  return response.data;
}

export async function addServiceOrder(id) {
  const response = await axios.put('/orders', { serviceId: id });
  return response.data;
}

export async function removeServiceOrder(id) {
  const response = await axios.delete('/orders', { data: { serviceId: id } });
  return response.data;
}

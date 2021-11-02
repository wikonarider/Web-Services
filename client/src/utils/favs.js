import axios from "axios";

export async function deleteFavs(id) {
  const response = await axios.delete("/favs", { data: { serviceId: id } });
  return response;
}

export async function addFavs(id) {
  const response = await axios.post("/favs", { serviceId: id });
  return response;
}

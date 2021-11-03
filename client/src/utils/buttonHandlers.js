import axios from "axios";

export const handleFav = async (favState, serviceId) => {
  let userId = document.cookie.split("userId=")[1];

  if (favState.filter((f) => serviceId === f.serviceId).length > 0) {
    let deleteResponse = await axios.delete(`/favs`, {
      data: { serviceId, userId },
    });

    if (deleteResponse.status === 200) {
      favState = "deleted";
    }
  } else {
    let postResponse = await axios.post(`/favs`, {
      serviceId,
      userId,
    });

    if (postResponse.status === 200) {
      favState = "posted";
    }
  }

  return favState;
  //   setFav(favState);
};

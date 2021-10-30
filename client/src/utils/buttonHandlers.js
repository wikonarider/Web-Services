import axios from "axios";

export const handleFav = async (favState, serviceId) => {
  let userId = document.cookie.split("=")[1];

  if (favState) {
    let deleteResponse = await axios.delete(`/favs`, {
      data: { serviceId, userId },
    });
    console.log("deleteResponse", deleteResponse);
    if (deleteResponse.status === 200) {
      favState = false;
    }
  } else {
    let postResponse = await axios.post(`/favs`, {
      serviceId,
      userId,
    });
    console.log("postResponse", postResponse);
    if (postResponse.status === 200) {
      favState = true;
    }
  }

  return favState;
  //   setFav(favState);
};

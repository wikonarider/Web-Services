import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, putUser } from "../../../redux/actions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ShareIcon from "@mui/icons-material/Share";

import s from "./UserInfo.module.css";

export default function YourAccount({ userProfile, profileInfo }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userProfile !== true) {
      (async () => {
        dispatch(await getUserInfo());
      })();
    }
  }, [dispatch, userProfile]);

  // eslint-disable-next-line
  const [img, setImg] = useState("");

  //REFERENCIA PARA ESCONDER EL INPUT DE CARGA DE IMAGEN
  const fileInput = useRef();
  //----------------------------------------------------

  //HANDLE IMAGEN CLOUDINARY
  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "hn1tlyfq");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch(
      "https://api.cloudinary.com/v1_1/dzjz8pe0y/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => dispatch(putUser({ userImg: res.secure_url })))
      .catch((err) => console.log(err));
  };
  //--------------------------------------------------------------

  return (
    <div className={userProfile ? s.userProfile : s.user}>
      <div>
        <Avatar
          alt="user name"
          src={!userProfile ? userData.userImg : profileInfo.userImg}
          sx={{ width: 200, height: 200, marginBottom: 2 }}
          className={s.avatar}
        ></Avatar>
        {!userProfile && (
          <div className={s.changePhoto}>
            <input
              style={{ display: "none" }}
              type="file"
              name="myImage"
              ref={fileInput}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <Button
              variant="text"
              size="small"
              color="secondary"
              startIcon={<PhotoCameraIcon />}
              sx={{ marginRight: 1 }}
              onClick={() => {
                fileInput.current.click();
              }}
            >
              Upload
            </Button>

            <Button
              variant="contained"
              // startIcon={<PhotoCameraIcon />}
              size="small"
              color="secondary"
              sx={{ boxShadow: "none", marginLeft: 1 }}
              // onClick={() => {
              //   fileInput.current.click();
              // }}
              onClick={handleImageUpload}
            >
              SUBMIT
            </Button>
          </div>
        )}
      </div>

      <div className={s.userInfo}>
        <div className={s.fullName}>
          <p className={s.name}>
            {!userProfile ? userData.name : profileInfo.name}
          </p>
          <p>{!userProfile ? userData.lastname : profileInfo.lastname}</p>
        </div>
        {!userProfile ? (
          <div>
            <p>{userData.username}</p>
            <p>{userData.email}</p>
          </div>
        ) : (
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            size="small"
            color="secondary"
            sx={{ marginTop: 2 }}
            disableElevation
          >
            Share Profile
          </Button>
        )}
      </div>
    </div>
  );
}

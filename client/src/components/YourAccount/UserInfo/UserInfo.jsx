import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, putUser } from '../../../redux/actions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import s from './UserInfo.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

export default function YourAccount({
  userProfile,
  profileInfo,
  profileServices,
}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userProfile !== true) {
      (async () => {
        dispatch(await getUserInfo());
      })();
    }
  }, [dispatch, userProfile]);

  // eslint-disable-next-line
  const [img, setImg] = useState('');

  //REFERENCIA PARA ESCONDER EL INPUT DE CARGA DE IMAGEN
  const fileInput = useRef();
  //----------------------------------------------------

  //HANDLE IMAGEN CLOUDINARY
  const handleImageUpload = () => {
    setLoading(true);
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('file', files[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'hn1tlyfq');
    const options = {
      method: 'POST',
      body: formData,
    };

    return fetch(
      'https://api.cloudinary.com/v1_1/dzjz8pe0y/image/upload',
      options
    )
      .then((res) => res.json())
      .then((res) => dispatch(putUser({ userImg: res.secure_url })))
      .then(() =>
        getUserInfo()
          .then((userInfo) => dispatch(userInfo))
          .then(() => setLoading(false))
      )
      .catch((err) => console.log(err));
  };
  //--------------------------------------------------------------

  const shareUrl = `https://pf-web-service.vercel.app/users/${profileServices[0].userId}`;

  return (
    <Grid
      container
      gridTemplateColumns="repeat(12, 1fr)"
      alignItems="center"
      justifyContent={!userProfile ? 'center' : 'flex-start'}
      sx={{ marginTop: '2%' }}
      gap={5}
    >
      <Grid item gridColumn="span 6">
        <Avatar
          alt="user name"
          src={!userProfile ? userData.userImg : profileInfo.userImg}
          sx={{ width: 200, height: 200, marginBottom: 2 }}
        ></Avatar>
        {!userProfile && (
          <Box>
            <input
              style={{ display: 'none' }}
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

            {!loading ? (
              <Button
                variant="contained"
                // startIcon={<PhotoCameraIcon />}
                size="small"
                color="secondary"
                sx={{ boxShadow: 'none', marginLeft: 1 }}
                // onClick={() => {
                //   fileInput.current.click();
                // }}
                onClick={handleImageUpload}
              >
                SUBMIT
              </Button>
            ) : (
              <div className={s.spinner}></div>
            )}
          </Box>
        )}
      </Grid>

      <Grid item gridColumn="span 6">
        <Box className={s.fullName} gap={2}>
          <Typography variant="h4">
            {!userProfile ? userData.name : profileInfo.name}
          </Typography>
          <Typography variant="h4">
            {!userProfile ? userData.lastname : profileInfo.lastname}
          </Typography>
        </Box>
        {!userProfile ? (
          <>
            <Box sx={{ marginBottom: 1, marginTop: 1 }}>
              <Typography variant="body">{userData.username}</Typography>
            </Box>
            <Box>
              <Typography variant="body">{userData.email}</Typography>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            gap="0.5rem"
          >
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={35} round={true} />
            </WhatsappShareButton>
            {/* <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={35} round={true} />
            </LinkedinShareButton> */}
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

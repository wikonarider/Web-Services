import React, { useEffect, useRef, useState } from 'react';

import s from './YourAccount.module.css';

//-------------- MATERIAL UI -------------------------------------
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//-------------------------------------------------------
import CardService from '../CardService/CardService';
import { FormDialog } from './FormDialog/FormDialog';
import { getUserInfo, getUserFavs } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ModalCreateService from './ModalCreateService';
import AccountNav from './AccountNav/AccountNav';
import UserInfo from './UserInfo/UserInfo';
import Botonera from './Botonera/Botonera';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function YourAccount({ userProfile }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      dispatch(await getUserInfo());
      dispatch(await getUserFavs());
    })();

    // eslint-disable-next-line
  }, []);

  //BOTONES --> YOUR ORDERS - YOUR FAVS - YOUR SERVICES
  const [viewServices, setViewservices] = useState(false);
  const [viewOrders, setViewOrders] = useState(false);
  const [viewFavs, setViewFavs] = useState(false);
  //----------------------------------------------

  //MODAL FORM PARA CAMBIAR DATOS
  const [openForm, setOpenForm] = useState(false);
  const [modal, setModal] = useState(false);
  //-----------------------------------

  //-------------------------------
  // eslint-disable-next-line
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      {!userProfile && <AccountNav />}

      <UserInfo userProfile={userProfile} />

      {!userProfile && (
        <Botonera
          viewServices={viewServices}
          viewOrders={viewOrders}
          viewFavs={viewFavs}
          setViewFavs={setViewFavs}
          setViewOrders={setViewOrders}
          setViewservices={setViewservices}
          // --------------------------------
          openForm={openForm}
          modal={modal}
          setOpenForm={setOpenForm}
          setModal={setModal}
        />
      )}

      {/* -------------------FAVS------------------------ */}
      {viewFavs &&
        (userData.servicesFavs.length > 0 ? (
          <Container>
            <div>
              <Grid container justifyContent="center" spacing={3}>
                {userData.servicesFavs.map((s) => (
                  <Grid item key={s.id}>
                    <CardService service={s} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Container>
        ) : (
          <div className={s.addFavContainer}>
            <h3>Your Fav-list is currently empty</h3>
            <div className={s.addToFav}>
              <p>
                Add Services that you like and want to see later by clicking on
                the
              </p>
              <FavoriteIcon sx={{ marginLeft: 1 }} />
            </div>
          </div>
        ))}
      {/* ------------------------------------------------ */}
      {/* ------------------ORDERS---------------------------- */}
      {viewOrders && (
        <Container>
          <div>
            <h1>YOUR ORDERS</h1>
          </div>
        </Container>
      )}
      {/* ----------------------------------------------------- */}
      {/* -------------------SERVICES-------------------------- */}
      {viewServices &&
        (userData.servicesOwn && userData.servicesOwn.length > 0 ? (
          <div>
            <Container>
              <Grid container justifyContent="center" spacing={3}>
                {userData.servicesOwn.map((s) => (
                  <Grid item key={s.id}>
                    <CardService service={s} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        ) : (
          <div className={s.addFavContainer}>
            <h3>You are currently not offering any services</h3>
            <div className={s.addToFav}>
              <p>
                Post Services that you want to offer by clicking on POST SERVICE
              </p>
            </div>
          </div>
        ))}
      {/* ---------------------------------------------- */}
      <FormDialog setOpenForm={setOpenForm} openForm={openForm} />
      <ModalCreateService modal={modal} setModal={setModal} />
    </div>
  );
}

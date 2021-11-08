import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { deleteFavs, addFavs } from "../../utils/favs";
import { getUserInfo, addCart } from "../../redux/actions/index";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Comments from "../Comments/Comments";
import RelatedServices from "./RelatedServices/RelatedServices";
import RightInfoBar from "./RightInfoBar/RightInfoBar";
import Typography from "@mui/material/Typography";

export default function DetailService({ id, closeModal }) {
  let [service, setService] = useState({ service: {}, user: {} });
  const [favState, setFavState] = useState(false);
  const [added, setAdded] = useState(false);

  // ---------------- SERVICIOS RELACIONADOS -------------
  const [category, setCategory] = useState();
  const [related, setRelated] = useState([]);
  // --------------------------------

  const cart = useSelector((state) => state.cart);
  const cookie = useSelector((state) => state.cookie);
  const favs = useSelector((state) => state.user.servicesFavs);
  const dispatch = useDispatch();

  function updateService() {
    axios(`/services/${id}`).then((response) => {
      setService({ ...service, ...response.data });
      setCategory(response.data.service.category.name);
    });
  }

  useEffect(() => {
    if (cookie) {
      if (favs) {
        const index = favs.findIndex((f) => f.id === Number(id));
        if (index === -1) {
          setFavState(() => false);
        } else {
          setFavState(() => true);
        }
      }
    }
  }, [favs, cookie, id]);

  //componentDidMount para traer la información del servicio por id
  useEffect(() => {
    updateService();
    // eslint-disable-next-line
  }, [id]);

  //----------- SERVICIOS RELACIONADOS ------------------------
  const getRelatedServices = useCallback(() => {
    axios(`/services?category=${category}`).then((response) => {
      let NumberId = Number(id);
      setRelated(response.data.filter((s) => s.id !== NumberId).slice(0, 4));
    });
  }, [category, id]);

  useEffect(() => {
    getRelatedServices();
  }, [category, getRelatedServices, id]);
  //-------------------------------------------------------

  // para agregarlo o sacarlo del carrito
  useEffect(() => {
    const index = cart.findIndex((s) => s.id === id);
    if (index === -1) {
      setAdded(() => false);
    } else {
      setAdded(() => true);
    }
  }, [cart, id]);

  // onClick del carrito
  const handleClick = () => {
    if (!added) {
      const service = {
        title,
        img,
        price,
        id,
      };
      dispatch(addCart(service));
      setAdded(() => true);
    }
  };

  //-------------------HANDLE FAVS-------------------------
  const handleFavs = async () => {
    try {
      if (cookie) {
        if (favState) {
          await deleteFavs(Number(id));
          setFavState(() => false);
          dispatch(await getUserInfo());
        } else {
          await addFavs(Number(id));
          setFavState(() => true);
          dispatch(await getUserInfo());
        }
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };
  //-----------------------------------------

  const IMG_TEMPLATE =
    "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

  let { img, title, price, qualifications } = service.service;

  //-------------------------------------------

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        p={2}
        maxWidth="80%"
        m="0px auto"
      >
        {/* ----------------- FOTO Y COMENTARIOS ------------------------- */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 8" }}
          p={{ xs: 0, sm: 2 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <CardMedia
            component="img"
            image={img ? img : IMG_TEMPLATE}
            height="400"
            alt={id}
            sx={{
              objectFit: "cover",
              mb: "auto",
              pb: 5,
            }}
          />

          {qualifications && qualifications.length ? (
            <Comments
              updateService={updateService}
              serviceId={id}
              qualifications={qualifications}
              cookie={cookie}
            />
          ) : (
            <Box border="solid 1px lightgrey" p="20px">
              <Typography variant="h5">No comments</Typography>
            </Box>
          )}
        </Box>
        {/* ----------------------------------------------------- */}

        {/* ---------------------- BARRA LATERAL DERECHA ------------------- */}
        <RightInfoBar
          handleFavs={handleFavs}
          handleClick={handleClick}
          cookie={cookie}
          service={service}
          favState={favState}
          added={added}
        />
        {/* ------------------------------------------------------ */}
      </Box>

      {related && <RelatedServices related={related} />}
    </>
  );
}

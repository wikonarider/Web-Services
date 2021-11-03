import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions";
import Avatar from "@mui/material/Avatar";
import Nav from "../Nav/Nav";
import ShareIcon from "@mui/icons-material/Share";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import CardService from "../CardService/CardService";

import s from "./UserProfile.module.css";
import YourAccount from "../YourAccount/YourAccount";

export default function UserProfile({ id }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      dispatch(await getUserInfo());
    })();
  }, []);

  return (
    <div>
      <Nav />
      <div className={s.account}>
        <YourAccount userProfile={true} />
      </div>
      <div>
        {userData.servicesOwn &&
          (userData.servicesOwn.length > 0 ? (
            <div>
              <div className={s.publishedServices}>
                <p>Published Services</p>
              </div>
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
            </div>
          ) : (
            <div className={s.addFavContainer}>
              <h3>This user is not offering any other setViewservices</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

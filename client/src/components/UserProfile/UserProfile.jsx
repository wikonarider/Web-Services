import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CardService from "../CardService/CardService";

import s from "./UserProfile.module.css";
import YourAccount from "../YourAccount/YourAccount";


export default function UserProfile({ id, username }) {
  const [profileInfo, setProfileInfo] = useState({});
  const [profileServices, setProfileServices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`/services?userId=${id}`).then((response) => {
      setProfileServices(response.data[1]);
      setProfileInfo(response.data[0]);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <div className={s.account}>
        <YourAccount userProfile={true} profileInfo={profileInfo} />
      </div>
      <div>
        {profileServices &&
          (profileServices.length > 0 ? (
            <div>
              <div className={s.publishedServices}>
                <p>Published Services</p>
              </div>
              <div>
                <Container>
                  <Grid container justifyContent="center" spacing={3}>
                    {profileServices.map((s) => (
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
              <h3>This user is not offering any services</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

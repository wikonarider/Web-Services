import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import CardService from '../CardService/CardService';
import Box from '@mui/material/Box';
import s from './UserProfile.module.css';
import YourAccount from '../YourAccount/YourAccount';
import Typography from '@mui/material/Typography';

export default function UserProfile({ id, username }) {
  const [profileInfo, setProfileInfo] = useState({});
  const [profileServices, setProfileServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`/services?userId=${id}`)
      .then((response) => {
        setProfileServices(response.data[1]);
        setProfileInfo(response.data[0]);
        setLoading(false);
      })
      .catch((e) => console.log(e.response.data));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {profileServices.length ? (
        <Grid
          container
          gridTemplateColumns="repeat(12, 1fr)"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            gridColumn="span 12"
            sx={{ marginTop: '6%', marginRight: 'auto', marginLeft: '10%' }}
          >
            <YourAccount
              userProfile={true}
              profileInfo={profileInfo}
              profileServices={profileServices}
            />
          </Grid>
          <Grid item gridColumn="span 12" sx={{ marginBottom: '5%' }}>
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
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h3">No User Found</Typography>
      )}
    </Box>
  );
}

import React from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function About() {
  return (
    <div>
      <Box
        display="inline"
        flexWrap="wrap"
        flexDirection="row"
        height="min-content"
        justifyContent="center"
      >
        <Typography
          variant="h3"
          component="h2"
          color="secondary"
          marginTop="2%"
        >
          ABOUT
        </Typography>
        <Typography variant="h6" color="#8d6e63" marginTop="2%">
          Proyecto final de bootcamp, Ecommerce realizado en conjunto.
          Tecnologías implementadas: React Redux, Express, Sequelize, Material
          UI, CSS.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: 1,
            m: 1,
          }}
        >
          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/claudioCMW`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/claudio-wusinowski-2884641a3/`)
              }
            />
            <ListItemText primary={"Claudio Miguel Wusinowski"} />
          </ListItemIcon>

          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/Facupelli`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/facundo-pellicer-full-stack-developer/`)
              }
            />
            <ListItemText primary={"Facundo Pellicer"} />
          </ListItemIcon>

          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/Fedex159`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/federico-avelin-dev/`)
              }
            />
            <ListItemText primary={"Federico Avelin"} />
          </ListItemIcon>

          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/Franco1312`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/franco-kail-219259215`)
              }
            />
            <ListItemText primary={"Franco Kail"} />
          </ListItemIcon>

          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/jonatansegovia`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/jonatan-segovia-dev/`)
              }
            />
            <ListItemText primary={"Jonatan Segovia"} />
          </ListItemIcon>

          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/wikonarider`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/micaela-montero-295141217`)
              }
            />
            <ListItemText primary={"Micaela Montero"} />
          </ListItemIcon>

          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/stobar93`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/sebastiantobar-fullstack-dev/`)
              }
            />
            <ListItemText primary={"Sebastian Tobar"} />
          </ListItemIcon>

          <ListItemIcon>
            <GitHubIcon
              onClick={() =>
                (window.location.href = `https://github.com/valentinjara27`)
              }
            />
            <LinkedInIcon
              onClick={() =>
                (window.location.href = `https://www.linkedin.com/in/valentin-jara-fullstackdeveloper/`)
              }
            />
            <ListItemText primary={"Valentin Jara"} />
          </ListItemIcon>
        </Box>
      </Box>
    </div>
  );
}

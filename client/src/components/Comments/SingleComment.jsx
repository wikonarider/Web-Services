import React, { useState } from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { IconButton } from "@mui/material";
import { parseDate } from "../../utils/timeFormatter";
import Rating from "@mui/material/Rating";

export default function SingleComment({ qualification }) {
  let [wrap, setWrap] = useState(true);

  const IMG_TEMPLATE =
    "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

  let { comment, score, createdAt, id } = qualification;
  let { userImg, name, lastname } = qualification.user;

  return (
    <Box
      id={id}
      key={id}
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={1}
      sx={{ m: "5px 0px" }}
    >
      <Box gridColumn="span 1">
        <CardMedia
          component="img"
          height="50px"
          image={userImg ? userImg : IMG_TEMPLATE}
          alt={`${name} ${lastname}`}
          sx={{
            objectFit: "contain",
            borderRadius: "20%",
            height: "minContent",
            width: "100%",
            m: "5px auto",
          }}
        />
      </Box>
      <Box gridColumn="span 11" sx={{ textAlign: "justify" }}>
        <Box
          gridColumn="span 12"
          sx={{
            textAlign: "justify",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography variant="subtitle2">
            {`${name} ${lastname}`}
            <Typography variant="caption">
              {` - ${parseDate(createdAt)}`}
            </Typography>
          </Typography>
          <Rating
            name="rating"
            value={score}
            readOnly
            precision={0.5}
            sx={{ ml: "auto" }}
          />
        </Box>

        {comment.length > 0 && (
          <Box
            gridColumn="span 12"
            sx={{ textAlign: "justify", display: "flex", flexDirection: "row" }}
          >
            <Typography variant="body2" noWrap={wrap}>
              {comment}
            </Typography>
          </Box>
        )}

        <CardActions disableSpacing sx={{ p: "0px" }}>
          <IconButton
            onClick={() => setWrap(!wrap)}
            aria-label="share"
            sx={{ mr: "0px auto 0px auto", p: "0px" }}
          >
            <Typography variant="caption" sx={{ p: "0px" }}>
              {comment.length < 100 ? "" : wrap ? "See more..." : "See less"}
            </Typography>
          </IconButton>
        </CardActions>
      </Box>
    </Box>
  );
}

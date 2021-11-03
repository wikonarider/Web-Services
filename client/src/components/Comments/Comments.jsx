import React, { useState } from "react";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SingleComment from "./SingleComment";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function Comments({
  qualifications,
  serviceId,
  updateService,
  cookie,
}) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  function handleClick(comment, rating, serviceId) {
    let userId = document.cookie.split("userId=")[1];
    if (rating > 0) {
      setLoading(true);
      axios
        .post("/qualification", {
          comment: comment,
          score: rating,
          userId: userId,
          serviceId: serviceId,
        })
        .then(() => updateService())
        .then(() => {
          setLoading(false);
          setComment("");
          setRating(null);
        })
        .catch((e) => {
          alert("Please try again");
          setLoading(false);
        });
    }
  }

  function handleChange(event) {
    let value = event.target.value;
    setComment(value);
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={1}
      p={2}
      border="solid 1px lightgrey"
      maxWidth="100%"
      m="10px auto"
    >
      {cookie && (
        <>
          <Box gridColumn="span 12" display="flex" flexDirection="row">
            <Typography
              variant="subtitle1"
              sx={{ alignSelf: "center", mr: "5px" }}
            >
              Rating:
            </Typography>
            <Rating
              name="rating"
              value={rating}
              precision={1}
              size="large"
              onChange={(event, newValue) => {
                setRating((rating) => newValue);
              }}
            />

            <Typography
              variant="h5"
              sx={{ pl: "10px", verticalAlign: "middle" }}
            >
              {`${rating} stars`}
            </Typography>
          </Box>

          <Box gridColumn="span 10">
            <TextareaAutosize
              minRows={4}
              maxRows={8}
              aria-label="comment area"
              placeholder="Leave your comment here..."
              style={{ width: "100%" }}
              value={comment}
              onChange={(event) => handleChange(event)}
            />
          </Box>

          <Box gridColumn="span 2">
            <Button
              onClick={() => handleClick(comment, rating, serviceId)}
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              {loading ? "Wait" : "Send"}
            </Button>
          </Box>
        </>
      )}
      <Box gridColumn="span 12">
        {qualifications &&
          qualifications.map((q) => {
            return <SingleComment qualification={q} />;
          })}
      </Box>
    </Box>
  );
}

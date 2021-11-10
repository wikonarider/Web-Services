import React, { useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SingleComment from "./SingleComment";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { getServiceById } from "../../utils/servicesPage";
import { Popover } from "@mui/material";

export default function Comments({
  qualifications,
  serviceId,
  cookie,
  setService,
}) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const cookieRedux = useSelector((state) => state.cookie);
  const servicesBought = useSelector((state) => state.user.servicesBought);
  // const admin = useSelector((state) => state.user.admin);

  // -------------  POPOVER SATE ------------------
  const [anchorElRate, setAnchorElRate] = React.useState(null);
  const [anchorElComment, setAnchorElComment] = React.useState(null);
  const starsRef = useRef();
  const commentBoxRef = useRef();

  //--------------------------------------------

  //------ POPOVERS ----------------------

  const handleClosePopoverRate = () => {
    setAnchorElRate(null);
  };
  const openPopoverRate = Boolean(anchorElRate);
  const idRate = openPopoverRate ? "simple-popover" : undefined;

  const handleClosePopoverComment = () => {
    setAnchorElComment(null);
  };
  const openPopoverComment = Boolean(anchorElComment);
  const idComment = openPopoverComment ? "simple-popover" : undefined;

  //---------------------------------

  function handleClick(comment, rating, serviceId) {
    let userId = cookieRedux;

    if (!rating && !comment) {
      setAnchorElRate(starsRef.current);
      setAnchorElComment(commentBoxRef.current);
    } else if (!rating) {
      setAnchorElRate(starsRef.current);
    } else if (!comment) {
      setAnchorElComment(commentBoxRef.current);
    } else if (rating > 0 && comment) {
      setLoading(true);
      axios
        .post("/qualification", {
          comment: comment,
          score: rating,
          userId: userId,
          serviceId: serviceId,
        })
        .then(() => {
          getServiceById(serviceId)
            .then((data) =>
              setService({ service: data.service, user: data.user })
            )
            .catch((e) => console.log(e.response.data.message));
        })
        .then(() => {
          setLoading(false);
          setComment("");
          setRating(0);
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

  let buyer =
    servicesBought &&
    servicesBought.filter((s) => {
      console.log(s.id, serviceId);
      return s.id.toString() === serviceId;
    }).length > 0;

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={1}
      p={2}
      border="solid 1px lightgrey"
    >
      {cookie && buyer ? (
        <>
          <Box
            gridColumn="span 12"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography
              ref={starsRef}
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
              variant="subtitle1"
              sx={{ pl: "10px", verticalAlign: "middle" }}
            >
              {`${rating} stars`}
            </Typography>
          </Box>

          <Box
            gridColumn={{
              xs: "span 12",
              sm: "span 12",
              md: "span 12",
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <TextareaAutosize
              ref={commentBoxRef}
              minRows={4}
              maxRows={8}
              aria-label="comment area"
              placeholder="Leave your comment here..."
              style={{ width: "85%", resize: "vertical" }}
              value={comment}
              onChange={(event) => handleChange(event)}
            />
            <Button
              onClick={() => handleClick(comment, rating, serviceId)}
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              {loading ? "Wait" : "Send"}
            </Button>
          </Box>
        </>
      ) : null}


      <Box gridColumn="span 12" display='flex' flexDirection='column-reverse' >
      {/* ----------POPOVER RATE FIRST-------------------------- */}
      <Popover
        id={idRate}
        open={openPopoverRate}
        anchorEl={anchorElRate}
        onClose={handleClosePopoverRate}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, color: "#FF6F00" }}>
          You have to rate the service!
        </Typography>
      </Popover>
      {/* --------------------------------------------------------- */}

      {/* ----------POPOVER COMMENT FIRST-------------------------- */}
      <Popover
        id={idComment}
        open={openPopoverComment}
        anchorEl={anchorElComment}
        onClose={handleClosePopoverComment}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, color: "#FF6F00" }}>
          You have to leave a comment!
        </Typography>
      </Popover>
      {/* --------------------------------------------------------- */}

      <Box gridColumn="span 12">

        {qualifications && qualifications.length ? (
          qualifications.map((q, index) => {
            return <SingleComment qualification={q} key={index} />;
          })
        ) : (
          <Typography variant="h5">No comments</Typography>
        )}
      </Box>
    </Box>
  );
}

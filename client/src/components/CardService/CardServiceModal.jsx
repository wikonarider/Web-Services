import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from "@mui/material/IconButton";
import { height } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCardService({ modal, setModal}) {

  const handleClose = () => {
    setModal(false);
  };



var dir = window.document.URL;
var dir2 = encodeURIComponent(dir);
var tit = window.document.title;
var tit2 = encodeURIComponent(tit);






  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <h3>Share with</h3>
          <IconButton
          href={`https://www.facebook.com/sharer/sharer.php?u='+${dir2}+'&t='+${tit2}+''`}>
    
        <FacebookIcon color='primary'  style={{ width: "80px" , height: "80px"}} /> 
        Facebook
        </IconButton>
       
        </Box>
      </Modal>
    </div>
  );
}


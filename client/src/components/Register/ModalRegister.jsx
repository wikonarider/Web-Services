import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignitems: "center",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  bgcolor: "background.paper",
  boxShadow: 24,
};

function ModalRegister({ modal, setModal, message, handleRedirect }) {
  const handleClose = () => {
    setModal(false);
    handleRedirect && handleRedirect();
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalRegister;

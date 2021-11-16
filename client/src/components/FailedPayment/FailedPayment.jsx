import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

// import ResetPasswordModal from './ResetPasswordModal'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  textAlign: "center",
  p: 6,
  display: "block",
};

export default function FailedPayment() {
  return (
    <div>
      <Box sx={style}>
        <Typography variant="h2" component="h2">
          Oh, it seems your payment has failed
        </Typography>

        <SmsFailedIcon sx={{ width: "50%", height: "80%"}} color="primary" />


        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={() => window.location.replace("/home")}
          sx={{
            marginTop: 3,
          }}
        >
          Back to home
        </Button>
      </Box>
    </div>
  );
}

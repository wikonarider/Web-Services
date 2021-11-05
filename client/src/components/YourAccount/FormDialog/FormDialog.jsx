import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { putUser } from "../../../redux/actions";
import s from "./FormDialog.module.css";

export function FormDialog({ openForm, setOpenForm }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(putUser(input));
      setInput({
        name: "",
        lastname: "",
        password: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle>CHANGE YOUR DATA</DialogTitle>
          <DialogContent>
            <TextField
              label="New Name"
              variant="filled"
              onChange={(e) => handleInputChange(e)}
              name="name"
              sx={{ display: "block", marginTop: 2, marginBottom: 2 }}
            />
            <TextField
              label="New LastName"
              variant="filled"
              onChange={(e) => handleInputChange(e)}
              name="lastname"
              sx={{ display: "block", marginTop: 2, marginBottom: 2 }}
            />
            <TextField
              label="New Password"
              variant="filled"
              type="password"
              onChange={(e) => handleInputChange(e)}
              name="password"
              sx={{ display: "block", marginTop: 2, marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenForm(false);
                refreshPage();
              }}
              type="submit"
              variant="contained"
              sx={{ margin: "auto" }}
            >
              SUBMIT
            </Button>
          </DialogActions>
        </form>
    </Dialog>
  );
}

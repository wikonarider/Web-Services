import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { putUser } from "../../../redux/actions";
import s from "./FormDialog.module.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  textfield: {
    marginTop: 10,
    marginBottom: 20,
    display: "block",
  },
});

export function FormDialog({ openForm, setOpenForm }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    password: "",
  });

  console.log(input);

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
    console.log("submit");
  };

  return (
    <Dialog
      open={openForm}
      onClose={() => setOpenForm(false)}
      className={s.form}
    >
      <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
        <DialogTitle>CHANGE YOUR DATA</DialogTitle>
        <DialogContent>
          <TextField
            label="New Name"
            variant="filled"
            onChange={(e) => handleInputChange(e)}
            name="name"
            className={classes.textfield}
          />
          <TextField
            label="New LastName"
            variant="filled"
            onChange={(e) => handleInputChange(e)}
            name="lastname"
            className={classes.textfield}
          />
          <TextField
            label="New Password"
            variant="filled"
            type="password"
            onChange={(e) => handleInputChange(e)}
            name="password"
            className={classes.textfield}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenForm(false)}
            type="submit"
            variant="contained"
            className={s.submit}
            sx={{ margin: "auto" }}
          >
            SUBMIT
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import s from "./FormDialog.module.css";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { putUserAlter, getUserInfo } from "../../../redux/actions";
import { validateUserData } from "./ValidForm";

export function FormDialog({ openForm, setOpenForm }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setInput(() => {
      const obj = {
        ...input,
        [e.target.name]: e.target.value,
      };
      setErrors(validateUserData(obj));
      return obj;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      putUserAlter(input).then(() => {
        getUserInfo()
          .then((userInfo) => dispatch(userInfo))
          .catch((e) => console.log(e));
      });
      setInput({
        name: "",
        lastname: "",
        password: "",
      });
      setOpenForm(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
      <form className={s.changeData}>
        <h2>CHANGE YOUR DATA</h2>
        <TextField
          fullWidth
          label="New Name"
          variant="filled"
          error={errors.name ? true : false}
          helperText={errors.name}
          onChange={(e) => handleInputChange(e)}
          name="name"
        />
        <TextField
          fullWidth
          label="New LastName"
          variant="filled"
          error={errors.lastname ? true : false}
          helperText={errors.lastname}
          onChange={(e) => handleInputChange(e)}
          name="lastname"
        />
        <TextField
          fullWidth
          label="New Password"
          variant="filled"
          error={errors.password ? true : false}
          helperText={errors.password}
          type="password"
          onChange={(e) => handleInputChange(e)}
          name="password"
        />

        <Button
          disabled={Object.keys(errors).length > 0}
          onClick={(e) => {
            handleSubmit(e);
          }}
          color="secondary"
          type="submit"
          variant="contained"
          sx={{ mb: "25px" }}
        >
          SUBMIT
        </Button>
      </form>
    </Dialog>
  );
}

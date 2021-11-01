import React, { useState } from "react";
import s from "./Login.module.css";
import { TextField, Button } from "@mui/material";
import { validateLogin } from "../../utils/registerValidations";
import { postLogin } from "../../utils/login";
import { useDispatch } from "react-redux";
import { setCookie } from "../../redux/actions";

function Login({ setLogin, setLoginModal }) {
  const dispatch = useDispatch();
  const [start, setStart] = useState(true);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [inputsErrors, setInputErrors] = useState({});

  const handleChange = (e) => {
    if (start) {
      setStart(() => false);
    }
    setInputs((prev) => {
      //guard el input modificado
      const input = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      // seteo los errores
      setInputErrors(() => {
        return validateLogin(input);
      });
      // seteo el estado
      return input;
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await postLogin(inputs);

      setInputs({
        username: "",
        password: "",
      });

      setLogin(() => true);
      setLoginModal(() => false);
      dispatch(setCookie(document.cookie));
    } catch (e) {
      setInputErrors(() => {
        let error = {};
        if (e.response.data === "user incorrect") {
          error.username = "User incorrect";
        } else {
          error.password = "Password incorrect";
        }
        return error;
      });
    }
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          error={inputsErrors.username ? true : false}
          helperText={inputsErrors.username}
          name="username"
          value={inputs.username}
          label="Username"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          error={inputsErrors.password ? true : false}
          helperText={inputsErrors.password}
          name="password"
          value={inputs.password}
          label="Password"
          type="password"
          variant="outlined"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={Object.keys(inputsErrors).length ? true : false}
        >
          Sing in
        </Button>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import s from "./Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { validateLogin } from "../../utils/registerValidations";
import { postLogin } from "../../utils/login";
import { useDispatch } from "react-redux";
import { setCookie } from "../../redux/actions";
import Divider from "@mui/material/Divider";

function Login({ setLogin, setLoginModal, setRegisterModal }) {
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

      setLoginModal(() => false);
      dispatch(setCookie(document.cookie));
      setLogin && setLogin(true);
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

  const handleCreateAccount = () => {
    setRegisterModal((prev) => !prev);
    setLoginModal((prev) => !prev);
  };

  return (
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
        sx={{ marginTop: "4%", marginBottom: "4%" }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={Object.keys(inputsErrors).length ? true : false}
        fullWidth={true}
      >
        Sing in
      </Button>

      <Divider
        sx={{
          width: "100%",
          border: "1px solid rgba(0,0,0,.1)",
          borderRadius: 12,
          marginBottom: "5%",
          marginTop: "5%",
        }}
      />

      <div className={s.new}>
        <p>New to WebService?</p>

        <Button
          variant="outlined"
          color="secondary"
          disableElevation
          size="small"
          sx={{ marginRight: "4%" }}
          onClick={handleCreateAccount}
        >
          CREATE ACCOUNT
        </Button>
      </div>
    </form>
  );
}

export default Login;

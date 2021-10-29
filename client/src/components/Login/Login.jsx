import React, { useState } from "react";
import s from "./Login.module.css";
import { TextField, Button } from "@mui/material";
import { validateInput } from "../../utils/registerValidations";
import { useDispatch } from "react-redux";
import { postLogin } from "../../redux/actions";
import { useHistory } from "react-router-dom";

function Singin() {
  const dispatch = useDispatch();
  const history = useHistory();
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
        return validateInput(input);
      });
      // seteo el estado
      return input;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postLogin(inputs));

    setInputs({
      username: "",
      password: "",
    });

    history.push("/");
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
        <Button type="submit" variant="contained">
          Sing in
        </Button>
      </form>
    </div>
  );
}

export default Singin;

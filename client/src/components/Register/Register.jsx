import React, { useState } from "react";
import s from "./Register.module.css";
import { TextField, Button } from "@mui/material";
import { validateInput, registerUser } from "../../utils/registerValidations";

function Register() {
  const [start, setStart] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    location: "",
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
    try {
      e.preventDefault();
      if (!Object.keys(inputsErrors).length) {
        const user = { ...inputs, location: [inputs.location], userImg: "" };
        const response = await registerUser(user);
        if (response.response === "created") {
          setInputs({
            name: "",
            lastname: "",
            username: "",
            password: "",
            email: "",
            location: "",
          });
          setInputErrors({});
          setStart(true);
        }
      }
    } catch (e) {
      setInputErrors((prev) => {
        return {
          ...prev,
          username: "username or email already exist or is empty",
          email: "username or email already exist or is empty",
        };
      });
    }
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          error={inputsErrors.name ? true : false}
          helperText={inputsErrors.name}
          name="name"
          value={inputs.name}
          label="Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          error={inputsErrors.lastname ? true : false}
          helperText={inputsErrors.lastname}
          name="lastname"
          value={inputs.lastname}
          label="Lastname"
          variant="outlined"
          onChange={handleChange}
        />
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
        <TextField
          required
          fullWidth
          error={inputsErrors.email ? true : false}
          helperText={inputsErrors.email}
          name="email"
          value={inputs.email}
          label="Email"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          error={inputsErrors.location ? true : false}
          helperText={inputsErrors.location}
          name="location"
          value={inputs.location}
          label="Location"
          variant="outlined"
          onChange={handleChange}
        />

        <Button
          disabled={
            start ? true : !Object.keys(inputsErrors).length ? false : true
          }
          type="submit"
          variant="contained"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;

import React, { useState } from "react";
import s from "./Register.module.css";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { validateInput, registerUser } from "../../utils/registerValidations";
import ModalRegister from "./ModalRegister";

function Register({ setRegisterModal, handleRedirect, setLoginModal }) {
  const [start, setStart] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
  });
  const [inputsErrors, setInputErrors] = useState({});
  const [modal, setModal] = useState(false);

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
        if (response.data === "created") {
          setModal(true);
          setInputs({
            name: "",
            lastname: "",
            username: "",
            password: "",
            email: "",
          });
          setInputErrors({});
          setStart(true);
          handleRedirect && handleRedirect();
        }
      }
    } catch (e) {
      setInputErrors((prev) => {
        return {
          ...prev,
          username: e.response.data.data,
          email: e.response.data.data,
        };
      });
    }
  };

  const HandleSingIn = () => {
    setLoginModal((prev) => !prev)
    setRegisterModal((prev) => !prev)
  }

  return (
    <div className={s.modal}>
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

          <Button
            disabled={
              start ? true : !Object.keys(inputsErrors).length ? false : true
            }
            type="submit"
            variant="contained"
            fullwidth={true}
            sx={{ marginTop: "2%" }}
          >
            Register
          </Button>
        </form>
        <ModalRegister
          modal={modal}
          setModal={setRegisterModal}
          message={"Successful registration"}
        />
        <Divider
          sx={{
            width: "100%",
            border: "1px solid rgba(0,0,0,.1)",
            borderRadius: 12,
            marginBottom: "2%",
          }}
        />
      </div>
      <div>
        <div className={s.new}>
          <p>Already have an account?</p>

          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            size="small"
            sx={{ marginRight: "4%" }}
            onClick={HandleSingIn}
          >
            SING IN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;

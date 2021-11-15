import React, { useState } from 'react';
import s from './Register.module.css';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { validateInput, registerUser } from '../../utils/registerValidations';
import ModalRegister from './ModalRegister';
import { GoogleLogin } from 'react-google-login';
import { Typography } from '@mui/material';

function Register({ setRegisterModal, handleRedirect, setLoginModal }) {
  const [start, setStart] = useState(true);
  const [inputs, setInputs] = useState({
    name: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
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
        const user = { ...inputs, location: [inputs.location], userImg: '' };
        const response = await registerUser(user);
        if (response.data === 'created') {
          setModal(true);
          setInputs({
            name: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
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

  const handleLogin = async (googleData) => {
    // const token = googleData.tokenId;
    // console.log(token);
    setInputs({
      name: googleData.profileObj.givenName,
      lastname: googleData.profileObj.familyName,
      username: googleData.profileObj.email.replace('@gmail.com', ''),
      password: '',
      email: googleData.profileObj.email,
    });
    // store returned user somehow
  };

  const HandleSingIn = () => {
    setLoginModal((prev) => !prev);
    setRegisterModal((prev) => !prev);
  };

  return (
    <Box sx={{ marginTop: '5%', marginBottom: '4%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
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
            color="secondary"
            sx={{ marginTop: '2%' }}
            fullWidth={true}
          >
            Register
          </Button>
        </form>
      </Box>

      <ModalRegister
        modal={modal}
        setModal={setRegisterModal}
        message={'Successful registration'}
      />
      <Divider
        sx={{
          width: '80%',
          marginLeft: '10%',
          border: '1px solid rgba(0,0,0,.1)',
          marginBottom: '3%',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        gap={{ xs: 1, md: 2 }}
      >
        <Typography variant="body2" color="primary">
          Already have an account?
        </Typography>

        <Button
          variant="outlined"
          color="secondary"
          disableElevation
          size="small"
          onClick={HandleSingIn}
        >
          SIGN IN
        </Button>

        <GoogleLogin
          clientId="316128007785-fif02sojlsoinu9s5eugus3qaagiclid.apps.googleusercontent.com"
          buttonText="Fill fields with Google"
          onSuccess={handleLogin}
          onFailure={inputsErrors.google}
          helperText={inputsErrors.google}
        />
      </Box>
    </Box>
  );
}

export default Register;

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {ressetPassword } from '../../redux/actions/index'
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  textAlign: "center",
  p: 6,
};




export default function ResetPassword() {
  const dispatch = useDispatch();


  const [errors, setErrors] = useState({});

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  function validateErrors(password) {
    let errors = {};

    if (!password.password) {
      errors.password = "Password ir required";
    } else if (!password.confirmPassword) {
      errors.confirmPassword = "You must to confirm your password";
    } else if (password.password != password.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }


    function handleConfirmPassword(e) {
        setPassword((prev) => {
            //guard el input modificado
            const input2 = {
                ...prev,
                confirmPassword: e.target.value,
            };

            setErrors(() => {
                return validateErrors({
                    ...password,
                    [e.target.name]: e.target.value
                });
            });
            return input2
        })


    }



    function handleSend(){
       
        dispatch(ressetPassword({newPassword : password.password, resetPassword : resetPassword}))
    
    }



    return (
        <div>

            <Box sx={style}>
                <Typography variant="h6" component="h2" >
                    Change your password
                </Typography>
                <TextField

                    type='password'
                    required
                    fullWidth
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    name="password"
                    value={password.password}
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ marginTop: 5 }}
                />

                <TextField
                    type='password'
                    required
                    fullWidth
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword}
                    name="confirmPassword"
                    value={password.confirmPassword}
                    label="Confirm password"
                    variant="outlined"
                    onChange={handleConfirmPassword}
                    sx={{ marginTop: 5 }}
                />


                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}

                    onClick={handleSend}

                    sx={{
                        marginTop: 3
                    }}
                >

                    Update Password

                </Button>
            </Box>
        </div>
    );

  }

  
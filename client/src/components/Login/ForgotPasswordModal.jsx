import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import {forgotPassword} from '../../redux/actions/index'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height : 410,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    textAlign: 'center',
    p: 6,
};

export default function ForgotPasswordModal({ modal, setModal, message }) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState({
        email: ''
    })
  
    const [span, setSpan] = useState({
        msg : ''
    })

    const [errors, setErrors] = useState({
        email : ''
    })


   function validateErrors(input){
       let errors = {}
     if (!input.email){
        errors.email = 'Email is required'
     }
     else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)){
         errors.email = "It must be a valid email address"
     }
   
   
     return errors;
   }


    function handleChange (e){
        setEmail((prev) => {
            //guard el input modificado
            const input = {
              ...prev,
              [e.target.name]: e.target.value,
            };
        
            setErrors(() => {
                return validateErrors(input);
              });
           
              return input;
        })
    }

    const history = useHistory();

    const handleClose = () => {
        history.push('/Home')
    };

 function handleSend(){
     //  alert('Hemos enviado un enlace de recuperación al email indicado')
     if (!errors.email){
      dispatch(forgotPassword({email : email.email}))
      setSpan({
          msg : 'Hemos enviado en enlace de recuperacion al email indicado'
        })
    }
    else {
        alert('Faltan campos por completar')
    }
 }

 
    return (
        <div>
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography variant="h6" component="h2"
                      sx={{
                        marginTop : 10,
                      }}>
                        {message}
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        //   error={inputsErrors.username ? true : false}
                        //   helperText={inputsErrors.username}
                        name="email"
                        value={email.email}
                        label="Email"
                        variant="outlined"
                      onChange={handleChange}
                      error={errors.email ? true : false}
                      helperText={errors.email}
                      sx={{  marginTop: 5  }}
                    />
                     {span.msg ? <span>{span.msg}</span> : null}
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
                       Enviar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}


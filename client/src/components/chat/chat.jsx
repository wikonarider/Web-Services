import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Input } from "@material-ui/core";
import dotenv from "dotenv";
dotenv.config();
var clienteIO = io(process.env.REACT_APP_API); //conexion al servidor para bidireccional peticiones

//en controller/chat.js  comente como hacer las response y request que es la misma mecanica que cliente.IO

function Chat() {
  const [msg, setMsg] = useState("");
  const [conversacion, setConversacion] = useState([]);

  useEffect(() => {
    clienteIO.on("respuesta", (data) => {
      setConversacion([...conversacion, data]);
    });
  }, [conversacion]);

  function enviar() {
    clienteIO.emit("conectado", msg);
    setMsg("");
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "80% 10% 10%",
        width: "50%",
        height: "700px",
        background: "#1262",
        margin: "auto",
      }}
    >
      <Box sx={{ height: "100%", width: "100%" }}>
        {conversacion.map((e) => (
          <h2 key={e}>{e}</h2>
        ))}
      </Box>
      <Input value={msg} onChange={(e) => setMsg(e.target.value)}></Input>
      <Button onClick={() => enviar()}>Enviar</Button>
    </Box>
  );
}

export default Chat;

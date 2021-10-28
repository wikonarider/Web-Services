//server envia a user >>>>   serverIO.emit("nombre del metodo que tiene el usuario "     ,    objeto que envia)
//cliente envia a server(solo front)   >>>>   clienteIO.emit("nombre del metodo que tiene el servidor "    ,   objeto que envia )

//server recibe de user serverIO.on("nombre metodo que el server recibe"  ,  function (data)  )
//cliente recibe de user clienteIO.on("nombre metodo que el user recibe"  ,  function (data)  )

const serverchat = function (serverIO) {
  serverIO.on("connection", (clienteIO) => {
    //server en linea

    //--------------------------------------------
    clienteIO.on("conectado", (data) => {
      serverIO.emit("respuesta",`BACK SERVER.IO=${data} `);
    });

    //--------------------------------------------
    clienteIO.on("mensaje", (mensaje) => {});

    //----
  });
};

module.exports = serverchat;

const { Router } = require("express");
const services = require("./services");
const users = require("./users");
const qualification = require("./qualification");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/services", services);
router.use("/users", users);
router.use('/qualification', qualification)

module.exports = router;

const { Router } = require("express");
const services = require("./services");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/services", services);
// router.use("/login", login)

module.exports = router;

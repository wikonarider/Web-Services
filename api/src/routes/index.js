const { Router } = require("express");
const services = require("./services");
const users = require("./users");
const qualification = require("./qualification");
const categories = require('./categories');
const favs = require('./favs');
const login = require("./login")
const logout = require("./logout")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/services", services);
router.use("/users", users);
router.use('/qualification', qualification)
router.use('/categories', categories);
router.use('/favs', favs);
router.use("/login", login)
router.use("/logout", logout)


module.exports = router;

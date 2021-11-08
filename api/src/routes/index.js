const { Router } = require("express");
const services = require("./services");
const users = require("./users");
const qualification = require("./qualification");
const groups = require("./groups");
const favs = require("./favs");
const login = require("./login");
const logout = require("./logout");
const provinces = require("./provinces");
const comment = require("./comment");
const checkout = require("./checkout");
const chat=require("./Chat");
const admin = require("./admin");
const paypal = require("./paypal")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/services", services);
router.use("/users", users);
router.use("/qualification", qualification);
router.use("/groups", groups);
router.use("/favs", favs);
router.use("/login", login);
router.use("/logout", logout);
router.use("/provinces", provinces);
router.use("/comment", comment);
router.use("/checkout", checkout);
router.use("/chat",chat)
router.use("/admin", admin);
router.use("/paypal", paypal)

module.exports = router;

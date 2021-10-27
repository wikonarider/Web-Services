const { Users, Service } = require("../db");
const {
  validateUser,
  checkUnique,
  validateUserEdit,
} = require("../utils/validUser");

async function userCreated(req, res, next) {
  try {
    const { username, email } = req.body;
    // son username y email unicos, avanza
    if (await checkUnique(username, email)) {
      // valida todos los parametros del user
      const errors = validateUser(req.body);
      if (!Object.keys(errors).length) {
        await Users.create(req.body);
        res.json({ response: "created" }); // responde con 200, y created
      } else {
        res.status(400).json({ response: errors });
        // algun parametro invalido.
      }
    } else {
      res
        .status(400)
        .json({ response: "username or email already exist or is empty" });
    }
  } catch (e) {
    next(e);
  }
}

async function userEdit(req, res, next) {
  const { userId } = req.cookies;
  if (userId) {
    try {
      const user = await Users.findByPk(userId);
      if (user) {
        const { name, lastname, userImg, password } = req.body;
        const errors = validateUserEdit(req.body);
        if (name || lastname || userImg || password) {
          if (!Object.keys(errors).length) {
            // Cambios los datos, si fueron pasados
            user.name = name ? name : user.name;
            user.lastname = lastname ? lastname : user.lastname;
            user.userImg = userImg ? userImg : user.userImg;
            user.password = password ? password : user.password;

            await user.save();
            res.json({ data: "User edited" });
          } else {
            res.status(400).json({ data: errors });
          }
        } else {
          res.status(400).json({ data: "Empty parameters, user not edited" });
        }
      } else {
        res.status(400).json({ data: "User not found" });
      }
    } catch (e) {
      next(e);
    }
  } else {
    res.json({ data: "User not logged" });
  }
}

async function getUsers(req, res, next) {
  try {
    // let { username } = req.params;
    let { username } = req.query;
    if (!username) {
      const usersDb = await Users.findAll({
        include: [
          {
            model: Service,
            attributes: [],
          },
        ],
      });
      usersDb.length > 0
        ? res.status(200).send(usersDb)
        : res.status(500).send({ response: "no users yet" });
    } else {
      const userFinded = await Users.findOne({
        where: {
          username,
        },
        include: [
          {
            model: Service,
            attributes: [],
          },
        ],
      });
      res.status(200).send(userFinded);
    }
  } catch (e) {
    next(e);
  }
}

async function userBanned(req, res, next) {
  try {
    const { id } = req.params;
    const usersInDb = await Users.findOne({
      // chequeo si existe el usuario
      where: { id: id },
    });

     res.json({ response: "user banned" });
    if (usersInDb === null) {
      res.json({ respones: "user not founded" });
    } else {
      await Users.update(
        {
          // si existe seteo el ban en true
          ban: true,
        },
        {
          where: { id: id },
        }
      );
      res.json({ response: "user banned" });
    }
  } catch (e) {
    next(e);
  }
}

async function postPurchase(req, res, next) {
  //necesitamos estos datos para asociar el servicio comprado a la categoría
  const { userId, serviceId, logged } = req.body;

  try {
    if (logged === true) {
      const userFound = await Users.findOne({
        // busco el usuario
        where: { id: userId },
      });

      const serviceFound = await Service.findOne({
        // busco el servicio
        where: { id: serviceId },
      });

      //si usuario y servicio existe los asocio
      if (userFound && serviceFound) {
        await userFound.addService(serviceFound);

        return res
          .status(200)
          .send({ message: "User associated to Service successful" });
      } else {
        //sino existe el usuario o no está logueado
        return res
          .status(200)
          .send({ message: "You need to be logged to purchase a service" });
      }
    } else {
      return res.status(200).send({ message: "Logged false" });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  userCreated,
  userBanned,
  getUsers,
  postPurchase,
  userEdit,
};

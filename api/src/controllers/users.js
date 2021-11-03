const { Users, Service, Qualification, conn } = require("../db");
const {
  validateUser,
  checkUnique,
  validateUserEdit,
  validatePurchase,
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
        res.json({ data: "created" }); // responde con 200, y created
      } else {
        res.status(400).json({ data: errors });
        // algun parametro invalido.
      }
    } else {
      res
        .status(400)
        .json({ data: "username or email already exist or is empty" });
    }
  } catch (e) {
    next(e);
  }
}

async function userEdit(req, res, next) {
  const { userId } = req.cookies;

  try {
    const user = await Users.findByPk(userId);

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
  } catch (e) {
    next(e);
  }
}

// se trae la info de un usuario, todos sus favs,
// servicios comprados y creados
async function getUserInfo(req, res, next) {
  try {
    const { userId } = req.cookies;
    const user = await Users.findOne({
      attributes: ["id", "userImg", "name", "lastname", "username", "email"],
      where: {
        id: userId,
      },
      include: [
        {
          model: Service,
          as: "servicesOwn",
          attributes: ["id", "title", "img", "price", "userId"],
          include: {
            model: Qualification,
            attributes: ["score"],
          },
        },
        {
          model: Service,
          as: "servicesFavs",
          attributes: ["id", "title", "img", "price", "userId"],
          through: {
            attributes: [],
          },
          include: {
            model: Qualification,
            attributes: ["score"],
          },
        },
        {
          model: Service,
          as: "servicesBought",
          attributes: ["id", "title", "img", "price", "userId"],
          through: {
            attributes: [],
          },
          include: {
            model: Qualification,
            attributes: ["score"],
          },
        },
      ],
    });

    user ? res.json(user) : res.status(404).json({ message: "User not found" });
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
  try {
    const { userId } = req.cookies;
    const { servicesId } = req.body;

    // validamos que sea un arreglo de servicios y
    // que el esos servicios no pertenezcan al usuario
    if (await validatePurchase(servicesId, userId)) {
      const user = await Users.findByPk(userId);
      // console.log para ver los metodos disponibles
      // console.log(Object.keys(user.__proto__));
      await user.setServicesBought(servicesId);
      res.json({ message: "Success purchase" });
    } else {
      res.status(400).json({
        message:
          "Only arrangement of valid services, or services that are not the owner ",
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  userCreated,
  userBanned,
  getUserInfo,
  postPurchase,
  userEdit,
};

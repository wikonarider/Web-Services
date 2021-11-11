const { Users, Service, Qualification, conn, Op, Orders } = require('../db');
const {
  checkUnique,
  validateUser,
  validateUserEdit,
  validateAdmin,
} = require('../utils/validUser');
const { allServicesBought } = require('../utils/validOrders');
require('dotenv').config();
const { ORIGIN } = process.env;

async function userCreated(req, res, next) {
  try {
    const { username, email } = req.body;
    // son username y email unicos, avanza
    if (await checkUnique(username, email)) {
      // valida todos los parametros del user
      const errors = validateUser(req.body);
      if (!Object.keys(errors).length) {
        await Users.create(req.body);
        res.json({ data: 'created' }); // responde con 200, y created
      } else {
        res.status(400).json({ data: errors });
        // algun parametro invalido.
      }
    } else {
      res
        .status(400)
        .json({ data: 'username or email already exist or is empty' });
    }
  } catch (e) {
    next(e);
  }
}

async function userEdit(req, res, next) {
  const userId = req.user;
  const userIdQuery = req.query.id;
  try {
    const user = await Users.findByPk(userIdQuery || userId);

    const { name, lastname, userImg, password, email, ban, username } =
      req.body;
    const errors = validateUserEdit(req.body);
    if (name || lastname || userImg || password || email || ban || username) {
      if (!Object.keys(errors).length) {
        // Cambios los datos, si fueron pasados
        user.name = name ? name : user.name;
        user.lastname = lastname ? lastname : user.lastname;
        user.userImg = userImg ? userImg : user.userImg;
        user.password = password ? password : user.password;
        user.username = username ? username : user.username;
        user.email = email ? email : user.email;
        userIdQuery ? (user.ban = ban) : null;

        await user.save();
        res.json({ data: 'User edited' });
      } else {
        res.status(400).json({ data: errors });
      }
    } else {
      res.status(400).json({ data: 'Empty parameters, user not edited' });
    }
  } catch (e) {
    next(e);
  }
}

// se trae la info de un usuario, todos sus favs,
// servicios comprados y creados
async function getUserInfo(req, res, next) {
  try {
    const userIdQuery = req.query.id;
    const userId = req.user;

    const user = await Users.findOne({
      attributes: [
        'id',
        'userImg',
        'name',
        'lastname',
        'username',
        'email',
        'admin',
        'ban',
      ],
      where: {
        id: userIdQuery || userId,
      },
      include: [
        {
          model: Service,
          as: 'servicesOwn',
          attributes: ['id', 'title', 'img', 'price', 'userId'],
          include: {
            model: Qualification,
            attributes: ['score'],
          },
        },
        {
          model: Service,
          as: 'servicesFavs',
          attributes: ['id', 'title', 'img', 'price', 'userId'],
          through: {
            attributes: [],
          },
          include: {
            model: Qualification,
            attributes: ['score'],
          },
        },
        {
          model: Orders,
          attributes: { exclude: ['userId'] },
        },
      ],
    });

    const newUser = JSON.parse(JSON.stringify(user));
    newUser.servicesBought = await allServicesBought(user.id);

    user
      ? res.json(newUser)
      : res.status(404).json({ message: 'User not found' });
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

    res.json({ response: 'user banned' });
    if (usersInDb === null) {
      res.json({ respones: 'user not founded' });
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
      res.json({ response: 'user banned' });
    }
  } catch (e) {
    next(e);
  }
}

async function postPurchase(req, res, next) {
  //necesitamos estos datos para asociar el servicio comprado a la categoría

  const { servicesId, collection_status, status, username } = req.query;

  console.log('serviceIdenPruchase', servicesId);
  console.log('collection_status', collection_status);

  try {
    if (collection_status == 'approved' || status) {
      //console.log("POSTPURCHASEID", userId);
      //console.log("SERVICEIDPURCHASE", servicesId);

      // validamos que sea un arreglo de servicios y
      // que el esos servicios no pertenezcan al usuario

      // console.log("USERID", userId);
      //console.log("SERVICESID", servicesId);

      const user = await Users.findOne({
        where: {
          username: username,
        },
      });
      // console.log para ver los metodos disponibles

      //console.log("USERenPurchase", user);

      await user.addServicesBought(servicesId.split(','));

      res.status(400).redirect(`${ORIGIN}/chat`);
    } else {
      res.status(400).redirect(`${ORIGIN}/home`);
    }
  } catch (e) {
    next(e);
  }
}

async function getUserAdminSearch(req, res, next) {
  try {
    const { search } = req.query;
    const userId = req.user;

    let validAdmin = await validateAdmin(userId);

    const user =
      validAdmin &&
      (await Users.findAll({
        attributes: [
          'id',
          'userImg',
          'name',
          'lastname',
          'username',
          'email',
          'admin',
          'ban',
        ],
        where: {
          [Op.or]: {
            id: conn.where(
              conn.fn('TEXT', conn.col('users.id')),
              'LIKE',
              search
            ),
            name: conn.where(
              conn.fn('LOWER', conn.col('name')),
              'LIKE',
              search + '%'
            ),
            lastname: conn.where(
              conn.fn('LOWER', conn.col('lastname')),
              'LIKE',
              search + '%'
            ),
            email: conn.where(
              conn.fn('LOWER', conn.col('email')),
              'LIKE',
              search
            ),
            username: conn.where(
              conn.fn('LOWER', conn.col('username')),
              'LIKE',
              search + '%'
            ),
          },
        },

        include: [
          {
            model: Service,
            as: 'servicesOwn',
            attributes: ['id', 'title', 'img', 'price', 'userId'],
            include: {
              model: Qualification,
              attributes: ['score'],
            },
          },
          {
            model: Service,
            as: 'servicesFavs',
            attributes: ['id', 'title', 'img', 'price', 'userId'],
            through: {
              attributes: [],
            },
            include: {
              model: Qualification,
              attributes: ['score'],
            },
          },
          {
            model: Service,
            as: 'servicesBought',
            attributes: ['id', 'title', 'img', 'price', 'userId'],
            through: {
              attributes: [],
            },
            include: {
              model: Qualification,
              attributes: ['score'],
            },
          },
        ],
      }));

    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  userCreated,
  userBanned,
  getUserInfo,
  getUserAdminSearch,
  postPurchase,
  userEdit,
};

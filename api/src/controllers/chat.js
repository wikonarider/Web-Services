const { Users, Chat, Convertations, Service } = require("../db.js");
const { Op } = require("sequelize");
var users = [];
//-----------------------socket--------------------------------------function users online
const addUsers = async (userId, socketid) => {
  var flat = true;
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === userId) {
      flat = false;
    }
  }
  if (flat) {
    users.push({ user: userId, socket: socketid });
  }
};
//-----------------------------------------------------------------------------function remove user online
const removeUser = async (socketId) => {
  if (socketId) {
    users = users.filter((usr) => usr.socket !== socketId);
  }
};
//---------------------------------------------------------------------------------function get user
const getUser = (receiveId) => {
  var usr = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === receiveId) {
      usr = users[i];
    }
  }
  return usr;
};
//----------------------------------------------------------------------------server IO
function serverchat(serverIO) {
  serverIO.on("connection", (socketIO) => {
    console.log("user " + socketIO.id + " connect");
    //-----------------------------------------------------------------------------add new User
    socketIO.on("addUser", (userId) => {
      addUsers(userId, socketIO.id);
      console.log("users add", users);
      return serverIO.emit("getUsers", users);
    });
    //-----------------------------------------------------------------------------disconect user
    socketIO.on("disconnect", () => {
      removeUser(socketIO.id);
      console.log("disconected", users);
      serverIO.emit("getUsers", users);
    });
    //------------------------------------------------------------------------------------send msn

    socketIO.on("sendMsn", ({ senderId, receiverId, text }) => {
      console.log("sendMsn", senderId, receiverId, text);
      if (senderId && receiverId && text) {
        var user = getUser(receiverId);
        if (Object.values(user).length) {
          serverIO.to(user.socket).emit("getMessage", {
            remit: receiverId,
            senderId,
            text,
          });
        }
      }
    });
  });
} //server id
//---------------------------------------------------------------------------------get messages
function getPots(req, res, next) {
  var { idConvertation1, offset } = req.query;
  if (!offset) {
    offset = 0;
  }
  Chat.findAll({
    where: {
      convertationId: idConvertation1,
    },
    order: [["createdAt", "ASC"]],
  })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      next(err);
    });
}
//----------------------------------------------------------------------------------------get contacts bought
function getContactsbought(req, res, next) {
  const userId = req.user;
  console.log(userId);
  if (userId) {
    Users.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Service,
          as: "servicesBought",
          attributes: ["id"],
        },
      ],
    })
      .then((service) => {
        var { servicesBought } = service;
        return servicesBought.map((serv) => {
          const { id } = serv.dataValues;
          return Service.findOne({
            where: {
              id: id,
            },
            attributes: [],
            include: {
              model: Users,
              attributes: ["userImg", "username", "name", "lastname", "id"],
            },
          });
        });
      })
      .then((contactsBought) => {
        return Promise.all(contactsBought);
      })
      .then((users) => {
        //quitando repetidos
        var contactsNotRepeat = [users[0].dataValues.user];
        var flat = false;
        users.map((usr) => {
          for (let i = 0; i < contactsNotRepeat.length; i++) {
            if (contactsNotRepeat[i].id === usr.dataValues.user.id) {
              flat = true;
            }
          }
          if (!flat) {
            contactsNotRepeat.push(usr.dataValues.user);
          }
          flat = false;
        });

        res.status(200).send(contactsNotRepeat);
      })
      .catch((err) => {
        next(err);
      });
  }
}
//----------------------------------------------------------------------------get id convertations
function getConvertations(req, res, next) {
  const userId = req.user;
  Convertations.findAll({
    where: {
      [Op.or]: [{ userA: userId }, { userB: userId }],
    },
    attributes: ["userA", "userB", "id"],
  })
    .then((members) => {
      res.status(200).send(members);
    })
    .catch((err) => {
      next(err);
    });
}
//-----------------------------------------------------------------------------------------new convertation
function newConvertation(req, res, next) {
  var { id } = req.params;
  const userId = req.user;
  console.log("id:", id, "userId:", userId);
  Convertations.findOrCreate({
    where: {
      [Op.or]: [
        { [Op.and]: [{ userA: userId }, { userB: id }] },
        { [Op.and]: [{ userA: id }, { userB: userId }] },
      ],
    },
    defaults: { userA: userId, userB: id },
  })
    .then(() => {
      return res.status(200).send("New convertation created");
    })
    .catch((err) => {
      next(err);
    });
}

//--------------------------------------------------------------------------------------------------------------delete convertation
function deleteConvertation(req, res, next) {
  var { id } = req.params;
  const userId = req.user;
  Convertations.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      return res.status(200).send("delete convertation");
    })
    .catch((err) => {
      next(err);
    });
}
//---------------------------------------------------------------------------send,
function sendMessage(req, res, next) {
  var { remit, message } = req.body;
  const userId = req.user;
  var user;
  Convertations.findOrCreate({
    where: {
      [Op.or]: [
        { [Op.and]: [{ userA: userId }, { userB: remit }] },
        { [Op.and]: [{ userA: remit }, { userB: userId }] },
      ],
    },
    defaults: { userA: userId, userB: remit },
  })
    .then(([convertation, flat]) => {
      Users.findByPk(userId)
        .then((userBd) => {
          user = userBd;
          return Chat.create({ remit: remit, text: message });
        })
        .then((chat) => {
          convertation.addChat(chat);
          return user.addChat(chat);
        })
        .then((resp) => {
          res.status(200).send("message send");
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
}

//---------------------------------------------------------------------------------get contact convertation
function getContacts(req, res, next) {
  const userId = req.user;
  console.log("token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", userId);
  if (userId) {
    Convertations.findAll({
      where: { [Op.or]: [{ userA: userId }, { userB: userId }] },
      attributes: ["userA", "userB"],
    })
      .then((contacts) => {
        return contacts.map((con) => {
          var { userA, userB } = con.dataValues;
          if (userB === userId) {
            userB = userA;
          }
          if (!userA || !userB) {
            return res.status(500).send("invalid params");
          }
          return Users.findOne({
            where: {
              id: userB,
            },
            attributes: [
              "userImg",
              "name",
              "lastname",
              "username",
              "email",
              "id",
            ],
          });
        });
      })
      .then((resp) => {
        return Promise.all(resp);
      })
      .then((contacts) => {
        res.status(200).send(contacts);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(500).send("Error get Contacts");
  }
}
//-----------------------------------------------------------------------------------------
module.exports = {
  serverchat,
  getConvertations,
  sendMessage,
  getPots,
  getContacts,
  deleteConvertation,
  newConvertation,
  getContactsbought,
};

const { Users, Chat, Convertations } = require("../db.js");
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
      console.log(users);
      return serverIO.emit("getUsers", users);
    });
    //-----------------------------------------------------------------------------disconect user
    socketIO.on("disconnect",() => {
      removeUser(socketIO.id);
      serverIO.emit("getUsers", users);
    });
    //------------------------------------------------------------------------------------send msn

    socketIO.on("sendMsn",({ senderId, receiverId, text }) => {
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
//----------------------------------------------------------------------------get id convertations
function getConvertations(req, res, next) {
  const { userId } = req.cookies;
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
//-----------------------------------------------------------------------------------------new convertation  ****************************falta****************************
function newConvertation(req, res, next) {

  var {id}  = req.params;
  var { userId } = req.cookies;
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

//--------------------------------------------------------------------------------------------------------------delete convertation   *******************falta**********************
function deleteConvertation(req, res, next) {
  var { id } = req.params;
  var { userId } = req.cookies;
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
//---------------------------------------------------------------------------send [{ userId: userId }, { sender: remit }],
function sendMessage(req, res, next) {
  var { remit, message } = req.body;
  var { userId } = req.cookies;
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

//---------------------------------------------------------------------------------get contact
function getContacts(req, res, next) {
  const { userId } = req.cookies;
  console.log(userId);
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
        if(!userA|| !userB){
            return res.status(500).send("invalid params")
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
};

const { Op } = require("sequelize");
const { Users, Service } = require("../db");

// valida si es una url
function validateUrl(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// Valida si contiene solo letras, para el name y lastname
function strIsOnlyLetters(str) {
  return typeof str === "string" && /^[a-zA-Z]+$/.test(str);
}

// valida un username, empieza con al menos 4 letras y termina con
// letras o numeros
function validUsername(username) {
  return (
    typeof username === "string" && /^[a-zA-Z]{4,}[a-zA-Z0-9]*$/.test(username)
  );
}

// valida si es una password. Tiene que tener 8 caracteres, al menos 1 letra y 1 numero
function validPassword(password) {
  return (
    typeof password === "string" &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
  );
}

// valida si es un email es valido
function validEmail(email) {
  return (
    typeof email === "string" &&
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
  );
}

// valida todos los parametros de un user
function validateUser(user) {
  let errors = {};
  // name validations
  if (!strIsOnlyLetters(user.name)) {
    errors.name = "It has to be only letters, not numbers or spaces";
  }
  // lastname validations
  if (!strIsOnlyLetters(user.lastname)) {
    errors.lastname = "It has to be only letters, not numbers or spaces";
  }
  // username validations
  if (!validUsername(user.username)) {
    errors.username = "It has to start with at least 4 letters";
  }
  // password validations
  if (!validPassword(user.password)) {
    errors.password =
      "At least 8 characters, it must contain 1 letter and 1 number";
  }
  // email validations
  if (!validEmail(user.email)) {
    errors.email = "It must be a valid email address";
  }

  return errors;
}

function validateUserEdit(user) {
  let errors = {};

  if (user.name && !strIsOnlyLetters(user.name)) {
    errors.name = "It has to be only letters, not numbers or spaces";
  }

  if (user.lastname && !strIsOnlyLetters(user.lastname)) {
    errors.lastname = "It has to be only letters, not numbers or spaces";
  }

  if (user.password && !validPassword(user.password)) {
    errors.password =
      "At least 8 characters, it must contain 1 letter and 1 number";
  }

  if (user.userImg && !validateUrl(user.userImg)) {
    errors.userImg = "It has to be a valid url";
  }

  return errors;
}

// chequea que el username o email no existan en la db ya
async function checkUnique(username, email) {
  if (
    typeof username === "string" &&
    typeof email === "string" &&
    username.length > 0 &&
    username.length > 0
  ) {
    const user = await Users.findAll({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    return !user.length;
  }
  return false;
}

// purchase
async function validatePurchase(arrayServices, userId) {
  if (!Array.isArray(arrayServices)) return false;
  else if (!arrayServices.every((id) => typeof id === "number")) return false;

  const services = await Service.findAll({
    where: {
      id: arrayServices,
      userId: { [Op.ne]: userId },
    },
  });

  Op.n;
  return services.length === arrayServices.length;
}

async function validateAdmin(adminId) {
  const user = await Users.findByPk(adminId);

  return user.admin;
}

module.exports = {
  validateUrl,
  validateUser,
  checkUnique,
  validateUserEdit,
  validatePurchase,
  validateAdmin,
};

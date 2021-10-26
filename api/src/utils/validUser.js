const { Op } = require("sequelize");
const { Users } = require("../db");

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

// valida si es un arreglo de strings
function validLocation(location) {
  if (!Array.isArray(location)) return false;
  else if (!location.length) return false;

  return location.every((elem) => typeof elem === "string");
}

// valida todos los parametros de un user
function validateUser(user) {
  let errors = {};
  // userImg validations
  if (typeof user.userImg !== "string") {
    errors.userImg = "It has to be of type string";
  } else if (user.userImg && !validateUrl(userImg)) {
    errors.userImg = "It has to be a valid url";
  }
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
  // location validations (not finished)
  if (!Array.isArray(user.location)) {
    errors.location = "It has to be of type array";
  } else if (!validLocation(user.location)) {
    errors.location = "It has to be an array of string";
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

module.exports = {
  validateUrl,
  validateUser,
  checkUnique,
};

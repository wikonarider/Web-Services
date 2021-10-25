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

// valida un username, empeiza con al menos 4 letras y termina con
// letras o numeros
function validUsername(username) {
  return (
    typeof username === "string" && /^[a-zA-Z]{4,}[a-zA-Z0-9]*$/.test(username)
  );
}

// valida si es una password tiene 8 caracteres, al menos 1 letra and 1 numero
function validPassword(password) {
  return (
    typeof password === "string" &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
  );
}

// valida si un email es valido
function validEmail(email) {
  return (
    typeof email === "string" &&
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
  );
}

// valida todos los parametros de un user
function validateUser(user) {
  if (Object.keys(user).length) {
    return (
      validateUrl(user.userImg) &&
      strIsOnlyLetters(user.name) &&
      strIsOnlyLetters(user.lastname) &&
      validUsername(user.username) &&
      validPassword(user.password) &&
      validEmail(user.email) &&
      Array.isArray(user.location)
    );
  }
  return false;
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

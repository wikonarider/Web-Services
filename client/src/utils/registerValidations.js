import axios from "axios";

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
export function validateInput(user) {
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
    errors.username =
      "Must start with at least 4 letters and contain only letters or numbers ";
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
  if (typeof user.location !== "string") {
    errors.location = "It has to be an string";
  } else if (!user.location.length) {
    errors.location = "It can't be empty ";
  }
  return errors;
}

export async function registerUser(user) {
  const response = await axios.post("/users", user);
  return response.data;
}

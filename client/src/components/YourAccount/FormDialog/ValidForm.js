// Valida si contiene solo letras, para el name y lastname
function strIsOnlyLetters(str) {
  return typeof str === "string" && /^[a-zA-Z]+$/.test(str);
}

// valida si es una password. Tiene que tener 8 caracteres, al menos 1 letra y 1 numero
function validPassword(password) {
  return (
    typeof password === "string" &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
  );
}

export function validateUserData(user) {
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

  return errors;
}

const { Category, Province, City } = require("../db");

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

async function validateCategoryId(id) {
  const category = await Category.findByPk(id);
  return category ? true : false;
}

async function validateProvince(id) {
  const province = await Province.findByPk(id);
  return province ? true : false;
}
async function validateCity(citys) {
  var citys = citys.map((e) => {
    return City.findByPk(e);
  });
  Promise.all(citys).then((resp) => {
    citys = resp;
  });
  return citys.length ? true : false;
}

async function validateServices(service) {
  let errors = {};

  if (typeof service.img !== "string") {
    errors.img = "It has to be of type string";
  } else if (!validateUrl(service.img)) {
    errors.img = "It has to be a valid url";
  }
  if (!Object.values(service.provinces).length) {
    errors.provinces = "must have a province";
  } else {
    if (!validateProvince(service.provinces.id)) {
      errors.provinces = "must have a province";
    }
  }

  if (!service.cities.length) {
    errors.cities = "should contain city";
  } else {
    if (!validateCity(service.cities)) {
      errors.cities = "should contain city";
    }
  }

  if (typeof service.description !== "string") {
    errors.description = "It has to be of type string";
  } else if (!service.description.length) {
    errors.description = "Can't be empty";
  }

  if (typeof service.price !== "number") {
    errors.price = "It must be a number";
  } else if (service.price < 100) {
    errors.price = "Has to be greater than 100";
  }

  if (typeof service.title !== "string") {
    errors.title = "It has to be of type string";
  } else if (!service.title.length) {
    errors.title = "Can't be empty";
  } else if (service.title.length > 40) {
    errors.title = "It cannot have more than 40 characters";
  }

  if (typeof service.categoryId !== "number") {
    errors.categoryId = "It must be a number";
  } else if (!(await validateCategoryId(service.categoryId))) {
    errors.categoryId = "It has to be a valid category id";
  }

  return errors;
}

module.exports = {
  validateServices,
};

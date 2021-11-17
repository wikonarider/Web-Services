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

function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
}

async function validateCategoryId(id) {
  const category = await Category.findByPk(id);
  return category ? true : false;
}

async function validateProvince(id) {
  const province = await Province.findByPk(id);
  return province ? true : false;
}

async function validateCity(provinceId, cityId) {
  if (provinceId && cityId) {
    const province = await Province.findOne({
      where: {
        id: provinceId,
      },
      include: [
        {
          model: City,
          attributes: ["id"],
        },
      ],
    });
    const index = province.cities.findIndex((c) => c.id === cityId);
    return index !== -1;
  }
  return false;
}

async function validateServices(service) {
  let errors = {};

  if (typeof service.img !== "string") {
    errors.img = "It has to be of type string";
  } else if (!validateUrl(service.img)) {
    errors.img = "It has to be a valid url";
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

  if (typeof service.provinceId !== "number") {
    errors.provinceId = "It must be a number";
  } else if (!(await validateProvince(service.provinceId))) {
    errors.provinceId = "It has to be a valid id";
  }

  if (typeof service.cityId !== "number") {
    errors.cityId = "It must be a number";
  } else if (!(await validateCity(service.provinceId, service.cityId))) {
    errors.cityId =
      "It has to be a valid id and the city belongs to the province";
  }

  return errors;
}

async function validateServicesEdit(service) {
  let errors = {};

  if (service.img && typeof service.img !== "string") {
    errors.img = "It has to be of type string";
  } else if (service.img && !validateUrl(service.img)) {
    errors.img = "It has to be a valid url";
  }

  if (service.description && typeof service.description !== "string") {
    errors.description = "It has to be of type string";
  } else if (service.description && !service.description.length) {
    errors.description = "Can't be empty";
  }

  if (service.price && typeof service.price !== "number") {
    errors.price = "It must be a number";
  } else if (service.price && service.price < 100) {
    errors.price = "Has to be greater than 100";
  }

  if (service.title && typeof service.title !== "string") {
    errors.title = "It has to be of type string";
  } else if (service.title && !service.title.length) {
    errors.title = "Can't be empty";
  } else if (service.title && service.title.length > 40) {
    errors.title = "It cannot have more than 40 characters";
  }

  if (service.categoryId && typeof service.categoryId !== "number") {
    errors.categoryId = "It must be a number";
  } else if (
    service.categoryId &&
    !(await validateCategoryId(service.categoryId))
  ) {
    errors.categoryId = "It has to be a valid category id";
  }

  if (service.provinceId && typeof service.provinceId !== "number") {
    errors.provinceId = "It must be a number";
  } else if (
    service.provinceId &&
    !(await validateProvince(service.provinceId))
  ) {
    errors.provinceId = "It has to be a valid id";
  }

  if (service.cityId && typeof service.cityId !== "number") {
    errors.cityId = "It must be a number";
  } else if (
    service.cityId &&
    !(await validateCity(service.provinceId, service.cityId))
  ) {
    errors.cityId =
      "It has to be a valid id and the city belongs to the province";
  }

  if (service.avaliable && typeof service.avaliable !== "string") {
    errors.avaliable = "It has to be of type string";
  }

  return errors;
}

module.exports = {
  validateServices,
  validateServicesEdit,
  validateUUID,
};

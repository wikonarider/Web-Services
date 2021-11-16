const { Category } = require("../db");
const { Op } = require("sequelize");

function makeWhereFilter(startRange, endRange, title) {
  let where = {};
  // all
  if (startRange && endRange && title) {
    where = {
      price: {
        [Op.between]: [startRange, endRange],
      },
      title: {
        [Op.iLike]: `%${title}%`,
      },
      avaliable: {
        [Op.not]: false,
      },
    };
    // no range, title yes
  } else if ((!startRange || !endRange) && title) {
    where = {
      title: {
        [Op.iLike]: `%${title}%`,
      },
      avaliable: {
        [Op.not]: false,
      },
    };
    // no title, range yes
  } else if (startRange && endRange && !title) {
    where = {
      price: {
        [Op.between]: [startRange, endRange],
      },
      avaliable: {
        [Op.not]: false,
      },
    };
  } else {
    where = {
      avaliable: {
        [Op.not]: false,
      },
    };
  }
  return where;
}

async function validCategories(category) {
  if (typeof category !== "string") {
    return false;
  }
  const arrayCategory = category.split(",");
  if (!arrayCategory.every((c) => typeof c === "string")) {
    return false;
  } else {
    const categories = await Category.findAll({
      where: {
        name: arrayCategory,
      },
    });
    return categories.length === arrayCategory.length;
  }
}

async function validFilters(query, dictonary) {
  let errors = {};
  // startRange
  if (query.startRange && Number.isNaN(Number(query.startRange))) {
    errors.startRange = "It has to be of the numeric type";
  }
  // endRange
  if (query.endRange && Number.isNaN(Number(query.endRange))) {
    errors.endRange = "It has to be of the numeric type";
  }
  // category
  if (query.category && !(await validCategories(query.category))) {
    errors.category = "They must be valid category names";
  }
  // page
  if (query.page && Number.isNaN(Number(query.page))) {
    errors.page = "It has to be of the numeric type";
  } else if (query.page && Number(query.page) < 0) {
    errors.page = "It has to be a positive number";
  }

  // pageSize
  if (query.pageSize && Number.isNaN(Number(query.pageSize))) {
    errors.pageSize = "It has to be of the numeric type";
  } else if (query.pageSize && Number(query.pageSize) < 0) {
    errors.pageSize = "It has to be a positive number";
  }
  // type
  if (
    query.type &&
    query.type.toLowerCase() !== "asc" &&
    query.type.toLowerCase() !== "desc"
  ) {
    errors.type = "It can only be ASC or DESC";
  }
  // order;
  if (query.order && !dictonary[query.order]) {
    errors.order =
      "It can only be one of these order: " + Object.keys(dictonary).join(", ");
  }
  return errors;
}

module.exports = {
  validFilters,
  makeWhereFilter,
};

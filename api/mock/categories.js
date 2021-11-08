//servicios disponibles
const { Category } = require("../src/db");

function linkCategoryWithGroup(array, groupId) {
  let promises = [];
  for (let i = 0; i < array.length; i++) {
    promises.push(Category.create(array[i]));
  }
  Promise.all(promises)
    .then((values) => {
      values.forEach((e) => {
        e.setGroup(groupId);
      });
    })
    .catch((e) => console.log("Error linkCategory ", e));
}

const clases = [
  {
    name: "Dance",
  },
  {
    name: "Language",
  },
  {
    name: "Computing",
  },
  {
    name: "Music",
  },

  {
    name: "Academics Tutoring",
  },
  {
    name: "Theater",
  },
  {
    name: "Other Courses",
  },
];

const reparaciones = [
  {
    name: "Carpentry",
  },
  {
    name: "Locksmith",
  },
  {
    name: "Construction and Bricklayer",
  },
  {
    name: "Electrical",
  },
  {
    name: "Appliance Repair",
  },
  {
    name: "Electrical and Computers",
  },
  {
    name: "Smithy",
  },
  {
    name: "Auto Repair",
  },
  {
    name: "Painting",
  },
  {
    name: "Plumbing y Gas",
  },
  {
    name: "Other Technician",
  },
];

const organizaciones = [
  {
    name: "Ambience and Decoration",
  },
  {
    name: "Catering",
  },
  {
    name: "Entertainment",
  },
  {
    name: "Photography",
  },
  {
    name: "Organization",
  },
  {
    name: "Salon",
  },
  {
    name: "Other Events",
  },
];

const transporte = [
  {
    name: "Freight - Lading",
  },
  {
    name: "Moving",
  },
  {
    name: "Other Transport",
  },
  {
    name: "Transport",
  },
];

const domestico = [
  {
    name: "Gardener",
  },
  {
    name: "Baby sister",
  },
  {
    name: "Cleaning and Maid Service",
  },
];

const turismo = [
  {
    name: "Mendoza",
  },
  {
    name: "Misiones",
  },
  {
    name: "Córdoba",
  },
  {
    name: "Mar Del Plata",
  },
  {
    name: "Bariloche",
  },
];

const arrayCategories = [
  clases,
  reparaciones,
  organizaciones,
  transporte,
  domestico,
  turismo,
];

function linkAllGroups() {
  for (let i = 0; i < arrayCategories.length; i++) {
    linkCategoryWithGroup(arrayCategories[i], i + 1);
  }
}

module.exports = {
  linkAllGroups,
};

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
    name: "Danzas",
  },
  {
    name: "Idiomas",
  },
  {
    name: "Informatica",
  },
  {
    name: "Musica",
  },
  {
    name: "Otros temas",
  },
  {
    name: "Teatro",
  },
  {
    name: "Tutores - Clases Particulares",
  },
];

const reparaciones = [
  {
    name: "Carpinteria",
  },
  {
    name: "Cerrajeria",
  },
  {
    name: "Construccion - Albañiles",
  },
  {
    name: "Electricista",
  },
  {
    name: "Electrodomesticos",
  },
  {
    name: "Electronica y Computadoras",
  },
  {
    name: "Herreria",
  },
  {
    name: "Mecanicos",
  },
  {
    name: "Otros Servicios",
  },
  {
    name: "Pintor",
  },
  {
    name: "Plomero y Gasista",
  },
];

const organizaciones = [
  {
    name: "Ambientacion",
  },
  {
    name: "Catering",
  },
  {
    name: "Entretenimiento",
  },
  {
    name: "Fotografia",
  },
  {
    name: "Organizacion",
  },
  {
    name: "Otros Servicios",
  },
  {
    name: "Salones",
  },
];

const transporte = [
  {
    name: "Fletes",
  },
  {
    name: "Mudanza",
  },
  {
    name: "Otros Servicios",
  },
  {
    name: "Transporte",
  },
];

const domestico = [
  {
    name: "Jardinero",
  },
  {
    name: "Niñera",
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
    name: "Cordoba",
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

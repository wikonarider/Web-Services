const axios = require("axios");

async function loadProvinces() {
  const response = await axios(
    "https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json"
  );
  let bulk = [];
  response.data.provincias.forEach((element) => {
    bulk.push({ id: element.id, name: element.nombre });
  });
  return bulk;
}

module.exports = {
  loadProvinces,
};

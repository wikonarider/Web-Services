const axios = require("axios");

async function loadCities() {
  const response = await axios(
    "https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.3/download/departamentos.json"
  );
  let bulk = [];
  response.data.departamentos.forEach((element) => {
    bulk.push({
      id: Number(element.id),
      name: element.nombre,
      provinceId: Number(element.provincia.id),
      lat: element.centroide.lat,
      lon: element.centroide.lon,
    });
  });
  return bulk;
}

module.exports = {
  loadCities,
};

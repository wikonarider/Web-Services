//por cada ruta un controler
const { Service, Users } = require('../db')


async function getServices(req, res, next) {
   const {title} = req.query
 
   try {
    const dbServices = await Service.findAll({          //Traigo todo de la db
      include: {
        model: Users,
        through: { attributes: [] }
      }
    })

    if (!title) return res.send(dbServices)   //Devuelvo todos los servicios
    else {
    
    if (dbServices.length > 0){
      if (title){                         //si me pasan un title busco en la db los que coincidan 
        filteredServices = []                           
        dbServices.map(service => {
          if (service.title.toLowerCase().includes(title.toLowerCase())) filteredServices.push(service)
        })
        return res.send(filteredServices)    //Si coincide mando el servicio con ese title
      }
      else return (dbServices)    //Si no, devuelvo todos los servicios
    }
  }

    
  } catch (err) {

    next(err)
  }
}

function postServices(req, res) {
  res.send("hola");
}

module.exports = {
  getServices,
  postServices,
};

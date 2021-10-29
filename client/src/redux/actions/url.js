
//reconstruyo URL para query dependiendo las props del objeto que recibe getService(obj)

export default function serviceURL(obj) {

  if (obj&&Object.values(obj).length) {
    //compruebo si existe alguna propiedad
    if (obj.province) {
      //1ro compruebo si trae provincia
      if (obj.category) {
        if (obj.rango) {
          return `services?province=${obj.province}&category=${obj.category}&startRange=${obj.rango[0]}&endRange=${obj.rango[1]}`;
        }
        if (obj.order) {
          return `services?province=${obj.province}&category=${obj.category}&order=${obj.order}`;
        }

        return `services?province=${obj.province}&category=${obj.category}`;
      }
    }

    if (obj.title) {
      return `services?title=${obj.title}`;
    }
  }

  return `services`;
}

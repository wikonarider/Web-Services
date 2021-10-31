//construye URL para query dependiendo las props del objeto que recibe getService(obj)

export default function serviceURL(obj) {
  var URL = "services";

  if (obj && Object.values(obj).length) {
    URL += "?";
    for (const str in obj) {
      URL += `${str}=${obj[str]}&`;
    }
    URL = URL.substring(0, URL.length - 1);
  }
  return URL;
}

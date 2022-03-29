import Axios from "axios";
// Obtener los datos de una tabla de
// acuerdo a sus parametros
async function Consultar(url = "", params = {}) {
  let filtros = "?filter=" + encodeURIComponent(JSON.stringify(params));
  try {
    let respuesta = await Axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + url + filtros,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Registrar datos en la base de datos
// esta funcicion recibe un objeto con los datos a registrar
async function Crear(url = "", data = {}) {
  try {
    let respuesta = await Axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_URL + url,
      data: data,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Esta funcion actualiza los datos de una tabla
// recibe un objeto con los datos a actualizar
async function Actualizar(url = "", data = {}) {
  try {
    let respuesta = await Axios({
      method: "PATCH",
      url: process.env.NEXT_PUBLIC_API_URL + url,
      data: data,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Esta funcion elimina los datos de una tabla
// recibe la url con el id del registro a eliminar
async function Eliminar(url = "") {
  try {
    let respuesta = await Axios({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_API_URL + url,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export { Consultar, Crear, Actualizar, Eliminar };

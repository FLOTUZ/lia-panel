import { IImagen } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";
import axios from "axios";

export class ImagenesService {
  private url = "/imagenes";

  public async create(data: IImagen) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: IImagen, id: number) {
    const respuesta: any = await Actualizar(`${this.url}/${id}`, data);
    return respuesta;
  }

  public async getAll() {
    const respuesta: any = await Consultar(`${this.url}`);
    return respuesta;
  }

  public async getById(id: number) {
    const respuesta: any = await Consultar(`${this.url}/${id}`);
    return respuesta;
  }

  public async remove(id: number) {
    const respuesta = await Eliminar(`${this.url}/${id}`);
    return respuesta;
  }

  async count(usuario: IImagen) {
    const respuesta = await Consultar(`${this.url}/count`, usuario);
    return respuesta;
  }

  async getUploadImage(idImagen: number) {
    const imageBlob = (
      await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}/imagenes/uploads/${idImagen}`,
        {
          responseType: "blob",
        }
      )
    ).data;

    return URL.createObjectURL(imageBlob);
  }
}

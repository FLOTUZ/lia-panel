import { IAsistencias } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class AsistenciasService {
  private url = "/asistencias";

  public async create(data: IAsistencias) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: IAsistencias, id: number) {
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

  async count(usuario: IAsistencias) {
    const respuesta = await Consultar(`${this.url}/count`, usuario);
    return respuesta;
  }
}

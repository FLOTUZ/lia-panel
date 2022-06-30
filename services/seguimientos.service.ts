import { ISeguimiento } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class SeguimientosService {
  private url = "/seguimientos";

  public async create(data: ISeguimiento) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: ISeguimiento, id: number) {
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

  public async getSeguiminetosByTicket(id: number) {
    const respuesta: any = await Consultar(`${this.url}/ticket/${id}`);
    return respuesta;
  }
}

import { IAcuerdoConformidad, } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class AcuerdoConformidadService {
  private url = "/acuerdos-conformidad";

  public async create(data: IAcuerdoConformidad) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: IAcuerdoConformidad, id: number) {
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

  async count(usuario: IAcuerdoConformidad) {
    const respuesta = await Consultar(`${this.url}/count`, usuario);
    return respuesta;
  }


}

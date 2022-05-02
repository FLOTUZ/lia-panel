import { ICiudad } from "./api.models";
import { Crear, Actualizar, Consultar, Eliminar } from "./ApiCall";

export class CiudadesService {
  private url = "/ciudades";
  constructor() {}
  public async create(data: ICiudad) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: ICiudad, id: number) {
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
}

import axios from "axios";
import { ITipoConcepto } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class TipoConceptoService {
  private url = "/tipo-de-concepto";

  public async create(data: ITipoConcepto) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: ITipoConcepto, id: number) {
    const respuesta: any = await Actualizar(`${this.url}/${id}`, data);
    return respuesta;
  }

  public async getAll() {
    const respuesta: any = await Consultar(`${this.url}`);
    return respuesta;
  }

  public async getAllByServiceId(servicios: number[]) {
    const respuesta: any = await Crear(`${this.url}/servicio`, servicios);

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

import { IAseguradora, ICotizacionTecnico } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class CotizacionTecnicoService {
  private url = "/cotizaciones-tecnico";

  public async create(data: ICotizacionTecnico) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: ICotizacionTecnico, id: number) {
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

  async count(usuario: ICotizacionTecnico) {
    const respuesta = await Consultar(`${this.url}/count`, usuario);
    return respuesta;
  }
  async cotizacionByTicket(idTicket: number) {
    const respuesta: any = await Consultar(`${this.url}/ticket/${idTicket}`);
    return respuesta;
  }
}

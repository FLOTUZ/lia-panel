import { ITecnico } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class TecnicoService {
  private url = "/tecnicos";
  public async create(data: ITecnico) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: ITecnico, id: number) {
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

  public async agregarServiciosATecnico(idTecnico: number, data: string[]) {
    const respuesta: any = Crear(`${this.url}/${idTecnico}/servicios`, data);
    return respuesta;
  }

  public async editarServiciosDeTecnico(idTecnico: number, data: number[]) {
    const respuesta: any = await Actualizar(
      `${this.url}/${idTecnico}/servicios`,
      data
    );

    return respuesta;
  }
}

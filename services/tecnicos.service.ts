import axios from "axios";
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

  public async addServicesAndCiudadesCoberturaToTecnico(
    idTecnico: number,
    servicios: string[],
    ciudades_cobertura: string[]
  ) {
    const respuesta: any = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}${this.url}/${idTecnico}/servicios-ciudadescobertura`,
      {
        servicios,
        ciudades_cobertura,
      }
    );
    return respuesta;
  }
}

import axios from "axios";
import { IServicio } from "./api.models";
import { Crear } from "./ApiCall";

export class ServiciosToTecnicos {
  private url = process.env.NEXT_PUBLIC_APIURL + "/tecnicos";

  public async create(idTecnico: number, data: string[]) {
    const respuesta: any = axios.post(
      `${this.url}/${idTecnico}/servicios`,
      data
    );
    return respuesta;
  }
}

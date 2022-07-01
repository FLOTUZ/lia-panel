import axios from "axios";

export class ServiciosToTecnicos {
  private url = process.env.NEXT_PUBLIC_APIURL + "/tecnicos";

  public async create(idTecnico: number, data: string[]) {
    const respuesta: any = axios.post(
      `${this.url}/${idTecnico}/servicios`,
      data
    );
    return respuesta;
  }

  public async update(idTecnico: number, data: string[]){
    console.log(`${this.url}/${idTecnico}/servicios`);
    
    const respuesta: any = await axios.patch(
      `${this.url}/${idTecnico}/servicios`,
      data
    );

    
    
    return respuesta;
  }
}

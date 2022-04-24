import { IUsuario } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class UsuariosService {
  private url = "/users";

  public async nuevo(data: IUsuario) {
    const respuesta: any = await Crear(this.url, data);
    console.log(respuesta.message);
    
    return respuesta;
  }

  public async update(data: IUsuario, id: number) {
    const respuesta: any = await Actualizar(`${this.url}/${id}`, data);
    return respuesta;
  }

  public async listado() {
    const respuesta: any = await Consultar(`${this.url}`);
    return respuesta.data as IUsuario[];
  }

  public async userById(id: number) {
    const respuesta: any = await Consultar(`${this.url}/${id}`);
    return respuesta;
  }

  public async eliminar(id: number) {
    const respuesta = await Eliminar(`${this.url}/${id}`);
    return respuesta;
  }

  async count(usuario: IUsuario) {
    const respuesta = await Consultar(`${this.url}/count`, usuario);
    return respuesta;
  }
}

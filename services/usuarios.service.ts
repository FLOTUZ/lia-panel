import { IUsuario } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";

export class UsuariosService {
  private url = "/usuarios";

  public async nuevo(data: IUsuario) {
    const respuesta: any = await Crear(this.url, data);

    return respuesta.data as IUsuario;
  }

  public async update(data: IUsuario, id: number) {
    const respuesta: any = await Actualizar(`${this.url}/${id}`, data);
    return respuesta.data as IUsuario;
  }

  public async listado() {
    const respuesta: any = await Consultar(`${this.url}`);
    return respuesta.data as IUsuario[];
  }

  public async userById(id: number) {
    const respuesta: any = await Consultar(`${this.url}/${id}`);
    return respuesta.data as IUsuario;
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

import { IUsuario } from "./api.models";
import { Actualizar, Consultar, Crear, Eliminar } from "./ApiCall";
import { AuthService } from "./auth.service";

export class UsuariosService {
  private url = "/users";

  public async create(data: IUsuario) {
    const respuesta: any = await Crear(this.url, data);
    return respuesta;
  }

  public async update(data: IUsuario, id: number) {
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

  async count(usuario: IUsuario) {
    const respuesta = await Consultar(`${this.url}/count`, usuario);
    return respuesta;
  }

  async getLogedUser() {
    const respuesta: any = await Consultar(`${this.url}/usuario-logueado`);

    if (respuesta.status === 200) {
      const data = respuesta.data as IUsuario;
      new AuthService().setToken(data.hashedRt!);
      return data;
    }
    return null;
  }
}

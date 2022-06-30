import axios from "axios";
import { ILogin, ILoginResponse } from "./api.models";
import { Consultar, Crear } from "./ApiCall";

export class AuthService {
  private url = "/auth";
  private TOKEN_KEY: string = "access_token";
  constructor() {}

  async login(credenciales: ILogin): Promise<boolean> {
    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}${this.url}/login`,
      credenciales
    );

    if (response.status === 201) {
      const { access_token } = response.data as ILoginResponse;
      this.setToken(access_token);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

  setToken(token: string) {
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  async refreshToken() {
    const respuesta: any = await Crear(`${this.url}/refresh`);
    if (respuesta.status === 201) {
      const { access_token } = respuesta.data as ILoginResponse;
      this.setToken(access_token);
    }
  }

  getToken(): string | null {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  initAxiosInterceptor() {
    axios.interceptors.request.use((config: any) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async checkToken(): Promise<boolean> {
    const respuesta: any = await Consultar(`${this.url}/sayhi`);
    if (respuesta.status === 401) {
      this.logout();
      return false;
    }
    this.refreshToken();
    return true;
  }
}

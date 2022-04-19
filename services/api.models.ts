export interface IUsuario {
  id?: number;
  usuario: string;
  email: string;
  password: string;
  abrir_ticket?: boolean;
  cerrar_ticket?: boolean;
  inactivo?: boolean;
  rol: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export interface ITicket {
  id: number;
  estado: string;
  titulo: string;
  descripcion: string;
  aseguradora: string;
  tecnico?: string;
}

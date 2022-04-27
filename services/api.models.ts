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

export interface ITecnico {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  calificacion?: number;
  telefono: string;
  usuarioId: number;
  ciudadId: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IServicio {
  id?: number;
  nombre: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  tipo: string;
}
export interface IAseguradoras {
  id?: number;
  nombre: string;
  telefono: string;
  expediente: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IUsuario {
  id?: number;
  usuario: string;
  email: string;
  password: string;
  abrir_ticket?: boolean;
  cerrar_ticket?: boolean;
  inactivo?: boolean;
  rol: string;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface ITicket {
  id?: number
  num_expediente: string
  asistencia_vial: boolean
  fecha_llamada: string
  nombre_asesor_aseguradora: string
  nombre_asesor_gpo_lias: string
  nombre_usuario_final: string
  titulo_ticket: string
  asistenciaId: number
  aseguradoraId: number
  problematica: string
  ciudad: string
  colonia: string
  calle: string
  numero_domicilio: string
  banderazo: string | null
  total_salida: string
  cobertura: string
  cotizacion_gpo_lias: string | null
  deducible: string
  kilometraje: number
  costo_de_kilometraje: number
  costo_por_caseta: number
  total: string
  anticipo: string
  hora_cierre?: string | null
  casetas: number
  costo_gpo_lias: string
  estado: string
  num_interior?: string | null
  modelo_carro?: string | null
  placas_carro?: string | null
  color_carro?: string | null
  marca_carro?: string | null
  is_servicio_domestico?: boolean | null
  is_servicio_foraneo?: boolean | null
  createdAt?: string | null
  updatedAt?: string | null
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
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IServicio {
  id?: number;
  nombre: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  tipo: string;
}
export interface IAseguradoras {
  id?: number;
  nombre: string;
  telefono: string;
  expediente?: string;
  Asistencia?: IAsistencias[] | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IAsistencias {
  id?: number;
  nombre: string;
  aseguradoraId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
export interface ICiudad {
  id?: number
  nombre: string
  latitud?: number | null
  longitud?: number | null
  createdAt?: string | null
  updatedAt?: string | null
}
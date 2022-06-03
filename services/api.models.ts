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
  id?: number;
  num_expediente: string;
  asistencia_vial: boolean;
  fecha_llamada: string;
  nombre_asesor_gpo_lias: string;
  asesorId: number;
  nombre_usuario_final: string;
  titulo_ticket: string;
  asistenciaId: number;
  aseguradoraId: number;
  problematica: string;
  ciudadId: number;
  colonia: string;
  calle: string;
  numero_domicilio: string;
  banderazo: string | null;
  total_salida: string;
  cobertura: string;
  cotizacion_gpo_lias: string | null;
  deducible: string;
  kilometraje: number;
  costo_de_kilometraje: number;
  costo_por_caseta: number;
  total: string;
  anticipo: string;
  hora_cierre?: string | null;
  casetas: number;
  costo_gpo_lias: string;
  estado: string;
  num_interior?: string | null;
  modelo_carro?: string | null;
  placas_carro?: string | null;
  color_carro?: string | null;
  marca_carro?: string | null;
  is_servicio_domestico?: boolean | null;
  is_servicio_foraneo?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ITecnico {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  calificacion?: number;
  telefono: string;
  usuarioId?: number;
  ciudadId?: number;
  ViveEn?: ICiudad;
  Servicio?: IServicio[];
  Ciudad?: ICiudad[];
  Cotizaciones?: ICotizacionTecnico[];
  Usuario?: IUsuario;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IServicio {
  id?: number;
  nombre: string;
  Tecnico?: ITecnico[];
  createdAt?: string | null;
  updatedAt?: string | null;
  tipo?: string;
}
export interface IAseguradora {
  id?: number;
  nombre: string;
  telefono: string;
  telefono_domestico?: string;
  telefono_vial?: string;
  telefono_whats?: string;
  kilometraje_permitido?: number;
  costo_por_kilometro?: number;
  Asistencia?: IAsistencia[] | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IAsistencia {
  id?: number;
  nombre: string;
  aseguradoraId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ICiudad {
  id?: number;
  nombre: string;
  estadoId?: number | null;
  latitud?: number | null;
  longitud?: number | null;
  Estado?: IEstado;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ICotizacionTecnico {
  id?: number;
  diagnostico_problema: string;
  solucion_tecnico: string;
  fecha_contacto: string;
  costo_mano_obra: number;
  costo_materiales: number;
  total_cotizacion: number;
  ticketId?: number;
  tecnicoId?: number;
  preSolucionId?: number;
  isAprobado?: boolean;
  aprobado_por_usuarioId?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IAsesor {
  id?: number;
  nombre: string;
  aseguradoraId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IEstado {
  id?: number;
  nombre: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IAcuerdoConformidad {
  id?: number;
  fecha_acuerdo: Date;
  descripcion_problema: string;
  direccion: string;
  observaciones: string | null;
  actividades_realizadas: string;
  hora_recepcion_servicio: Date;
  hora_llegada_servicio: Date;
  hora_finalizacion_servicio: Date;
  acuerdo_firmado: string | null;
  usuarioFinalId: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IImagen {
  id?: number;
  url: string;
  descripcion: string;
  createdAt?: Date;
  updatedAt?: Date;
}

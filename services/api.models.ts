export interface IUsuario {
  id?: number;
  usuario: string;
  email: string;
  password?: string;
  inactivo?: boolean;
  rol: string;
  hashedRt?: string | null;
  img_perfilId?: number | null;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface ITicket {
  id?: number;
  num_expediente: string;
  asistencia_vial: boolean;
  fecha_llamada: Date;
  nombre_asesor_gpo_lias: string;
  asesorId: number | null;
  nombre_usuario_final: string;
  titulo_ticket: string;
  asistenciaId: number;
  aseguradoraId: number;
  problematica: string;
  costo_conceptos?: number | null;
  ciudadId: number;
  colonia: string;
  calle: string;
  numero_domicilio: string | null;
  banderazo: number | null;
  total_salida: number;
  cobertura: number;
  cotizacion_gpo_lias: string | null;
  deducible: number;
  kilometraje: number;
  costo_de_kilometraje: number;
  costo_por_caseta: number | null;
  total: number;
  anticipo: number;
  hora_cierre?: string | null;
  casetas: number | null;
  costo_gpo_lias: number;
  estado: string;
  num_interior: string | null;
  modelo_carro: string | null;
  placas_carro: string | null;
  color_carro: string | null;
  marca_carro: string | null;
  is_servicio_domestico: boolean | null;
  is_servicio_foraneo: boolean | null;
  is_archivado: boolean;
  tecnicoId: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  is_facturado?: boolean | null;
  Servicio?: IServicio[];
}

export interface ITecnico {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  calificacion?: number;
  telefono: string;
  usuarioId?: number;
  ciudadId?: number;
  ViveEn?: ICiudad;
  Servicio?: IServicio[];
  Ciudades_Cobertura?: ICiudad[];
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

export interface ISeguimiento {
  id?: number;
  detalles: string;
  fecha_seguimiento: string;
  ticketId: number;
  usuarioId: number;
  asesorId: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  Usuario?: IUsuario;
  Asesor?: IAsesor;
}

export interface IAseguradora {
  id?: number;
  nombre: string;
  telefono: string;
  telefono_domestico?: string;
  telefono_vial?: string;
  telefono_whats?: string;
  kilometraje_permitido?: number;
  costo_por_kilometro: number | null;
  costo_por_kilometro_foraneo: number | null;
  Asistencia?: IAsistencia[] | null;
  createdAt?: string | "";
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
  is_aprobado?: boolean;
  aprobado_por_usuarioId: number;
  hora_llegada: string;
  img_llegadaId: number;
  img_placasId?: number | null;
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
  fecha_acuerdo: string;
  descripcion_problema: string;
  direccion: string;
  observaciones: string | null;
  actividades_realizadas: string;
  hora_recepcion_servicio: string;
  hora_llegada_servicio: string;
  hora_finalizacion_servicio: Date;
  acuerdo_firmado: string | null;
  aprobado_por_usuarioId: number | null;
  is_aprobado?: boolean;
  ticketId: number;
  usuarioFinalId: number | null;
  img_solucionId?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  Usuario_Aprobador?: IUsuario | null;
}

export interface IImagen {
  id?: number;
  url: string;
  descripcion: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILogin {
  usuario: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface IConcepto {
  id?: number;
  nombre: string;
  costo_mano_obra: number | null;
  tipo_conceptoId: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface ITipoConcepto {
  id: number;
  nombre: string;
  servicioId: number;
  Conceptos: IConcepto[];
  createdAt: Date | null;
  updatedAt: Date | null;
}

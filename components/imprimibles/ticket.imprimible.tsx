import LiasIMG from "../../public/logo.jpeg";
import Image from "next/image";
import {
  IAseguradora,
  IAsesor,
  IAsistencia,
  ICiudad,
  ICotizacionTecnico,
  IEstado,
  ISeguimiento,
  ITecnico,
  ITicket,
  IUsuario,
} from "@/services/api.models";
import { useEffect, useState } from "react";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsesoresService } from "@/services/asesores.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { CiudadesService } from "@/services/ciudades.service";
import { EstadosService } from "@/services/estados.service";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";

import moment from 'moment';
moment.locale("es");
import 'moment-timezone'
import 'moment/locale/es';
import { SeguimientosService } from "@/services/seguimientos.service";
import { UsuariosService } from "@/services/usuarios.service";
import { TecnicoService } from "@/services/tecnicos.service";

interface TicketImprimibleProp {
  ticket: ITicket;
}




const TicketImprimible = ({ ticket }: TicketImprimibleProp) => {
  const [aseguradora, setAseguradora] = useState<IAseguradora>();
  const [asistencia, setAsistencia] = useState<IAsistencia>();
  const [ciudad, setCiudad] = useState<ICiudad>();
  const [estado, setEstado] = useState<IEstado>();
  const [asesorAseguradora, setAsesorAseguradora] = useState<IAsesor>();
  const [seguimiento, setSeguimiento] = useState<ISeguimiento>();
  const [tecnico, setTecnico] = useState<ITecnico>();
  const [cotizacionTecnico, setCotizacionTecnico] = useState<ICotizacionTecnico>();

  /*OBTENER TPECNICO */
  const getTecnico = async () => {
    const service = new TecnicoService();
    const respuesta = await service.getById(Number(ticket.tecnicoId));

    if (respuesta.status === 200) {
      const data = respuesta.data as ITecnico;
      setTecnico(data);
    }
    console.log(respuesta);
  };

 /*Obtener aseguradora*/
 const getAseguradora = async () => {
  const service = new AseguradoraService();
  const respuesta = await service.getById(Number(ticket?.aseguradoraId));
  const data = respuesta.data as IAseguradora;
  setAseguradora(data);
};

/*Obtener asistencia*/
const getAsistencia = async () => {
  const service = new AsistenciasService();
  const respuesta = await service.getById(Number(ticket?.asistenciaId));
  const data = respuesta.data as IAsistencia;
  setAsistencia(data);
};

/*Obtener ciudad*/
const getCiudad = async () => {
  const service = new CiudadesService();
  const respuesta = await service.getById(Number(ticket?.ciudadId));
  const data = respuesta.data as IEstado;
  setCiudad(data);
};

/*Obtener estado*/
const getEstado = async () => {
  const service = new EstadosService();
  const respuesta = await service.getById(ciudad?.estadoId!);
  const data = respuesta.data as IEstado;
  setEstado(data);
};

/*Obtener asesor de aseguradora*/
const getAsesorAseguradora = async () => {
  const service = new AsesoresService();
  const respuesta = await service.getById(ticket?.asesorId!);
  const data = respuesta.data as IAsesor;
  setAsesorAseguradora(data);
};

/*Obtener Seguimiento*/
const getSeguimiento = async () => {
  const service = new SeguimientosService();
  const respuesta = await service.getAll();
  const data = respuesta.data as ISeguimiento;
  setSeguimiento(data);
};

/*OBTENER COTIZACION TECNICO */
const getcotizacioTecnico = async () => {
  const service = new CotizacionTecnicoService();
  const respuesta = await service.getAll();
  const data = respuesta.data as ICotizacionTecnico;
  setCotizacionTecnico(data);
}
  useEffect(() => {
    getAseguradora();
    getAsistencia();
    getCiudad();
    getEstado();
    getAsesorAseguradora();
    getSeguimiento();
    getTecnico();
    getcotizacioTecnico();
  }, [ticket]);

  const styleTitulo = {
    margin: "0.5em",
    color: "black",
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Orden de Servicio</title>

      <div
        className="principal"
        style={{
          width: "792px",
          height: "1200px",
          borderStyle: "solid",
          borderColor: "black",
        }}
      >

        <div style={{ float: "left", paddingLeft: "10px" }}>
          <Image
            src={LiasIMG}
            height={80}
            width={80}
            alt="Logo de Grupo Lias"
          />
        </div>

        <div style={{ width: "20%", height: "0%", float: "left", paddingTop: "30px" }}>
          <h2 >ORDEN DE SERVICIO </h2>
        </div>
        <div
          style={{ width: "30%", height: "0%", float: "left", paddingTop: "30px" }}
        >
          <p >FECHA: {moment(ticket?.fecha_llamada).format("LL")}</p>
        </div>
        <div
          style={{ width: "30%", height: "0%", float: "left", paddingTop: "30px" }}
        >
          <p >TIEMPO:</p>
        </div>



        <div style={{ width: "30%", paddingLeft: "10px", paddingTop: "90px" }}>
          <p>EXPEDIENTE:  {ticket?.num_expediente}</p>
        </div>
        <div style={{ width: "30%", paddingLeft: "50px", float: "right" }}>
          <p>KM:  {ticket?.kilometraje}</p>
        </div>
        <div style={{ width: "30%", paddingLeft: "60px", float: "right" }}>
          <p >CASETAS:  {ticket?.casetas}</p>
        </div>


        <div
          style={{
            width: "60%",
            height: "10%",
            display: "inline-block",
            paddingLeft: "15px",
            paddingTop: "20px",
          }}
        >
          <p>PROBLEMA:  {ticket?.problematica}</p>
        </div>

        <div
          style={{
            width: "35%",
            height: "22%",
            float: "right",
            paddingTop: "0px",
          }}
        >
          <div>
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              $BANDERAZO:  {ticket?.banderazo}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              $TOTAL DE SALIDA:  {ticket?.total_salida}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              $SEGURO:  {ticket?.cobertura}
            </p>
          </div>
          <div>
            <p
              style={{
                paddingTop: "5%",
                paddingLeft: "80px",
              }}
            >
              $DEDUCIBLE:  {ticket?.deducible}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "5%", paddingLeft: "80px" }}>
              COSTO GPOLIAS:  {ticket?.costo_gpo_lias}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "5%", paddingLeft: "80px" }}>
              $TOTAL:  {ticket?.total}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "5%", paddingLeft: "80px" }}>
              60% DE ANTICIPO:  {ticket?.anticipo}
            </p>
          </div>
        </div>

        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>USUARIO:  {ticket?.nombre_usuario_final}</p>
        </div>

        <div style={{ width: "30%", height: "5%", float: "right" }}>
          <p>ESTADO:  {estado?.nombre}</p>
        </div>

        <div style={{ width: "30%", height: "5%", float: "right" }}>
          <p>CIUDAD:  {ciudad?.nombre}</p>
        </div>


        <div
          style={{
            width: "30%",
            height: "7%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p> COLONIA:  {ticket?.colonia}</p>
        </div>

        <div
          style={{
            width: "30%",
            height: "7%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>
            CALLE Y NO.:  {ticket?.calle} {ticket?.numero_domicilio}{" "}
          </p>
        </div>

        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
            paddingTop: "20px"
          }}
        >
          <p>ASISTENCIA:  {asistencia?.nombre}</p>
        </div>
        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "25px",
          }}
        >
          <p>CUBRE SEGURO:  {ticket?.cobertura} </p>
        </div>

        <div
          style={{
            width: "35%",
            height: "5%",
            float: "left",
            paddingLeft: "10px",
          }}
        >
          <p>ASESOR:  {asesorAseguradora?.nombre}</p>
        </div>

        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >

          <p>HORA DE LLAMADA:  {moment(ticket?.fecha_llamada).format("LLL")}</p>
        </div>
        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>TÉCNICO:  {`${tecnico?.nombre!} ${tecnico?.apellido_materno!}`} </p>
        </div>

        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>HORA DE CONTACTO:  { }</p>
        </div>
        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>HORA DE TERMINO:  </p>
        </div>

        <div style={{ width: "30%", height: "5%", float: "right" }}>
          <p>COLOR:  {ticket?.color_carro}</p>
        </div>
        <div style={{ width: "30%", height: "5%", float: "right" }}>
          <p>PLACAS:  {ticket?.placas_carro}</p>
        </div>
        <div style={{ width: "30%", height: "5%", float: "right" }}>
          <p>MODELO DE CARRO:  {ticket?.modelo_carro}</p>
        </div>
        <div style={{ width: "30%", height: "5%", float: "right" }}>
          <p>MARCA:  {ticket?.marca_carro}</p>
        </div>




        <br />
        <br />

        <table
          style={{
            width: "100%",
            height: "300px",
            border: "1px solid",
            textAlign: "left",
          }}
        >
          <tr>
            <td
              colSpan={3}
              style={{ border: "1px solid", verticalAlign: "15px" }}
            >
              SOLUCION DEL TÉCNICO:  {cotizacionTecnico?.solucion_tecnico }
            </td>
            <td
              colSpan={2}
              style={{ border: "1px solid", verticalAlign: "15px" }}
            >
              COTIZACION DE GPOLIAS:  {ticket?.cotizacion_gpo_lias}
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$MO:  { cotizacionTecnico?.costo_mano_obra}</td>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$MAT:  {cotizacionTecnico?.costo_materiales }</td>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$TÉCNICO:  {cotizacionTecnico?.total_cotizacion }</td>
          </tr>
        </table>

        <br />
        <br />
        <table style={{ width: "100%", border: "1px solid" }}>
          <th>ASESOR DE GRUPO LÍAS</th>
          <th>SEGUIMIENTO</th>
          <th>ASESOR DE SEGURO</th>
          <th>FECHA Y HORA</th>
          <tr>
            <td style={{ border: "1px solid", height: "30px" }} ></td>
            <td style={{ border: "1px solid", height: "30px" }}> {seguimiento?.detalles}</td>
            <td style={{ border: "1px solid", height: "30px" }}> {seguimiento?.Asesor?.nombre}</td>
            <td style={{ border: "1px solid", height: "30px" }}> {seguimiento?.fecha_seguimiento}</td>
          </tr>

        </table>
      </div>
      {/*<style jsx global>{`
        * {
          border-width: 1px;
          border-style: solid;
          border-color: red;
        }
      `}</style>*/}
    </div>
  );
};

export default TicketImprimible;


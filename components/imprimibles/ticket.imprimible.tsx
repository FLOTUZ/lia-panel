import WhatsIMG from "../../public/logoDeWhats.png";
import LiasIMG from "../../public/logo.jpeg";
import Image from "next/image";
import {
  IAseguradora,
  IAsesor,
  IAsistencia,
  ICiudad,
  IEstado,
  ITicket,
} from "@/services/api.models";
import { useEffect, useState } from "react";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsesoresService } from "@/services/asesores.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { CiudadesService } from "@/services/ciudades.service";
import { EstadosService } from "@/services/estados.service";
import { CrearCotizacionTecnico } from "@/forms/CotizacionTecnicoForm";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";
import { TecnicoService } from "@/services/tecnicos.service";
import { color } from "@chakra-ui/react";

interface TicketImprimibleProp {
  ticket?: ITicket;
}

const TicketImprimible = ({ ticket }: TicketImprimibleProp) => {
  const [aseguradora, setAseguradora] = useState<IAseguradora>();
  const [asistencia, setAsistencia] = useState<IAsistencia>();
  const [ciudad, setCiudad] = useState<ICiudad>();
  const [estado, setEstado] = useState<IEstado>();
  const [asesorAseguradora, setAsesorAseguradora] = useState<IAsesor>();
  useEffect(() => {
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
      const respuesta = await service.getById(ticket!.asesorId);
      const data = respuesta.data as IAsesor;
      setAsesorAseguradora(data);
    };

    getAseguradora();
    getAsistencia();
    getCiudad();
    getEstado();
    getAsesorAseguradora();
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
        {/* CABECERA DE LA ESTRUCTURA */}
        <div style={{  height: "80px" }}>
          <div
            className="logo"
            style={{ width: "15%",  float: "left" }}
          >
            <Image
              src={LiasIMG}
              height={80}
              width={80}
              alt="Logo de Grupo Lias"
            />
          </div>

         
            <div style={{ width: "40%", height: "20%", float: "left" }}>
              <h2 >ORDEN DE SERVICIO </h2>
            </div>
            <div
              style={{ width: "20%", height: "20%", display: "inline-block", paddingTop: "15px" }}
            >
              <p >FECHA: </p>
            </div>
            <div
              style={{ width: "20%", height: "20%", display: "inline-block", paddingTop: "15px" }}
            >
              <p >TIEMPO:</p>
            </div>
            <div style={{ width: "20%", height: "100%", float: "right", paddingTop: "15px" }}>
              <p >VISITA:</p>
            </div>
            </div>
       
        <div style={{ width: "30%",  paddingLeft:"10px", paddingTop:"15px" }}>
          <p>EXPEDIENTE: {ticket?.num_expediente}</p>
        </div>
        <div style={{ width: "30%",  paddingLeft:"50px", float: "right" }}>
          <p>KM: {ticket?.kilometraje}</p>
        </div>
        <div style={{ width: "30%",   paddingLeft:"60px", float: "right" }}>
          <p >CASETAS: {ticket?.casetas}</p>
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
          <p>PROBLEMA: {ticket?.problematica}</p>
        </div>

        <div
          style={{
            width: "35%",
            height: "22%",
            float: "right",
            paddingTop: "30px",
          }}
        >
          <div>
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              $BANDERAZO {ticket?.banderazo}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              $TOTAL DE SALIDA {ticket?.total_salida}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              $SEGURO {aseguradora?.nombre}
            </p>
          </div>
          <div>
            <p
              style={{
                paddingTop: "5%",
                paddingLeft: "80px",
              }}
            >
              $DEDUCIBLE {ticket?.deducible}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "5%", paddingLeft: "80px" }}>
              COSTO GPOLIAS {ticket?.costo_gpo_lias}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "5%", paddingLeft: "80px" }}>
              $TOTAL {ticket?.total}
            </p>
          </div>
          <div>
            <p style={{ paddingTop: "5%", paddingLeft: "80px" }}>
              60% DE ANTICIPO {ticket?.anticipo}
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
          <p>USUARIO {ticket?.nombre_usuario_final}</p>
        </div>

        <div style={{ width: "30%", height: "5%", float: "right" }}>
          <p>CIUDAD {ciudad?.nombre}</p>
        </div>

        <div
          style={{
            width: "30%",
            height: "7%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p> COLONIA {ticket?.colonia}</p>
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
            CALLE Y NO. {ticket?.calle} {ticket?.numero_domicilio}{" "}
          </p>
        </div>

        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>ASISTENCIA {asistencia?.nombre}</p>
        </div>
        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "25px",
          }}
        >
          <p>CUBRE SEGURO {ticket?.cobertura} </p>
        </div>
        <div
          style={{
            width: "35%",
            height: "5%",
            float: "left",
            paddingLeft: "25px",
          }}
        >
          <p>ASESOR {asesorAseguradora?.nombre}</p>
        </div>

        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>HORA DE LLAMADA {ticket?.fecha_llamada}</p>
        </div>
        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>TÉCNICO {} </p>
        </div>

        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>HORA DE CONTACTO {}</p>
        </div>
        <div
          style={{
            width: "30%",
            height: "5%",
            float: "left",
            paddingLeft: "15px",
          }}
        >
          <p>HORA DE TERMINO</p>
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
              SOLUCION DEL TECNICO
            </td>
            <td
              colSpan={2}
              style={{ border: "1px solid", verticalAlign: "15px" }}
            >
              COTIZACION DE GPOLIAS {ticket?.cotizacion_gpo_lias}
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$MO</td>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$MAT</td>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$TÉCNICO</td>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$MO</td>
            <td style={{ verticalAlign: "15px", height: "10px" }}>$MAT</td>
          </tr>
        </table>

        <br />

        <div className="cita" style={{ width: "100%", height: "30px" }}>
          <div
            className="expediente"
            style={{ width: "25%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>CITA</p>
          </div>
        </div>
        <div className="fecha" style={{ width: "100%", height: "30px" }}>
          <div
            className="expediente"
            style={{ width: "25%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>FECHA</p>
          </div>
          <div
            className="hora"
            style={{ width: "25%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>HORA</p>
          </div>
          <div
            className="inicio"
            style={{ width: "25%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>INICIO</p>
          </div>
          <div
            className="termino"
            style={{ width: "25%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>TERMINO</p>
          </div>
        </div>

        <div className="cita" style={{ width: "100%", height: "30px" }}>
          <div
            className="expediente"
            style={{ width: "25%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>CITA</p>
          </div>
        </div>
        <div className="fecha" style={{ width: "100%", height: "30px" }}>
          <div
            className="expediente"
            style={{ width: "25%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>FECHA</p>
          </div>
          <div
            className="hora"
            style={{ width: "25%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>HORA</p>
          </div>
          <div
            className="inicio"
            style={{ width: "25%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>INICIO</p>
          </div>
          <div
            className="termino"
            style={{ width: "25%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "40px" }}>TERMINO</p>
          </div>
        </div>

        <br />
        <br />
        <table style={{ width: "100%", border: "1px solid" }}>
          <th>ASESOR DE GRUPO LIAS </th>
          <th>SEGUIMIENTO</th>
          <th>ASESOR DE SEGURO</th>
          <th>FECHA Y HORA</th>
          <tr>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
            <td style={{ border: "1px solid", height: "30px" }}></td>
          </tr>
        </table>
      </div>
      <style jsx global>{`
        * {
          border-width: 1px;
          border-style: solid;
          border-color: red;
        }
      `}</style>
    </div>
  );
};

export default TicketImprimible;

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
        <div className="cabecera" style={{ width: "100%", height: "80px" }}>
          <div
            className="logo"
            style={{ width: "15%", height: "100%", float: "left" }}
          >
            <Image
              src={LiasIMG}
              height={80}
              width={80}
              alt="Logo de Grupo Lias"
            />
          </div>
          {/* AQUI VAN EL TEXTO Y LOS PRIMEROS TRES RECUADROS */}
          <div
            className="orden"
            style={{ width: "85%", height: "100%", float: "right" }}
          >
            <div
              className="textoPrincipal"
              style={{ width: "40%", height: "100%", float: "left" }}
            >
              <h2>ORDEN DE SERVICIO </h2>
            </div>
            <div
              className="fecha"
              style={{ width: "20%", height: "100%", display: "inline-block" }}
            >
              <p style={{ paddingTop: "15px" }}>FECHA: </p>
            </div>
            <div
              className="fecha"
              style={{ width: "20%", height: "100%", display: "inline-block" }}
            >
              <p style={{ paddingTop: "15px" }}>TIEMPO:</p>
            </div>
            <div
              className="fecha"
              style={{ width: "20%", height: "100%", float: "right" }}
            >
              <p style={{ paddingTop: "15px" }}>VISITA:</p>:
            </div>
          </div>
        </div>

        {/* INICIA LA LINEA 2 */}
        <div className="linea2" style={{ width: "100%", height: "50px" }}>
          <div
            className="expediente"
            style={{ width: "30%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              EXPEDIENTE: {ticket?.num_expediente}
            </p>
          </div>
          <div
            className="km"
            style={{ width: "33%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              KM: {ticket?.kilometraje}
            </p>
          </div>
          <div
            className="casetas"
            style={{ width: "33%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              CASETAS: {ticket?.casetas}
            </p>
          </div>
        </div>
        {/* INICIA LA LINEA 3 */}
        <div className="linea3" style={{ width: "100%", height: "80px" }}>
          <div
            className="problema"
            style={{ width: "35%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              PROBLEMA: {ticket?.problematica}
            </p>
          </div>
         
        </div>
        {/* INICIA LA LINEA 4 */}
        <div className="linea4" style={{ width: "100%", height: "25px" }}>
          

        <div
            className="problema"
            style={{ width: "30%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "15%", paddingLeft: "80px" }}>
              USUARIO {ticket?.nombre_usuario_final}
            </p>
          </div>
          <div
            className="casetas"
            style={{ width: "35%", height: "100%", float: "right" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              BANDERAZO {ticket?.banderazo}
            </p>
          </div>
        </div>
        {/* INICIA LINEA 5 */}
        <div className="linea5" style={{ width: "100%", height: "25px" }}>
          <div
            className="casetas"
            style={{ width: "35%", height: "100%", float: "right" }}
          >
            <p style={{ paddingTop: "5%", paddingLeft: "80px" }}>
              TOTAL DE SALIDA {ticket?.total_salida}
            </p>
          </div>
        </div>
        <div className="linea5" style={{ width: "100%", height: "25px" }}>
          <div
            className="casetas"
            style={{ width: "35%", height: "100%", float: "right" }}
          >
            <p style={{ paddingTop: "20%", paddingLeft: "80px" }}>
              SEGURO {aseguradora?.nombre}
            </p>
          </div>
        </div>
        <div className="linea5" style={{ width: "100%", height: "25px" }}>
          <div
            className="casetas"
            style={{ width: "35%", height: "100%", float: "right" }}
          >
            <p style={{ paddingTop: "25%", paddingLeft: "80px" }}>
              DEDUCIBLE {ticket?.deducible}
            </p>
          </div>
        </div>
        {/* LINEA COMBINADA */}
        <div className="linea2" style={{ width: "100%", height: "50px" }}>
     
       
       
        </div>
        {/* COMBINADA SIN CELDA CENTRAL */}
        <div className="colonia" style={{ width: "100%", height: "30px" }}>
        <div
            className="km"
            style={{ width: "50%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "100px" }}>
              CIUDAD {ciudad?.nombre}
            </p>
          </div>
          
          <div
            className="expediente"
            style={{ width: "33%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              COLONIA {ticket?.colonia}
            </p>
          </div>
          <div
            className="espacio"
            style={{ width: "33%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}></p>
          </div>
        
        </div>
        {/* COMBINADA SIN CELDA CENTRAL */}
        <div className="colonia" style={{ width: "100%", height: "30px" }}>
          <div
            className="expediente"
            style={{ width: "30%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "20%", paddingLeft: "80px" }}>
              CALLE Y NO. {ticket?.calle} {ticket?.numero_domicilio}{" "}
            </p>
          </div>
          <div
            className="casetas"
            style={{ width: "40%", height: "100%", float:"left", display: "inline-block" }}
          >
            <p style={{ paddingTop: "10%", paddingLeft: "100px" }}>
              COSTO GPOLIAS {ticket?.costo_gpo_lias}
            </p>
          </div>
          <div
            className="total"
            style={{ width: "30%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "15%", paddingLeft: "70px" }}>
              TOTAL {ticket?.total}
            </p>
          </div>
          <div
            className="espacio"
            style={{ width: "35%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "10%", paddingLeft: "80px" }}></p>
          </div>
          <div
            className="total"
            style={{ width: "30%", height: "100%", float: "right" }}
          >
            <p style={{ paddingTop: "0%", paddingLeft: "40px" }}>
              60% DE ANTICIPO {ticket?.anticipo}
            </p>
          </div>
        </div>
        {/* COMBINADA */}
        <div className="asistencia" style={{ width: "100%", height: "30px" }}>
          <div
            className="expediente"
            style={{ width: "45%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "15%", paddingLeft: "80px" }}>
              ASISTENCIA {asistencia?.nombre}
            </p>
          </div>
          <div
            className="cubreseguro"
            style={{ width: "25%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "10%", paddingLeft: "80px" }}>
              CUBRE SEGURO {ticket?.cobertura}{" "}
            </p>
          </div>
          <div
            className="asesor"
            style={{ width: "40%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "10%", paddingLeft: "80px" }}>
              ASESOR {asesorAseguradora?.nombre}
            </p>
          </div>
        </div>
        {/* COMBINADA DE 4 CELDAS */}
        <div className="asistencia" style={{ width: "100%", height: "30px" }}>
          <div
            className="expediente"
            style={{ width: "25%", height: "100%", float: "left" }}
          >
            <p style={{ paddingTop: "0", paddingLeft: "80px" }}>
              HORA DE LLAMADA {ticket?.fecha_llamada}
            </p>
          </div>
          <div
            className="cubreseguro"
            style={{ width: "30%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "15%", paddingLeft: "130px" }}>
              TÉCNICO {}{" "}
            </p>
          </div>
          <div
            className="asesor"
            style={{ width: "40%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "10%", paddingLeft: "80px" }}>
              HORA DE CONTACTO
            </p>
          </div>
          <div
            className="asesor"
            style={{ width: "40%", height: "100%", display: "inline-block" }}
          >
            <p style={{ paddingTop: "10%", paddingLeft: "80px" }}>
              HORA DE TERMINO
            </p>
          </div>
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
    </div>
  );
};

export default TicketImprimible;

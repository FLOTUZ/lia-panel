import WhatsIMG from "../../assets/logoDeWhats.png";
import LiasIMG from "../../assets/logo.jpeg";
import Image from "next/image";
import { IAcuerdoConformidad, ITicket } from "@/services/api.models";

interface AcuerdoConformidadProps {
  acuerdo?: IAcuerdoConformidad;
  ticket?:ITicket;
}
function AcuerdoConformidad({ acuerdo }: AcuerdoConformidadProps) {
  return (
    <>
      <div>
        <title>Orden de Servicio </title>

        <div
          className="principal"
          style={{
            width: "1000px",
            height: "600px",
            borderStyle: "solid",
            borderColor: "black",
          }}
        >
          <div className="cabecera">
            <div
              style={{
                marginLeft: "30px",
                float: "left",
                width: "50%",
                marginTop: "0",
              }}
            >
              <Image
                src={LiasIMG}
                height={200}
                width={200}
                alt="Logo de Grupo Lias"
              />
            </div>
            <div className="expediente" style={{ float: "inline-end" }}>
              <h1 style={{ paddingTop: "60px" }}>EXPEDIENTE {}</h1>
            </div>
          </div>
          <div
            className="cuerpo"
            style={{ width: "1000px", height: "400px", marginTop: "100px" }}
          >
            {/* FILA UNO DEL FORMULARIO */}
            <div className="fila1" style={{ width: "100%", height: "30px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "left" }}
              >
                <p 
                
                style={{ paddingLeft: "20px" }}>
                  PROBLEMA: {acuerdo?.descripcion_problema}
                </p>
              </div>
              <div
                className="celda2"
                style={{ width: "50%", height: "100%", float: "right" }}
              >
                <p style={{ paddingLeft: "20px" }}>FECHA {acuerdo?.fecha_acuerdo}</p>
              </div>
            </div>
            {/* FILA DOS DEL FORMULARIO */}
            <div className="fila2" style={{ width: "100%", height: "30px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "left" }}
              >
                <p style={{ paddingLeft: "20px" }}>DIRECCION: </p>
              </div>
              <div
                className="celda2"
                style={{ width: "50%", height: "100%", float: "right" }}
              >
                <p style={{ paddingLeft: "20px" }}>ASISTENCIA:</p>
              </div>
            </div>
            {/* FILA TRES DEL FORMULARIO */}
            <div className="fila3" style={{ width: "100%", height: "30px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "left" }}
              >
                <p style={{ paddingLeft: "20px" }}>USUARIO:</p>
              </div>
              <div
                className="celda2"
                style={{ width: "50%", height: "100%", float: "right" }}
              >
                <p style={{ paddingLeft: "20px" }}>ASESOR:</p>
              </div>
            </div>
            {/* FILA CUATRO DEL FORMULARIO */}
            <div className="fila4" style={{ width: "100%", height: "30px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "left" }}
              >
                <p style={{ paddingLeft: "20px" }}>HORAS: {acuerdo?.hora_llegada_servicio}-{acuerdo?.hora_finalizacion_servicio}</p>
              </div>
              <div
                className="celda2"
                style={{ width: "50%", height: "100%", float: "right" }}
              >
                <p style={{ paddingLeft: "20px" }}>SE REALIZÓ:{acuerdo?.descripcion_problema} </p>
              </div>
            </div>
            {/* FILA CINCO DEL FORMULARIO */}
            <div className="fila5" style={{ width: "100%", height: "30px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "left" }}
              >
                <p style={{ paddingLeft: "20px" }}>OBSERVACIONES {acuerdo?.observaciones}</p>
              </div>
            </div>
            {/* FILA SEIS DEL FORMULARIO */}
            <div className="fila5" style={{ width: "100%", height: "30px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "right" }}
              >
                <h1 style={{ paddingLeft: "20px" }}>CONFORMIDAD </h1>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="fila6" style={{ width: "100%", height: "40px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "right" }}
              >
                <h6 style={{ paddingLeft: "90px" }}>NOMBRE Y FIRMA </h6>
              </div>
            </div>
            <br />
            <div className="fila5" style={{ width: "100%", height: "30px" }}>
              <div
                className="celda1"
                style={{ width: "50%", height: "100%", float: "left" }}
              >
                <div
                  className="whatsapp"
                  style={{
                    width: "10%",
                    height: "100%",
                    float: "left",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <Image
                    src={WhatsIMG}
                    height={30}
                    width={30}
                    alt="Logotipo de Whatsapp"
                  />
                </div>
                <div className="cel" style={{ float: "inherit" }}>
                  <p>44 34 71 43 56</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AcuerdoConformidad;

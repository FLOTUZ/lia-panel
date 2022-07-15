import Header from "@/common/Header";

import {
  Box,
  Divider,
  FormLabel,
  Input,
  FormControl,
  Center,
  Textarea,
  Text,
  SimpleGrid,
  InputGroup,
  InputLeftAddon,
  Badge,
} from "@chakra-ui/react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import {
  IAcuerdoConformidad,
  IAseguradora,
  IAsesor,
  IAsistencia,
  ICiudad,
  ICotizacionTecnico,
  IEstado,
  ITicket,
} from "@/services/api.models";
import { CrearCotizacionTecnico } from "@/forms/CotizacionTecnicoForm";
import { useEffect, useState } from "react";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { EstadosService } from "@/services/estados.service";
import { CiudadesService } from "@/services/ciudades.service";
import { AsesoresService } from "@/services/asesores.service";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";
import { AcuerdoConformidadService } from "@/services/acuerdo-conformidad.service";
import { AcuerdoConformidadView } from "@/forms/AcuerdoConformidadForm";

import moment from "moment";
moment.locale("es");
import "moment-timezone";
import "moment/locale/es";

interface VerTicketDomesticoProps {
  ticket: ITicket;
}

export function VerTicketDomestico({ ticket }: VerTicketDomesticoProps) {
  const [aseguradora, setAseguradora] = useState<IAseguradora>();
  const [asistencia, setAsistencia] = useState<IAsistencia>();
  const [ciudad, setCiudad] = useState<ICiudad>();
  const [estado, setEstado] = useState<IEstado>();
  const [asesorAseguradora, setAsesorAseguradora] = useState<IAsesor>();
  const [cotizacion, setCotizacion] = useState<ICotizacionTecnico>();
  const [mostrarAcuerdoConformidad, setMostrarAcuerdoConformidad] =
    useState(false);
  const [acuerdoconformidad, setAcuerdoConformidad] =
    useState<IAcuerdoConformidad>();
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

  const getCotizacionTecnico = async () => {
    const service = new CotizacionTecnicoService();
    const respuesta = await service.cotizacionByTicket(ticket.id!);

    const data = respuesta.data as ICotizacionTecnico;
    setCotizacion(data);
  };

  const getAcuerdoConformidad = async () => {
    const service = new AcuerdoConformidadService();
    const respuesta = await service.acuerdoConformidadByTicket(ticket.id!);

    if (respuesta.status == 200) {
      const data = respuesta.data as IAcuerdoConformidad;
      setAcuerdoConformidad(data);
      setMostrarAcuerdoConformidad(true);
    } else {
      setMostrarAcuerdoConformidad(false);
    }
  };

  useEffect(() => {
    getAseguradora();
    getAsistencia();
    getCiudad();
    getAsesorAseguradora();
    getCotizacionTecnico();
  }, [ticket]);
  useEffect(() => {
    getEstado();
    getAcuerdoConformidad();
  }, [ciudad]);

  return (
    <>
      <Header title="Ver Ticket de Servicio Doméstico" />
      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Text fontWeight="bold" fontSize="25px">
          Datos Básicos
        </Text>

        <SimpleGrid columns={[1, 1, 5]} spacing="20px" paddingTop={17}>
          <FormLabel htmlFor="num_expediente">Número de Expediente:</FormLabel>
          <Input
            variant="unstyled"
            isReadOnly
            id="num_expediente"
            type="text"
            placeholder="N° Expediente"
            borderColor="twitter.100"
            defaultValue={ticket.num_expediente}
          />
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 1]} spacing="20px">
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="fecha_llamada">Fecha de la Llamada</FormLabel>
            <Input
              id="fecha_llamada"
              variant="unstyled"
              isReadOnly
              placeholder="Fecha de la Llamada"
              borderColor="twitter.100"
              defaultValue={moment(ticket.fecha_llamada).format("LLLL")}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing="20px">
          <Center>
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="aseguradoraId">Aseguradora</FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="aseguradoraId"
                placeholder="Nombre de Aseguradora"
                borderColor="twitter.100"
                defaultValue={aseguradora?.nombre}
              />
            </FormControl>

            <FormControl paddingTop={15}>
              <FormLabel htmlFor="asistenciaId">Asistencia</FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="asistenciaId"
                placeholder="Nombre de Asistencia"
                borderColor="twitter.100"
                defaultValue={asistencia?.nombre}
              />
            </FormControl>
          </Center>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <Center>
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="nombre_asesor_gpo_lias">
                Asesor de Gpo. Lías
              </FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="nombre_asesor_gpo_lias"
                placeholder="Asesor de Grupo Lías"
                borderColor="twitter.100"
                defaultValue={ticket.nombre_asesor_gpo_lias}
              />
            </FormControl>

            <FormControl paddingTop={15}>
              <FormLabel htmlFor="nombre_asesor_aseguradora">
                Asesor de la Aseguradora
              </FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="nombre_asesor_aseguradora"
                placeholder="Asesor de la Aseguradora"
                borderColor="twitter.100"
                defaultValue={asesorAseguradora?.nombre}
              />
            </FormControl>
          </Center>
        </SimpleGrid>

        <Center>
          <Divider orientation="vertical" />
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="nombre_usuario_final">
              Nombre del Usuario a Brindar Servicio
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="nombre_usuario_final"
              placeholder="Usuario a Brindar Servicio"
              borderColor="twitter.100"
              defaultValue={ticket.nombre_usuario_final}
            />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="titulo_ticket">
              Descripción Corta del Ticket
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="titulo_ticket"
              placeholder="Descripción Corta"
              borderColor="twitter.100"
              defaultValue={ticket.titulo_ticket}
            />
          </FormControl>
        </Center>

        <FormControl paddingTop={15}>
          <FormLabel htmlFor="problematica">
            Descripción de la Problemática
          </FormLabel>
          <Textarea
            id="problematica"
            variant="unstyled"
            placeholder="Problemática"
            borderColor="twitter.100"
            defaultValue={ticket.problematica}
          />
        </FormControl>
        <Text fontWeight={"bold"}>Servicios</Text>
        <SimpleGrid columns={[1, 2, 3]} spacing={2} w={"50%"}>
          {ticket.Servicio?.map((servicio) => {
            return <Badge width={"fit-content"}>{servicio.nombre}</Badge>;
          })}
        </SimpleGrid>
      </Box>

      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Text fontWeight="bold" fontSize="25px" w={"100%"}>
          Cotización de Grupo Lías
        </Text>
        <Divider orientation="vertical" />

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="estado">Estado</FormLabel>

            <Input
              variant="unstyled"
              isReadOnly
              id="estado"
              placeholder="Estado"
              borderColor="twitter.100"
              defaultValue={estado?.nombre}
            ></Input>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
            <Input
              id="ciudad"
              placeholder="Ciudad"
              variant="unstyled"
              isReadOnly
              borderColor="twitter.100"
              defaultValue={ciudad?.nombre}
            ></Input>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 4]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="colonia">Colonia</FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="colonia"
              placeholder="Colonia"
              borderColor="twitter.100"
              defaultValue={ticket.colonia}
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="calle">Calle</FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="calle"
              placeholder="Calle"
              borderColor="twitter.100"
              defaultValue={ticket.calle}
            />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="numero_domicilio_exterior">
              Número Exterior
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="numero_domicilio"
              placeholder="N° de Domicilio Exterior"
              borderColor="twitter.100"
              defaultValue={ticket?.numero_domicilio!}
            />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="numero_domicilio_interior">
              Número Interior
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="num_interior"
              placeholder=""
              borderColor="twitter.100"
              defaultValue={
                ticket.num_interior !== null ? ticket.num_interior : ""
              }
            />
          </FormControl>
        </SimpleGrid>

        <Center>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="cobertura">
              Monto de Cobertura del Seguro
            </FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                id="cobertura"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                max={2}
                borderColor="twitter.100"
                defaultValue={ticket.cobertura}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="costo_gpo_lias">Costo Grupo Lías</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                id="costo_gpo_lias"
                placeholder="0.00"
                paddingLeft={5}
                min={0}
                type="number"
                borderColor="twitter.100"
                defaultValue={ticket.costo_gpo_lias}
              />
            </InputGroup>
          </FormControl>
        </Center>

        <SimpleGrid columns={[1, 1, 4]} spacing="40px">
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="kilometraje">Kilómetros a Recorrer</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<IoSpeedometerOutline />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                id="kilometraje"
                min={0}
                placeholder="0"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                defaultValue={ticket.kilometraje}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="costoPorKilometro">
              Costo por Kilómetro
            </FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                id="costo_de_kilometraje"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                defaultValue={ticket.costo_de_kilometraje}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 2, 4]} spacing="40px">
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="deducible">Deducible</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                id="deducible"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                defaultValue={ticket.deducible}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="anticipo">Anticipo 60%</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                id="anticipo"
                isReadOnly
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                defaultValue={ticket.anticipo}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15} paddingLeft={4}>
            <FormLabel htmlFor="total_salida">Total de Salida</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                id="total_salida"
                isReadOnly
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                defaultValue={ticket.total_salida}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="total">Monto Total</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                isReadOnly
                variant="unstyled"
                id="total"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                defaultValue={ticket.total}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>
      </Box>
      {cotizacion ? <CrearCotizacionTecnico cotizacion={cotizacion!} /> : null}
      {mostrarAcuerdoConformidad ? (
        <AcuerdoConformidadView acuerdoconformidad={acuerdoconformidad!} />
      ) : null}
    </>
  );
}

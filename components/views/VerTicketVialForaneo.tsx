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
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

import { IoSpeedometerOutline } from "react-icons/io5";
import Header from "@/common/Header";
import {
  IAseguradora,
  IAsesor,
  IAsistencia,
  ICiudad,
  IEstado,
  ITicket,
} from "@/services/api.models";
import SeguimientoForm from "@/forms/SeguimientoForm";
import { BsPrinter } from "react-icons/bs";
import { CrearCotizacionTecnico } from "@/forms/CotizacionTecnicoForm";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { CiudadesService } from "@/services/ciudades.service";
import { EstadosService } from "@/services/estados.service";
import { AsesoresService } from "@/services/asesores.service";

interface VerTicketVialForaneoProps {
  ticket: ITicket;
}

export function VerTicketVialForaneo({ ticket }: VerTicketVialForaneoProps) {
  const [aseguradora, setAseguradora] = useState<IAseguradora>();
  const [asistencia, setAsistencia] = useState<IAsistencia>();
  const [ciudad, setCiudad] = useState<ICiudad>();
  const [estado, setEstado] = useState<IEstado>();
  const [asesorAseguradora, setAsesorAseguradora] = useState<IAsesor>()

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
      const respuesta = await service.getById(ticket.asesorId);
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
    <>
      <Header title="Ver Ticket de Servicio Vial Foráneo" />
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
            value={ticket.num_expediente}
          />
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 1]} spacing="20px">
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="fecha_llamada">Fecha de la Llamada</FormLabel>
            <Input
              w={"fit-content"}
              id="fecha_llamada"
              variant="unstyled"
              isReadOnly
              placeholder="Fecha de la Llamada"
              borderColor="twitter.100"
              value={ticket.fecha_llamada}
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
                value={aseguradora?.nombre}
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
                value={asistencia?.nombre}
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
                value={ticket.nombre_asesor_gpo_lias}
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
                value={asesorAseguradora?.nombre}
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
              value={ticket.nombre_usuario_final}
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
            value={ticket.problematica}
          />
        </FormControl>
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
              value={estado?.nombre}
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
            <Input
              id="ciudad"
              placeholder="Ciudad"
              variant="unstyled"
              isReadOnly
              borderColor="twitter.100"
              value={ciudad?.nombre}
            ></Input>
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={[1, 1, 4]} spacing={4}>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="modelo_del_carro">Modelo del Carro</FormLabel>
            <Input
              variant="unstyled"
              id="modelo_carro"
              placeholder="Modelo del Carro"
              value={ticket.modelo_carro!}
            ></Input>
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="placas">Placas</FormLabel>
            <Input
              variant="unstyled"
              id="placas_carro"
              placeholder="Placas"
              value={ticket.placas_carro!}
            ></Input>
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="color">Color</FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="color_carro"
              placeholder="Color"
              borderColor="twitter.100"
              value={ticket.color_carro!}
            />
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="marca">Marca</FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="marca_carro"
              placeholder="Marca"
              borderColor="twitter.100"
              value={ticket.marca_carro!}
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
                paddingLeft={8}
                type="number"
                max={2}
                borderColor="twitter.100"
                value={ticket.cobertura}
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
                paddingLeft={8}
                min={0}
                type="number"
                borderColor="twitter.100"
                value={ticket.costo_gpo_lias}
              />
            </InputGroup>
          </FormControl>
        </Center>

        <SimpleGrid paddingTop={10} columns={[1, 1, 4]} spacing="40px">
          <FormControl>
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
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                value={ticket.kilometraje}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
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
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                value={ticket.costo_de_kilometraje}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="casetas">Número de Casetas</FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="casetas"
              placeholder="0"
              type="number"
              borderColor="twitter.100"
              value={ticket.casetas}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="costoPorCaseta">Costo por Caseta</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                id="costo_por_caseta"
                min={0}
                placeholder="0.00"
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                value={ticket.costo_por_caseta}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid paddingTop={5} columns={[1, 2, 4]} spacing="40px">
          <FormControl isRequired paddingTop={15}>
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
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                value={ticket.deducible}
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
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                value={ticket.anticipo}
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
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                value={ticket.total_salida}
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
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                value={ticket.total}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>
        <FormControl paddingTop={15}>
          <FormLabel htmlFor="cotizacion_gpo_lias">
            Cotización de Grupo Lías (Información Adicional)
          </FormLabel>
          <Textarea
            id="cotizacion_gpo_lias"
            variant="unstyled"
            isReadOnly
            placeholder="Cotización"
            borderColor="twitter.100"
            value={ticket.cotizacion_gpo_lias!}
          />
        </FormControl>
      </Box>
      <CrearCotizacionTecnico />
      <SeguimientoForm />
    </>
  );
}

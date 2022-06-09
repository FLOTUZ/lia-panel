import DesktopLayout from "@/layouts/DesktopLayout";
import {
  IAseguradora,
  IAsistencia,
  ICotizacionTecnico,
  IServicio,
  ITicket,
} from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { ServiciosService } from "@/services/servicios.service";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  useDisclosure,
  useToast,
  Box,
  Center,
  Stack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FaFileSignature } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { TicketsService } from "@/services/tickets.service";
import { VerTicketVialForaneo } from "@/views/VerTicketVialForaneo";
import { VerTicketVial } from "@/views/VerTicketVial";
import { VerTicketDomestico } from "@/views/VerTicketDomestico";
import { VerTicketDomesticoForaneo } from "@/views/VerTicketDomesticoForaneo";
import TicketImprimible from "components/imprimibles/ticket.imprimible";
import Printer from "components/printer/printer";
import { CrearCotizacionTecnicoManual } from "@/forms/CotizacionTecnicoManualForm ";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";
import Link from "next/link";

function TicketVer() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen: abierto, onOpen: abrir, onClose: cerrar } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCot,
    onOpen: onOpenCotizacionT,
    onClose: onCloseCotizacionT,
  } = useDisclosure();
  const [ticket, setTicket] = useState<ITicket>();
  const [aseguradora, setAseguradora] = useState<IAseguradora>();
  const [asistencia, setAsistencia] = useState<IAsistencia>();
  const [cotizacion, setCotizacion] = useState<ICotizacionTecnico>();

  const [serviciosList, setServiciosList] = useState<IServicio[]>([]);
  const [tecnicosByServicios, setTecnicosByServicios] = useState<IServicio>();
  const [tecnicoId, setTecnicoId] = useState(0);

  const [tipoVista, setTipoVista] = useState<JSX.Element>();

  const { idTicket } = router.query;

  /*Obtener aseguradora*/
  const getAseguradora = async () => {
    const service = new AseguradoraService();
    const respuesta = await service.getById(Number(ticket?.aseguradoraId));

    const data = respuesta.data as IAseguradora;
    setAseguradora(data);
  };

  /*Obtener asistencias*/
  const getAsistencia = async () => {
    const service = new AsistenciasService();
    const respuesta = await service.getById(Number(ticket?.asistenciaId));
    const data = respuesta.data as IAsistencia;
    setAsistencia(data);
  };

  const getTicket = async () => {
    const service = new TicketsService();
    const respuesta = await service.getById(Number(idTicket));
    const data = respuesta.data as ITicket;

    setTicket(data);
  };

  const consultarServicios = async () => {
    const service = new ServiciosService();
    const respuesta = await service.getAll();
    const data = respuesta.data as IServicio[];

    setServiciosList(data);
  };

  const consultarTecnicosByServicio = async (id: number) => {
    const servicio = new ServiciosService();
    const respuesta = await servicio.getTecnicosByServicio(id);
    const data = respuesta.data as IServicio;

    setTecnicosByServicios(data);
  };

  const asignarTecnicoWithId = async () => {
    const data = { estado: "TOMADO" } as ITicket;
    const service = new TicketsService();
    const respuesta = await service.update(data, ticket?.id || 0);

    toast({
      title: "Técnico Asignado.",
      position: "bottom-right",
      description: "Se Asigno el Servicio al Técnico",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    router.push("/tickets");
  };



  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    getAsistencia();
    getAseguradora();
    getVista();
    consultarServicios();
  }, [ticket]);

  const getVista = () => {
    if (ticket?.asistencia_vial && ticket?.is_servicio_foraneo) {
      setTipoVista(<VerTicketVialForaneo ticket={ticket} />);
      
    } else if (ticket?.is_servicio_domestico && ticket?.is_servicio_foraneo) {
      setTipoVista(<VerTicketDomesticoForaneo ticket={ticket} />);
      
    } else if (ticket?.asistencia_vial) {
      setTipoVista(<VerTicketVial ticket={ticket} />);
    } else if (ticket?.is_servicio_domestico) {
      setTipoVista(<VerTicketDomestico ticket={ticket} />);
      
    } else {
      setTipoVista(<></>);
    }
  };

  const dataTicket = {
    titulo: "Mecanico para JOE",
  };

  return (
    <DesktopLayout>
      {ticket?.estado === "NUEVO" ? (
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          position="fixed"
          width={"80px"}
          height={"80px"}
          bottom="20px"
          right={["16px", "84px"]}
          zIndex={1}
          borderWidth={1}
          bgColor={"black"}
          color={"white"}
          borderRadius={100}
          _hover={{
            boxShadow: "10px 10px 5px #DDD9D9",
            bgColor: " #98A7C9",
            color: "black",
          }}
          onClick={abrir}
        >
          <Center marginTop={"3.5"}>
            <IoAdd size={40} />
          </Center>
        </Box>
      ) : null}

      {ticket?.estado === "TOMADO" ? (
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          position="fixed"
          width={"80px"}
          height={"80px"}
          bottom="20px"
          right={["16px", "84px"]}
          zIndex={1}
          borderWidth={1}
          bgColor={" #0C6A7D"}
          color={"white"}
          borderRadius={100}
          _hover={{
            boxShadow: "10px 10px 5px #DDD9D9",
            bgColor: " #618CF0",
            color: "white",
          }}
          onClick={onOpenCotizacionT}
        >
          <Center marginTop={"3.5"}>
            <FaFileSignature size={40} />
          </Center>
        </Box>
      ) : null}

      {ticket?.estado === "FINALIZADO" ? (
        <Box
          margin={"1%"}
          justifyContent={"center"}
          alignItems={"center"}
          position="fixed"
          width={"80px"}
          height={"80px"}
          right={["16px", "84px"]}
          zIndex={1}
        >
          <Button
            padding={"2%"}
            justifySelf="end"
            width={"150px"}
            height={"60px"}
            leftIcon={<BsPrinter size={"30px"} />}
            id="imprimirTicket"
            colorScheme="telegram"
            borderColor="twitter.100"
            size="lg"
            onClick={onOpen}
          />
        </Box>
      ) : null}

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Impresión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Printer doc={<TicketImprimible ticket={ticket} />} />
          </ModalBody>
          <ModalFooter>
            <Stack
              align="center"
              paddingLeft={"60%"}
              spacing={4}
              direction="row"
            >
              <Button
                paddingLeft={10}
                paddingRight={10}
                colorScheme="red"
                variant="outline"
                onClick={onClose}
              >
                Cerrar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseCotizacionT} size={"full"} isOpen={isOpenCot}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Cotizacion de Tecnico</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CrearCotizacionTecnicoManual
              ticket={ticket!}
              cotizacion={cotizacion!}
            />
          </ModalBody>
          <ModalFooter>
            <Box paddingRight={10} >
              <Button colorScheme={"red"} variant="outline" onClick={onCloseCotizacionT}>Cancelar</Button>
            </Box>
            <Box>
              <Button colorScheme={"green"} variant="outline">Guardar</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {tipoVista}

      {/* ASIGNAR TÉCNICO */}
      <Modal closeOnOverlayClick={false} isOpen={abierto} onClose={cerrar}>

        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Asignar Técnico</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="servicioId">Servicio</FormLabel>
              <Select
                id="servicioId"
                placeholder="Selecciona el Servicio"
                variant="filled"
                borderColor="twitter.100"
                onChange={(e) => {
                  consultarTecnicosByServicio(Number(e.target.value));
                }}
              >
                {serviciosList.length !== 0
                  ? serviciosList.map((servicio) => {
                    return (
                      <option key={servicio.id} value={Number(servicio.id)}>
                        {servicio.nombre}
                      </option>
                    );
                  })
                  : null}
              </Select>
            </FormControl>
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="tecnicoId">Técnico y Número Teléfonico</FormLabel>
              <Select
                id="tecnicoId"
                placeholder="Selecciona el Técnico"
                variant="filled"
                borderColor="twitter.100"
                onChange={(e) => {
                  setTecnicoId(Number(e.target.value));
                }}
              >
                {tecnicosByServicios?.Tecnico?.length !== 0
                  ? tecnicosByServicios?.Tecnico?.map((tecnico) => {
                    return (
                      <option key={tecnico.id} value={tecnico.id}>
                        {tecnico.nombre},
                        {" "}
                        {tecnico.telefono}
                      </option>
                    );
                  })
                  : null}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>

            <Button colorScheme="green" mr={3} onClick={asignarTecnicoWithId}>
              Asignar
            </Button>


            <Button colorScheme="red" onClick={cerrar}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DesktopLayout>
  );
}

export default TicketVer;

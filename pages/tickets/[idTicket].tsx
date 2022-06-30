import DesktopLayout from "@/layouts/DesktopLayout";
import {
  IAseguradora,
  IAsistencia,
  ICotizacionTecnico,
  ISeguimiento,
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
  HStack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Input,
  Switch,
  SimpleGrid,
  VStack,
  Text,
  Flex,
  Badge,
  Alert,
  AlertIcon,
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

import moment from "moment";
import { AddIcon } from "@chakra-ui/icons";
import { SeguimientosService } from "@/services/seguimientos.service";

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
  const {
    isOpen: isOpenSeguimiento,
    onOpen: onOpenSeguimiento,
    onClose: onCloseSeguimiento,
  } = useDisclosure();
  const [ticket, setTicket] = useState<ITicket>();
  const [aseguradora, setAseguradora] = useState<IAseguradora>();
  const [asistencia, setAsistencia] = useState<IAsistencia>();
  const [cotizacion, setCotizacion] = useState<ICotizacionTecnico>();

  const [serviciosList, setServiciosList] = useState<IServicio[]>([]);
  const [tecnicosByServicios, setTecnicosByServicios] = useState<IServicio>();
  const [tecnicoId, setTecnicoId] = useState(0);

  const [archivado, setArchivado] = useState<boolean>(false);

  const [tipoVista, setTipoVista] = useState<JSX.Element>();

  const { idTicket } = router.query;

  /*Obtener aseguradora*/
  const getAseguradora = async () => {
    const service = new AseguradoraService();
    const respuesta = await service.getById(Number(ticket?.aseguradoraId));

    const data = respuesta.data as IAseguradora;
    if (respuesta.status == 200) {
      setAseguradora(data);
    }
  };

  /*Obtener asistencias*/
  const getAsistencia = async () => {
    const service = new AsistenciasService();
    const respuesta = await service.getById(Number(ticket?.asistenciaId));
    const data = respuesta.data as IAsistencia;

    if (respuesta.status == 200) {
      setAsistencia(data);
    }
  };

  const getTicket = async () => {
    const service = new TicketsService();
    const respuesta = await service.getById(Number(idTicket));
    const data = respuesta.data as ITicket;

    if (respuesta.status == 200) {
      setTicket(data);
      setArchivado(data.is_archivado!);
    }
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

  const [asesor_gpo_lias, setAsesor_gpo_lias] = useState("");
  const [seguimiento, setSeguimiento] = useState("");
  const [asesor_seguro, setAsesor_seguro] = useState("");
  const [fecha_hora, setFecha_hora] = useState("");
  const [listadoSeguimientos, setListadoSeguimientos] = useState<
    ISeguimiento[]
  >([]);

  const guardarSeguimiento = async () => {
    const data: ISeguimiento = {
      detalles: seguimiento,
      nombre_asesor_seguro: asesor_seguro,
      fecha_seguimiento: new Date(Date.now()).toISOString(),
      ticketId: Number(idTicket),
      usuarioId: 1, //TODO: Obtener el id del usuario logeado
    };
    console.log(data);

    const service = new SeguimientosService();
    const response = await service.create(data);

    if (response.status === 201) {
      onCloseSeguimiento();
      await consultarSeguimientos();
      toast({
        title: "Seguimiento Nuevo Agregado con Éxito",
        description: "El Seguimiento se Agrego con Éxito",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: response.message,
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /*CONSULTA DE LA TABLA DE SEGUIMIENTOS*/
  const consultarSeguimientos = async () => {
    const service = new SeguimientosService();
    const respuesta = await service.getAll();
    const data = respuesta.data as ISeguimiento[];

    if (respuesta.status == 200) {
      setListadoSeguimientos(data);
    } else {
    }
  };

  const archivarTicket = async () => {
    const payload = {
      is_archivado: !archivado,
    } as ITicket;
    console.log(payload);

    const service = new TicketsService();
    const respuesta: any = await service.update(payload, ticket?.id!);

    console.log(respuesta.data);
    if (respuesta.status == 200) {
      const t = respuesta.data as ITicket;
      setArchivado(t.is_archivado!);
    }
  };

  useEffect(() => {
    consultarSeguimientos();
  }, []);

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

      {/*
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
  */}

      {ticket?.estado === "FINALIZADO" ? (
        <Box>
          <SimpleGrid
            position="fixed"
            columns={2}
            spacingX="40px"
            spacingY="20px"
          >
            <Box
              margin={"1%"}
              justifyContent={"center"}
              alignItems={"center"}
              position="fixed"
              right={["16px", "84px"]}
              zIndex={1}
            >
              <Button
                padding={"2%"}
                justifySelf="end"
                width={"100px"}
                height={"50px"}
                leftIcon={<BsPrinter size={"30px"} />}
                id="imprimirTicket"
                colorScheme="telegram"
                borderColor="twitter.100"
                size="lg"
                onClick={onOpen}
              />
            </Box>
            <Box
              margin={"1%"}
              justifyContent={"center"}
              alignItems={"center"}
              position="fixed"
              height={"50px"}
              right={["16px", "250px"]}
              zIndex={1}
              borderRadius="md"
              bg="tomato"
              color="white"
            >
              <FormControl
                display="flex"
                alignItems="center"
                as={SimpleGrid}
                columns={{ base: 1, lg: 4 }}
              >
                <FormLabel padding={3} htmlFor="isChecked">
                  Archivar ticket:
                </FormLabel>

                <Switch
                  isChecked={archivado}
                  margin={"5px"}
                  size={"lg"}
                  onChange={() => {
                    setArchivado(!archivado);
                    archivarTicket();
                  }}
                />
              </FormControl>
            </Box>
          </SimpleGrid>

          <Box
            margin={"1%"}
            justifyContent={"center"}
            alignItems={"center"}
            bottom="20px"
            right={["16px", "84px"]}
            position="fixed"
          >
            {archivado ? (
              <Alert variant="solid" status="info">
                <AlertIcon />
                Este ticket se encuentra archivado
              </Alert>
            ) : null}
          </Box>
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

      {/*  
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
            <Box paddingRight={10}>
              <Button
                colorScheme={"red"}
                variant="outline"
                onClick={onCloseCotizacionT}
              >
                Cancelar
              </Button>
            </Box>
            <Box>
              <Button colorScheme={"green"} variant="outline">
                Guardar
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    */}

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
              <FormLabel htmlFor="tecnicoId">
                Técnico y Número Teléfonico
              </FormLabel>
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
                          {tecnico.nombre}, {tecnico.telefono}
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

      {/* Seguimiento */}
      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        p="6"
        rounded="md"
        bg="white"
      >
        <HStack spacing={4} w={"50%"}>
          <Button
            onClick={onOpenSeguimiento}
            leftIcon={<AddIcon />}
            colorScheme="facebook"
            variant="solid"
          >
            Agregar Nuevo Seguimiento
          </Button>
        </HStack>

        <Box marginLeft={"1%"} marginTop="20px">
          <TableContainer>
            <Table size={"md"} variant="simple" colorScheme="teal">
              <TableCaption>Seguimientos</TableCaption>
              <Thead>
                <Tr>
                  <Th>Asesor Gpo Lías</Th>
                  <Th>Seguimiento</Th>
                  <Th>Asesor Seguro</Th>
                  <Th>Fecha y Hora</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listadoSeguimientos.length != 0 ? (
                  listadoSeguimientos.map((seguimiento, index) => {
                    return (
                      <Tr key={index}>
                        <Td></Td>
                        <Td>{seguimiento.detalles}</Td>
                        <Td>{seguimiento.nombre_asesor_seguro}</Td>
                        <Td>
                          {moment(seguimiento.fecha_seguimiento).format("LLL")}
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>No hay data</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenSeguimiento}
        onClose={onCloseSeguimiento}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea un Nuevo Seguimiento</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel padding={1}>Asesor de Gpo Lías</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Asesor Gpo Lías"
                onChange={(e) => {
                  setAsesor_gpo_lias(e.target.value);
                }}
              />

              <FormLabel padding={1}>Seguimiento</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Seguimiento"
                onChange={(e) => {
                  setSeguimiento(e.target.value);
                }}
              />

              <FormLabel padding={1}>Asesor Seguro</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Asesor Seguro"
                onChange={(e) => {
                  setAsesor_seguro(e.target.value);
                }}
              />

              <FormLabel>Fecha y Hora</FormLabel>
              <Input
                w={"fit-content"}
                variant="filled"
                type="datetime-local"
                borderColor="twitter.100"
                onChange={(e) => {
                  setFecha_hora(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="whatsapp"
              variant="solid"
              mr={3}
              onClick={guardarSeguimiento}
            >
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DesktopLayout>
  );
}

export default TicketVer;

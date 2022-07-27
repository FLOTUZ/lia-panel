import DesktopLayout from "@/layouts/DesktopLayout";
import {
  IAcuerdoConformidad,
  IAseguradora,
  IAsesor,
  IAsistencia,
  ICotizacionTecnico,
  ISeguimiento,
  IServicio,
  ITecnico,
  ITicket,
  IUsuario,
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
  Alert,
  AlertIcon,
  Switch,
  SimpleGrid,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { BsArrowLeft, BsPrinter } from "react-icons/bs";
import { TicketsService } from "@/services/tickets.service";
import { VerTicketVialForaneo } from "@/views/VerTicketVialForaneo";
import { VerTicketVial } from "@/views/VerTicketVial";
import { VerTicketDomestico } from "@/views/VerTicketDomestico";
import { VerTicketDomesticoForaneo } from "@/views/VerTicketDomesticoForaneo";
import TicketImprimible from "components/imprimibles/ticket.imprimible";
import Printer from "components/printer/printer";

import moment from "moment";
import { AddIcon } from "@chakra-ui/icons";
import { SeguimientosService } from "@/services/seguimientos.service";
import { VerInformacionTecnico } from "@/views/VerInformacionTecnico";
import { TecnicoService } from "@/services/tecnicos.service";
import { AsesoresService } from "@/services/asesores.service";
import { UsuariosService } from "@/services/usuarios.service";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";
import { AcuerdoConformidadService } from "@/services/acuerdo-conformidad.service";

function TicketVer() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen: abierto, onOpen: abrir, onClose: cerrar } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [espera, setEspera] = useState<boolean>(true);

  const {
    isOpen: isOpenSeguimiento,
    onOpen: onOpenSeguimiento,
    onClose: onCloseSeguimiento,
  } = useDisclosure();
  const [ticket, setTicket] = useState<ITicket>();
  const [aseguradora, setAseguradora] = useState<IAseguradora>();

  const [serviciosList, setServiciosList] = useState<IServicio[]>([]);
  const [tecnicosByServicios, setTecnicosByServicios] = useState<IServicio>();
  const [tecnicoId, setTecnicoId] = useState(0);

  const [archivado, setArchivado] = useState<boolean>(false);

  const [facturado, setFacturado] = useState<boolean>(false);

  const [tipoVista, setTipoVista] = useState<JSX.Element>();

  const [tecnico, setTecnico] = useState<ITecnico>();

  const { idTicket } = router.query;

  const [seguimiento, setSeguimiento] = useState("");
  const [asesor_seguro, setAsesor_seguro] = useState<number>();
  const [fecha_hora, setFecha_hora] = useState("");
  const [listadoSeguimientos, setListadoSeguimientos] = useState<
    ISeguimiento[]
  >([]);

  const [idAseguradora, setidAseguradora] = useState(0);
  const [asesorList, setAsesorList] = useState<IAsesor[]>([]);

  const [sesion, setSesion] = useState<IUsuario>();

  /** FACTURAR EL TICKET */
  const facturarTicket = async () => {
    //Se toma el estado del switch
    //El estado se niega debido al comportamiento
    // del Switch de chakra
    const payload = {
      is_facturado: !facturado,
    } as ITicket;

    const service = new TicketsService();
    const respuesta = await service.update(payload, ticket?.id!);

    if (respuesta.status == 200 && ticket?.is_facturado == false) {
      const data = respuesta.data as ITicket;
      setTicket(data);
      toast({
        title: "Factura realizada.",
        description: "La factura se ha realizado, exitosamente.",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else if (ticket?.is_facturado == true) {
      toast({
        title: "Factura desactivada.",
        description: "La factura fue desactivada.",
        position: "bottom-right",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /*Obtener aseguradora*/
  const getAseguradora = async () => {
    if (ticket?.aseguradoraId == null) {
      return;
    }
    const service = new AseguradoraService();
    const respuesta = await service.getById(Number(ticket?.aseguradoraId));

    const data = respuesta.data as IAseguradora;
    if (respuesta.status == 200) {
      setAseguradora(data);
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

    if (respuesta.status == 200) {
      setServiciosList(data);
    }
  };

  const consultarTecnicosByServicio = async (id: number) => {
    const servicio = new ServiciosService();
    const respuesta = await servicio.getTecnicosByServicio(id);
    const data = respuesta.data as IServicio;

    if (respuesta.status == 200) {
      setTecnicosByServicios(data);
    }
  };

  const nuevoSeguimiento = async () => {
    const data: ISeguimiento = {
      detalles: seguimiento,
      fecha_seguimiento: new Date(Date.now()).toISOString(),
      ticketId: Number(idTicket),
      usuarioId: sesion?.id!, //TODO: Obtener el id del usuario logeado
      asesorId: Number(asesor_seguro),
    };

    const service = new SeguimientosService();
    const response = await service.create(data);

    if (response.status === 201) {
      onCloseSeguimiento();
      await consultarSeguimientos();
      toast({
        title: "Seguimiento agregado con éxito",
        description: "El seguimiento se agrego, exitosamente.",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops... Ocurrio un error.",
        description:
          "Posible error: Verifique que ha llenado todos los campos.",
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /*CONSULTA DE LA TABLA DE SEGUIMIENTOS*/
  const consultarSeguimientos = async () => {
    if (ticket?.id != null) {
      const service = new SeguimientosService();
      const respuesta = await service.getSeguimientosByTicket(ticket?.id!);
      const data = respuesta.data as ISeguimiento[];

      if (respuesta.status == 200) {
        setListadoSeguimientos(data);
      }
    }
  };

  const archivarTicket = async () => {
    const payload = {
      is_archivado: !archivado,
    } as ITicket;

    const service = new TicketsService();
    const respuesta: any = await service.update(payload, ticket?.id!);

    if (respuesta.status == 200) {
      const t = respuesta.data as ITicket;

      if (respuesta.status == 200 && ticket?.is_archivado == false) {
        const data = respuesta.data as ITicket;
        setTicket(data);
        toast({
          title: "Archivado realizado.",
          description: "Se ha realizado archivado ticket, exitosamente.",
          position: "bottom-right",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else if (ticket?.is_archivado == true) {
        toast({
          title: "Archivado desactivado.",
          description: "El archivado fue desactivado.",
          position: "bottom-right",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }

      setArchivado(t.is_archivado!);
    }
  };

  /*************** CONSULTA DE TECNICO ************** */

  const consultarTecnico = async () => {
    if (ticket?.tecnicoId != null) {
      const service = new TecnicoService();
      const respuesta = await service.getById(ticket?.tecnicoId!);
      const data = respuesta.data as ITecnico;

      if (respuesta.status == 200) {
        setTecnico(data);
      }
    }
  };

  const asignarTecnicoWithId = async () => {
    const data = { estado: "TOMADO", tecnicoId: tecnicoId } as ITicket;
    const service = new TicketsService();
    const respuesta = await service.update(data, ticket?.id || 0);

    if (respuesta.status === 200) {
      onCloseSeguimiento();
      await consultarSeguimientos();
      toast({
        title: "Técnico Asignado.",
        position: "bottom-right",
        description: "Se asigno el servicio, al técnico exitosamente.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops... Ocurrio un error.",
        description: "Error, no se pudo asignar el técnico.",
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    router.push("/tickets");
  };

  const asesorById = async () => {
    if (Number(ticket?.aseguradoraId!) !== 0) {
      const service = new AsesoresService();
      const respuesta: any = await service.getAsesoresByIdAseguradora(
        Number(ticket?.aseguradoraId!)
      );

      if (respuesta.status === 200) {
        const data = respuesta.data as IAsesor[];
        setAsesorList(data);
      }
    }
  };

  /*CONSULTA DE LA ASESORES DE ACUERDO A LA ASEGURADORA*/
  const consultarAsesores = async () => {
    const services = new AsesoresService();
    const response: any = await services.getAsesoresByIdAseguradora(
      Number(idAseguradora)
    );
    const data = response.data as IAsesor[];
    if (response.status == 200) {
      setAsesorList(data || []);
    }
  };

  /*CONSULTA DEL USUARIO LOGUEADO, PARA EL ASESOR DE GPO LÍAS*/
  const getUserLogeado = async () => {
    const service = new UsuariosService();
    const usuario = await service.getLogedUser();

    if (usuario !== null) {
      const variable = usuario as IUsuario;
      setSesion(variable);
    }
  };

  const regresarAEstadoAnterior = async () => {
    const serviceTicket = new TicketsService();
    const serviceCotizacion = new CotizacionTecnicoService();
    const acuerdoService = new AcuerdoConformidadService();
    switch (ticket?.estado) {
      case "TOMADO":
        await serviceTicket.update(
          { estado: "NUEVO", tecnicoId: null },
          ticket?.id!
        );
        break;

      case "COTIZADO":
        await serviceTicket.update({ estado: "TOMADO" }, ticket?.id!);
        const cotizacionAEliminar = await serviceCotizacion.cotizacionByTicket(
          ticket.id!
        );
        serviceCotizacion.remove(cotizacionAEliminar.data?.id!);
        break;

      case "EN PROCESO":
        await serviceTicket.update({ estado: "COTIZADO" }, ticket?.id!);
        const cotizacionADesaprobar =
          await serviceCotizacion.cotizacionByTicket(ticket.id!);
        await serviceCotizacion.update(
          { is_aprobado: false },
          cotizacionADesaprobar.data?.id!
        );
        break;

      case "A CERRAR":
        await serviceTicket.update({ estado: "EN PROCESO" }, ticket?.id!);
        const response = await acuerdoService.acuerdoConformidadByTicket(
          ticket.id!
        );
        if (response.status === 200) {
          const acuerdoDeTicket = response.data as IAcuerdoConformidad;
          await acuerdoService.remove(acuerdoDeTicket.id!);
        }
        break;

      case "FINALIZADO":
        await serviceTicket.update({ estado: "A CERRAR" }, ticket?.id!);
        const respuesta = await acuerdoService.acuerdoConformidadByTicket(
          ticket.id!
        );
        const acuerdoACancelar = respuesta.data as IAcuerdoConformidad;

        const payload = {
          aprobado_por_usuarioId: null,
          is_aprobado: false,
        } as IAcuerdoConformidad;

        const res = await acuerdoService.update(payload, acuerdoACancelar.id!);

        break;

      default:
        break;
    }
    router.back();
  };

  useEffect(() => {
    getUserLogeado();
    getTicket();
  }, []);

  useEffect(() => {
    getAseguradora();
    getVista();
    consultarServicios();
    setFacturado(ticket?.is_facturado!);
    consultarTecnico();
    consultarSeguimientos();
    consultarAsesores();
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
      {ticket?.estado !== "NUEVO" ? (
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          position="fixed"
          width={"80px"}
          ml={2}
          height={"80px"}
          bottom="20px"
          zIndex={1}
          borderWidth={1}
          bgColor={"#df0000"}
          color={"white"}
          borderRadius={100}
          _hover={{
            boxShadow: "5px 5px 5px #DDD9D9",
            bgColor: "white",
            color: "black",
          }}
          onClick={regresarAEstadoAnterior}
        >
          <Center w={"100%"} h={"100%"}>
            <BsArrowLeft size={40} />
          </Center>
        </Box>
      ) : null}
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
            boxShadow: "5px 5px 5px #DDD9D9",
            bgColor: "white",
            color: "black",
          }}
          onClick={abrir}
        >
          <Center w={"100%"} h={"100%"}>
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
            columns={1}
            spacingX="1000px"
            spacingY="20px"
            zIndex={2}
            display={{ md: "flex" }}
          >
            <Box
              margin={"1%"}
              justifyContent={"center"}
              alignItems={"center"}
              position="fixed"
              height={"50px"}
              right={["16px", "380px"]}
              zIndex={1}
              borderRadius="md"
              bg="tomato"
              color="white"
            >
              <FormControl
                display="flex"
                alignItems="center"
                as={SimpleGrid}
                columns={{ base: 1, lg: 2 }}
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

            <Box
              margin={"1%"}
              justifyContent={"center"}
              alignItems={"center"}
              position="fixed"
              width={"190px"}
              height={"50px"}
              right={["16px", "170px"]}
              zIndex={1}
            >
              <Button
                padding={"2%"}
                justifySelf="end"
                width={"150px"}
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
              width={"190px"}
              height={"50px"}
              right={["0.2px"]}
              zIndex={1}
            >
              <FormControl
                paddingTop={2}
                as={SimpleGrid}
                columns={{ base: 1, lg: 2 }}
              >
                <FormLabel
                  htmlFor="facturado"
                  fontWeight={"bold"}
                  color="blue.700"
                >
                  Facturado:
                </FormLabel>
                <Switch
                  id="facturar"
                  size="lg"
                  isChecked={facturado}
                  onChange={() => {
                    setFacturado(!facturado);
                    facturarTicket();
                  }}
                />
              </FormControl>
            </Box>
          </SimpleGrid>
        </Box>
      ) : null}

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Impresión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Printer doc={<TicketImprimible ticket={ticket!} />} />
          </ModalBody>
          <ModalFooter
            position={"fixed"}
            right={["16px", "84px"]}
            paddingTop={10}
          >
            <Button
              paddingLeft={10}
              paddingRight={10}
              colorScheme="red"
              variant="outline"
              position={"inherit"}
              onClick={onClose}
            >
              Cerrar
            </Button>
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

      {tecnico ? <VerInformacionTecnico tecnico={tecnico!} /> : null}

      {/* ASIGNAR TÉCNICO */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={abierto}
        onClose={() => {
          cerrar();
          setEspera(true);
        }}
      >
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
                  setEspera(false);
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
            <Button
              colorScheme="green"
              mr={3}
              onClick={asignarTecnicoWithId}
              //isLoading={}
              disabled={espera}
              //isDisabled=(Boolean(espera))
            >
              Asignar
            </Button>

            <Button
              colorScheme="red"
              onClick={() => {
                cerrar();
                setEspera(true);
              }}
            >
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
        {ticket?.estado === "FINALIZADO" ? (
          <Box>
            <SimpleGrid columns={[2, null, 3]} spacing="40px">
              <Box margin={"1%"}>
                <Button
                  width={"150px"}
                  leftIcon={<BsPrinter size={"30px"} />}
                  id="imprimirTicket"
                  colorScheme="telegram"
                  borderColor="twitter.100"
                  size="lg"
                  onClick={onOpen}
                  _hover={{
                    boxShadow: "10px 10px 5px #6BBFF4",
                    bgColor: " #FFFFFF",
                    color: "black",
                  }}
                />
              </Box>
              <Box
                height={"50px"}
                margin={"1%"}
                borderRadius="md"
                width={"190px"}
                right={["0.2px"]}
              >
                <FormControl
                  alignItems="center"
                  as={SimpleGrid}
                  columns={{ base: 1, lg: 2 }}
                >
                  <FormLabel
                    htmlFor="archivar"
                    fontWeight={"bold"}
                    color="blue.700"
                  >
                    Archivar:
                  </FormLabel>

                  <Switch
                    isChecked={archivado}
                    size={"lg"}
                    onChange={() => {
                      setArchivado(!archivado);
                      archivarTicket();
                    }}
                  />
                </FormControl>
              </Box>
              <Box
                margin={"1%"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"190px"}
                height={"50px"}
                right={["0.2px"]}
                zIndex={1}
                fontWeight="semibold"
              >
                <FormControl
                  paddingTop={2}
                  as={SimpleGrid}
                  columns={{ base: 1, lg: 2 }}
                >
                  <FormLabel
                    htmlFor="facturar"
                    fontWeight={"bold"}
                    color="blue.700"
                  >
                    Facturar:
                  </FormLabel>
                  <Switch
                    id="facturar"
                    size="lg"
                    isChecked={facturado}
                    onChange={() => {
                      setFacturado(!facturado);
                      facturarTicket();
                    }}
                  />
                </FormControl>
              </Box>
            </SimpleGrid>
          </Box>
        ) : null}

        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Impresión</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Printer doc={<TicketImprimible ticket={ticket!} />} />
            </ModalBody>
            <ModalFooter right={["16px", "84px"]} paddingTop={10}>
              <Button
                paddingLeft={10}
                paddingRight={10}
                colorScheme="red"
                variant="outline"
                position={"inherit"}
                onClick={onClose}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
                  <Th>Aseguradora</Th>
                  <Th>Asesor Seguro</Th>
                  <Th>Fecha y Hora</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listadoSeguimientos.length != 0 ? (
                  listadoSeguimientos.map((seguimiento, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{seguimiento.Usuario?.usuario}</Td>
                        <Td>{seguimiento.detalles}</Td>
                        <Td>{aseguradora?.nombre}</Td>
                        <Td>{seguimiento.Asesor?.nombre}</Td>
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
                value={sesion?.usuario}
              />

              <FormLabel padding={1}>Seguimiento</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Seguimiento"
                onChange={(e) => {
                  setSeguimiento(e.target.value);
                }}
              />

              <FormLabel htmlFor="aseguradoraId">Aseguradora</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Aseguradora"
                value={aseguradora?.nombre!}
                onChange={(e) => {
                  setidAseguradora(Number(e.target.value));
                }}
              />

              {/* 
                <FormLabel padding={1}>Asesor Seguro</FormLabel>
                <Input
                  paddingBottom={2}
                  placeholder="Asesor Seguro"
                  onChange={(e) => {
                    setAsesor_seguro(e.target.value);
                  }}
                />
                */}
              <FormLabel htmlFor="asesorid">Asesor de Aseguradora</FormLabel>
              <Select
                overflowWrap={"normal"}
                id="asesorId"
                placeholder="Selecciona el Asesor de la Aseguradora"
                alignItems={"center"}
                alignContent={"center"}
                variant="filled"
                borderColor="twitter.100"
                onFocus={() => {
                  asesorById();
                }}
                onChange={(e) => {
                  setAsesor_seguro(Number(e.target.value));
                }}
              >
                {asesorList.length !== 0
                  ? asesorList.map((asesor, index) => {
                      return (
                        <option key={index} value={asesor.id}>
                          {asesor.nombre}
                        </option>
                      );
                    })
                  : null}
              </Select>

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
              onClick={nuevoSeguimiento}
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

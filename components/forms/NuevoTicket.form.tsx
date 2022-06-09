import {
  IAseguradora,
  IAsesor,
  IAsistencia,
  ICiudad,
  IEstado,
  IServicio,
  ITecnico,
  ITicket,
} from "@/services/api.models";
import { FaBeer, FaMoneyBill, FaUserShield } from "react-icons/fa";
import { RiFileUserFill } from "react-icons/ri";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { CiudadesService } from "@/services/ciudades.service";
import { ServiciosService } from "@/services/servicios.service";
import { TicketsService } from "@/services/tickets.service";
import { AddIcon, ArrowUpIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Spacer,
  Divider,
  FormLabel,
  Input,
  FormControl,
  Center,
  Select,
  Textarea,
  Text,
  CheckboxGroup,
  SimpleGrid,
  Checkbox,
  Switch,
  InputLeftElement,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  toast,
  extendTheme,
  useToast,
  DrawerBody,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { MdAdd, MdOutlineAttachMoney } from "react-icons/md";
import { AsesoresService } from "@/services/asesores.service";
import { TecnicoService } from "@/services/tecnicos.service";
import { useRouter } from "next/router";
import { IoFlag, IoSpeedometerOutline } from "react-icons/io5";
import { EstadosService } from "@/services/estados.service";

const NuevoTicket = () => {
  {
    /* Asignar Técnico*/
  }
  const { isOpen: abierto, onOpen: abrir, onClose: cerrar } = useDisclosure();
  const btnRef = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const breakpoints = {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  };
  const theme = extendTheme({ breakpoints });

  const [aseguradorasList, setAseguradorasList] = useState<IAseguradora[]>([]);
  const [asistenciasList, setAsistenciasList] = useState<IAsistencia[]>([]);
  const [asesorList, setAsesorList] = useState<IAsesor[]>([]);

  const [serviciosList, setServiciosList] = useState<IServicio[]>([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<
    string[]
  >([]);

  const [costokmAseguradora, setCostoKMAseguradora] = useState<IAseguradora[]>(
    []
  );

  const [tecnicosByServicios, setTecnicosByServicios] = useState<IServicio>();

  const [fecha, setFecha] = useState("");

  const [cobertura, setCobertura] = useState(0);
  const [costoGPOLIAS, setCostoGPOLIAS] = useState(0);
  const [kilometrosARecorrer, setKilometrosARecorrer] = useState(0);
  const [costoPorKilometro, setCostoPorKilometro] = useState(0);
  const [costoBanderazo, setCostoBanderazo] = useState(0);

  const [calculoDeducible, setCalculoDeducible] = useState(0);
  const [calculoAnticipo, setCalculoAnticipo] = useState(0);
  const [calculoTotalSalida, setCalculoTotalSalida] = useState(0);
  const [calculoMontoTotal, setCalculoMontoTotal] = useState(0);

  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);
  const [ciudadId, setCiudadId] = useState<number>(0);
  const [estadoId, setEstadoId] = useState<number>();
  const [estadosList, setEstadosList] = useState<IEstado[]>([]);
  const [IdEstado, setIdEstado] = useState(0);

  const toast = useToast();

  useEffect(() => {
    consultarAseguradoras();
    consultarCiudades();
    consultarEstados();
    consultarServicios();
    consultarTecnicos();
  }, []);

  const consultarAseguradoras = async () => {
    const servicio = new AseguradoraService();
    const respuesta = await servicio.getAll();
    const data = respuesta.data as IAseguradora[];

    setAseguradorasList(data);
    setCostoKMAseguradora;
  };

  const consultarCiudades = async () => {
    const servicio = new CiudadesService();
    const respuesta: any = await servicio.getCiudadesByIdEstado(IdEstado);
    const data = respuesta.data as ICiudad[];

    setCiudadesList(data);
  };

  const consultarEstados = async () => {
    const servicio = new EstadosService();
    const respuesta = await servicio.getAll();
    const data = respuesta.data as IEstado[];

    setEstadosList(data);
  };

  const consultarServicios = async () => {
    const servicio = new ServiciosService();
    const respuesta = await servicio.getAll();
    const data = respuesta.data as IServicio[];

    setServiciosList(data);
  };

  const consultarTecnicosByServicio = async (id: number) => {
    const servicio = new ServiciosService();
    const respuesta = await servicio.getTecnicosByServicio(id);
    const data = respuesta.data as IServicio;

    setTecnicosByServicios(data);
  };

  const consultarTecnicos = async () => {
    const servicio = new TecnicoService();
    const respuesta = await servicio.getAll();
    const data = respuesta.data as ITecnico[];
  };

  useEffect(() => {
    const calcular = () => {
      let cober = Number(formTicket.values.cobertura);
      let costoLias = Number(formTicket.values.costo_gpo_lias);

      let km = Number(formTicket.values.kilometraje);
      let costoKM = Number(formTicket.values.costo_de_kilometraje);
      let totalKM = km * costoKM; //Costo de desplazo de tecnico

      let banderazo = Number(formTicket.values.banderazo);
      let nCasetas = Number(formTicket.values.casetas);
      let costoPorCasetas = Number(formTicket.values.costo_por_caseta);
      let totalCasetas = nCasetas * costoPorCasetas; //Costo de casetas

      let anticipo = (costoLias + totalKM + banderazo) * 0.6; //Anticipo del ticket
      let deducible = cober - costoLias - totalKM; //Costo que no cubre el seguro
      let totalSalida = totalKM + totalCasetas + banderazo; //Total de salida para tecnico

      let montoTotal = 0;
      if (deducible < 0) {
        deducible = Math.abs(deducible);
        montoTotal = totalSalida + costoGPOLIAS + deducible;
        setCalculoDeducible(deducible);
      } else {
        montoTotal = totalSalida + costoGPOLIAS;
        setCalculoDeducible(0);
      }

      setCalculoAnticipo(anticipo);
      setCalculoTotalSalida(totalSalida);
      setCalculoMontoTotal(montoTotal);
    };

    calcular();
  }, [cobertura, costoGPOLIAS, costoPorKilometro, costoBanderazo]);

  const asistenciaById = async () => {
    if (Number(formTicket.values.aseguradoraId) !== 0) {
      const servicio = new AsistenciasService();
      const respuesta: any = await servicio.getAsistenciasByIdAseguradora(
        Number(formTicket.values.aseguradoraId)
      );

      const data = respuesta.data as IAsistencia[];

      setAsistenciasList(data || []);
    }
  };

  const asesorById = async () => {
    if (Number(formTicket.values.aseguradoraId) !== 0) {
      const service = new AsesoresService();
      const respuesta: any = await service.getAsesoresByIdAseguradora(
        Number(formTicket.values.aseguradoraId)
      );

      const data = respuesta.data as IAsesor[];

      setAsesorList(data || []);
    }
  };

  /**AGREGAR ASESOR A LA ASEGURADORA */
  const router = useRouter();
  const [nombreAsesor, setNombreAsesor] = useState("");
  const [idAseguradora, setidAseguradora] = useState(0);

  const consultarAsesores = async () => {
    const services = new AsesoresService();
    const response: any = await services.getAsesoresByIdAseguradora(
      Number(idAseguradora)
    );
    const data = response.data as IAsesor[];
    if (response.status == 200) {
      setAsesorList(data || []);
    } else {
      
    }
  };
  const guardarAsesor = async () => {
    

    const data: IAsesor = {
      nombre: nombreAsesor,
      aseguradoraId: Number(idAseguradora),
    };
    const service = new AsesoresService();
    const response = await service.create(data);

    consultarAsesores();
    if (response.status === 201) {
      onClose();
      toast({
        title: "Asesor Agregado con Exito.",
        description: "El asesor se Agrego con Exito.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: response.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const asignarTicketATecnico = async () => {
    const data = { estado: "TOMADO" };
    const service = new TicketsService();
    //TODO: Agregar el ID del ticket
    const respuesta = await service.update(data, 0);
    toast({
      title: "Técnico Asignado.",
      description: "Se Asigno el servicio al Técnico",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const formTicket = useFormik({
    initialValues: {
      //--------------------DATOS BASICOS
      num_expediente: "",
      asistencia_vial: false,
      fecha_llamada: "",
      nombre_asesor_gpo_lias: "",
      nombre_usuario_final: "",
      titulo_ticket: "",
      aseguradoraId: "",
      asistenciaId: "",
      asesorId: "",
      problematica: "",
      //---------------------COTIZACION GPO LIAS
      ciudadId: 0,
      colonia: "",
      calle: "",
      numero_domicilio: "",
      banderazo: 0,
      total_salida: calculoTotalSalida,
      costo_gpo_lias: 0,
      cobertura: 0,
      cotizacion_gpo_lias: "",
      deducible: calculoDeducible,
      kilometraje: 0,
      costo_de_kilometraje: 0,
      costo_por_caseta: 0,
      casetas: 0,
      total: calculoMontoTotal,
      anticipo: calculoAnticipo,
      estado: "NUEVO",
      num_interior: "",
      modelo_carro: "",
      placas_carro: "",
      color_carro: "",
      marca_carro: "",
      is_servicio_domestico: true,
      is_servicio_foraneo: false,
    },
    onSubmit: async (values) => {
      const ticket: any = { ...values };
      ticket.deducible = calculoDeducible;
      ticket.anticipo = calculoAnticipo;
      ticket.total_salida = calculoTotalSalida;
      ticket.total = calculoMontoTotal;
      

      const servicio = new TicketsService();
      const respuestaTicketPost: any = await servicio.create(ticket);
      const dataTicketGuardado = respuestaTicketPost.data as ITicket;

      if (respuestaTicketPost.status === 201) {
        const respuestaServiciosTicket: any =
          await servicio.addServiciosForTicket(
            dataTicketGuardado.id || 0,
            serviciosSeleccionados
          );

        if (respuestaServiciosTicket.status === 201) {
          router.push(`/tickets/${dataTicketGuardado.id}`);
          toast({
            id: "altaExitosa",
            title: "Ticket creado",
            description: "El ticket se ha creado correctamente",
            status: "success",
          });
        }
      } else {
        toast({
          id: "altaError",
          title: "Error: ticket no se ha podido guardar",
          description: `El ticket no se ha podido guardar: ${respuestaTicketPost.message}`,
          status: "error",
        });
      }
    },
  });

  return (
    <form onSubmit={formTicket.handleSubmit}>
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
        <Text fontWeight="bold" fontSize={"25px"}>
          Datos Básicos
        </Text>

        <SimpleGrid columns={[1, 1, 2]} spacing="10px" paddingTop={17}>
          <FormControl isRequired>
            <FormLabel htmlFor="num_expediente">
              Número de Expediente:
            </FormLabel>
            <Input
              variant="filled"
              id="num_expediente"
              type="text"
              placeholder="N° Expediente"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.num_expediente}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 1]} spacing="20px">
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="fecha_llamada">Fecha de la Llamada</FormLabel>
            <Input
              w={"fit-content"}
              id="fecha_llamada"
              variant="filled"
              type="datetime-local"
              borderColor="twitter.100"
              value={fecha}
              onChange={(e) => {
                setFecha(e.target.value);
                formTicket.setFieldValue(
                  "fecha_llamada",
                  new Date(e.target.value).toISOString()
                );
              }}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing="20px">
          <Center>
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="aseguradoraId">Aseguradora</FormLabel>
              <Select
                id="aseguradoraId"
                placeholder="Selecciona la Aseguradora"
                variant="filled"
                borderColor="twitter.100"
                value={formTicket.values.aseguradoraId}
                onChange={(e) => {
                  setidAseguradora(parseInt(e.target.value));
                  formTicket.setFieldValue(
                    "aseguradoraId",
                    parseInt(e.target.value)
                  );
                }}
              >
                {aseguradorasList?.length !== 0
                  ? aseguradorasList?.map((aseguradora, index) => {
                      return (
                        <option key={index} value={Number(aseguradora.id)}>
                          {aseguradora.nombre}
                        </option>
                      );
                    })
                  : null}
              </Select>
            </FormControl>

            <FormControl isRequired paddingLeft={5} paddingTop={15}>
              <FormLabel htmlFor="asistenciaId">Asistencia</FormLabel>
              <Select
                id="asistenciaId"
                placeholder="Selecciona Asistencia"
                variant="filled"
                borderColor="twitter.100"
                value={formTicket.values.asistenciaId}
                onChange={(e) => {
                  formTicket.setFieldValue(
                    "asistenciaId",
                    parseInt(e.target.value)
                  );
                }}
                onFocus={() => {
                  asistenciaById();
                }}
              >
                {asistenciasList.length !== 0
                  ? asistenciasList.map((asistencia, index) => {
                      return (
                        <option key={index} value={Number(asistencia.id)}>
                          {asistencia.nombre}
                        </option>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
          </Center>
          <Center>
            <Button
              onClick={onOpen}
              marginTop={55}
              height="50px"
              width="500px"
              leftIcon={<MdAdd />}
              rightIcon={<FaUserShield />}
              colorScheme="teal"
              variant="outline"
            >
              Agregar Asesor de Aseguradora
            </Button>
          </Center>
        </SimpleGrid>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <ModalHeader>
              Crea un Nuevo Asesor de la Aseguradora Seleccionada
            </ModalHeader>

            <DrawerBody>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre del asesor"
                  onChange={(e) => {
                    setNombreAsesor(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired paddingTop={15}>
                <FormLabel htmlFor="aseguradoraId">Aseguradora</FormLabel>
                <Select
                  id="aseguradoraId"
                  placeholder="Selecciona la Aseguradora"
                  variant="filled"
                  borderColor="twitter.100"
                  value={formTicket.values.aseguradoraId}
                  onChange={(e) => {
                    setidAseguradora(parseInt(e.target.value));
                    formTicket.setFieldValue(
                      "aseguradoraId",
                      parseInt(e.target.value)
                    );
                  }}
                >
                  {aseguradorasList?.length !== 0
                    ? aseguradorasList?.map((aseguradora, index) => {
                        return (
                          <option key={index} value={Number(aseguradora.id)}>
                            {aseguradora.nombre}
                          </option>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={guardarAsesor} colorScheme="blue">
                Guardar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <SimpleGrid columns={1} spacing={5}>
          <Center>
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="nombre_asesor_gpo_lias">
                Asesor de Gpo. Lías
              </FormLabel>
              <Input
                variant="filled"
                id="nombre_asesor_gpo_lias"
                placeholder="Asesor de Grupo Lías"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.nombre_asesor_gpo_lias}
              />
            </FormControl>

            <FormControl isRequired paddingLeft={5} paddingTop={15}>
              <FormLabel htmlFor="asesorid">Asesor de Aseguradora</FormLabel>
              <Select
                overflowWrap={"normal"}
                id="asesorId"
                placeholder="Selecciona el Asesor de la Aseguradora"
                alignItems={"center"}
                alignContent={"center"}
                variant="filled"
                borderColor="twitter.100"
                value={formTicket.values.asesorId}
                onFocus={() => {
                  asesorById();
                }}
                onChange={(e) => {
                  formTicket.setFieldValue(
                    "asesorId",
                    parseInt(e.target.value)
                  );
                }}
              >
                {asesorList.length !== 0
                  ? asesorList.map((asesor, index) => {
                      return (
                        <option key={index} value={Number(asesor.id)}>
                          {asesor.nombre}
                        </option>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
          </Center>
        </SimpleGrid>
        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="nombre_usuario_final">
              Nombre del Usuario a Brindar Servicio
            </FormLabel>
            <Input
              variant="filled"
              id="nombre_usuario_final"
              placeholder="Usuario a Brindar Servicio"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.nombre_usuario_final}
            />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="titulo_ticket">
              Descripción Corta del Ticket
            </FormLabel>
            <Input
              variant="filled"
              id="titulo_ticket"
              placeholder="Descripción Corta"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.titulo_ticket}
            />
          </FormControl>
        </Center>

        <FormControl isRequired paddingTop={15}>
          <FormLabel htmlFor="problematica">
            Descripción de la Problemática
          </FormLabel>
          <Textarea
            id="problematica"
            variant="filled"
            placeholder="Problemática"
            borderColor="twitter.100"
            onChange={formTicket.handleChange}
            value={formTicket.values.problematica}
          />
        </FormControl>

        <FormControl paddingTop={15}>
          <FormLabel htmlFor="servicioId">
            Seleccione Servicios Relacionados:
          </FormLabel>
          <CheckboxGroup
            variant="filled"
            size={"lg"}
            onChange={(e) => {
              setServiciosSeleccionados(e as string[]);
            }}
          >
            <SimpleGrid padding={5} minChildWidth="120px" spacing="40px">
              {serviciosList?.length !== 0
                ? serviciosList.map((servicio, index) => {
                    return (
                      <Checkbox
                        key={index}
                        id={servicio.nombre}
                        value={servicio.id?.toString()}
                      >
                        {servicio.nombre}
                      </Checkbox>
                    );
                  })
                : null}
            </SimpleGrid>
          </CheckboxGroup>
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

        <FormControl as={SimpleGrid} columns={{ base: 1, lg: 6 }}>
          <FormControl paddingTop={2} paddingLeft={2}>
            <FormLabel htmlFor="servicio_domestico">
              Servicio Doméstico
            </FormLabel>
            <Switch
              id="is_servicio_domestico"
              size="lg"
              onChange={(e) => {
                formTicket.handleChange(e);
                formTicket.values.asistencia_vial == true
                  ? formTicket.setFieldValue("asistencia_vial", false)
                  : null;

                  formTicket.values.is_servicio_foraneo == true
                  ? formTicket.setFieldValue("is_servicio_foraneo", false)
                  : null;
              }}
              isChecked={formTicket.values.is_servicio_domestico}
            />
            {formTicket.values.is_servicio_domestico ? (
              <Flex
                w={"100%"}
                padding={1}
                bgColor={"green"}
                justifyContent="center"
                borderRadius={"2xl"}
              >
                <Text color={"white"} fontWeight="bold">
                  Servicio Dómestico Activado
                </Text>
              </Flex>
            ) : null}
          </FormControl>

          <FormControl paddingTop={2} paddingLeft={2}>
            <FormLabel htmlFor="asistencia_vial">Servicio Vial</FormLabel>
            <Switch
              id="asistencia_vial"
              size="lg"
              onChange={(e) => {
                formTicket.handleChange(e);
                formTicket.values.is_servicio_domestico == true
                  ? formTicket.setFieldValue("is_servicio_domestico", false)
                  : null;
              }}
              isChecked={formTicket.values.asistencia_vial}
            />
            {formTicket.values.asistencia_vial ? (
              <Flex
                w={"100%"}
                padding={1}
                bgColor={"green"}
                justifyContent="center"
                borderRadius={"2xl"}
              >
                <Text color={"white"} fontWeight="bold">
                  Servicio Vial Activado
                </Text>
              </Flex>
            ) : null}
          </FormControl>

          <FormControl paddingTop={2} paddingLeft={2}>
            <FormLabel htmlFor="servicio_foraneo">Servicio Foráneo</FormLabel>
            <Switch
              id="is_servicio_foraneo"
              size="lg"
              onChange={(e) => {
                formTicket.handleChange(e);
                formTicket.values.is_servicio_domestico == false
                
              }}

              isChecked={formTicket.values.is_servicio_foraneo}
            />
            {formTicket.values.is_servicio_foraneo ? (
              <Flex
                w={"100%"}
                padding={1}
                bgColor={"green"}
                justifyContent="center"
                borderRadius={"2xl"}
              >
                <Text color={"white"} fontWeight="bold">
                  Servicio Foráneo Activado
                </Text>
              </Flex>
            ) : null}
          </FormControl>
        </FormControl>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="estado">Estado</FormLabel>
            <Select
              id="estado"
              placeholder="Selecciona el Estado"
              variant="filled"
              borderColor="twitter.100"
              onChange={(e) => {
                setEstadoId(Number(e.target.value));
                setIdEstado(Number(e.target.value));
              }}
            >
              {estadosList?.length !== 0
                ? estadosList?.map((estado, index) => {
                    return (
                      <option key={index} value={estado.id}>
                        {estado.nombre}
                      </option>
                    );
                  })
                : null}
            </Select>
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
            <Select
              id="ciudadId"
              placeholder="Selecciona la Ciudad"
              variant="filled"
              borderColor="twitter.100"
              onChange={(e) => {
                setCiudadId(Number(e.target.value));
                formTicket.setFieldValue("ciudadId", Number(e.target.value));
              }}
              onFocus={(e) => {
                consultarCiudades();
              }}
            >
              {ciudadesList?.length !== 0
                ? ciudadesList?.map((ciudad, index) => {
                    return (
                      <option key={index} value={ciudad.id}>
                        {ciudad.nombre}
                      </option>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 4]} spacing={5}>
          {formTicket.values.is_servicio_domestico === true ? (
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="colonia">Colonia</FormLabel>
              <Input
                variant="filled"
                id="colonia"
                placeholder="Colonia"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.colonia}
              />
            </FormControl>
          ) : null}

          {formTicket.values.is_servicio_domestico === true ? (
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="calle">Calle</FormLabel>
              <Input
                variant="filled"
                id="calle"
                placeholder="Calle"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.calle}
              />
            </FormControl>
          ) : null}

          {formTicket.values.is_servicio_domestico === true ? (
            <FormControl isRequired paddingLeft={5} paddingTop={15}>
              <FormLabel htmlFor="numero_domicilio_exterior">
                Número Exterior
              </FormLabel>
              <Input
                variant="filled"
                id="numero_domicilio"
                placeholder="N° de Domicilio Exterior"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.numero_domicilio}
              />
            </FormControl>
          ) : null}

          {formTicket.values.is_servicio_domestico === true ? (
            <FormControl paddingLeft={5} paddingTop={15}>
              <FormLabel htmlFor="numero_domicilio_interior">
                Número Interior
              </FormLabel>
              <Input
                variant="filled"
                id="num_interior"
                placeholder="N° de Domicilio Interior"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.num_interior}
              />
            </FormControl>
          ) : null}
        </SimpleGrid>

        <Center>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="cobertura">
              Monto de Cobertura del Seguro
            </FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="filled"
                id="cobertura"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                onChange={(e) => {
                  setCobertura(Number(e.target.value));
                  formTicket.handleChange(e);
                }}
                value={formTicket.values.cobertura}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="costo_gpo_lias">Costo Grupo Lías</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="filled"
                id="costo_gpo_lias"
                placeholder="0.00"
                paddingLeft={5}
                min={0}
                type="number"
                borderColor="twitter.100"
                onChange={(e) => {
                  setCostoGPOLIAS(Number(e.target.value));
                  formTicket.handleChange(e);
                }}
                value={formTicket.values.costo_gpo_lias}
              />
            </InputGroup>
          </FormControl>
        </Center>

        <SimpleGrid columns={[1, 1, 3]} spacing={4}>
          {formTicket.values.asistencia_vial === true ? (
            <FormControl paddingTop={15} isRequired>
              <FormLabel htmlFor="calle">Coordenadas</FormLabel>
              <Input
                variant="filled"
                id="calle"
                placeholder="Coordenadas"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.calle}
              />
            </FormControl>
          ) : null}

          <FormControl paddingTop={15} isRequired>
            <FormLabel htmlFor="kilometraje">Kilómetros a Recorrer</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<IoSpeedometerOutline />}
              />
              <Input
                variant="filled"
                id="kilometraje"
                min={0}
                placeholder="0"
                type="number"
                borderColor="twitter.100"
                onChange={(e) => {
                  setKilometrosARecorrer(Number(e.target.value));
                  formTicket.handleChange(e);
                }}
                value={formTicket.values.kilometraje}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15} isRequired>
            <FormLabel htmlFor="costoPorKilometro">
              Costo por Kilómetro
            </FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="filled"
                id="costo_de_kilometraje"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                onChange={(e) => {
                  setCostoPorKilometro(Number(e.target.value));
                  formTicket.setFieldValue(
                    "costo_de_kilometraje",
                    parseInt(e.target.value)
                  );
                }}
                value={formTicket.values.costo_de_kilometraje}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={4}>
          {formTicket.values.is_servicio_foraneo === true ? (
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="casetas">Número de Casetas</FormLabel>
              <Input
                variant="filled"
                id="casetas"
                placeholder="0"
                type="number"
                borderColor="twitter.100"
                onChange={(e) => {
                  setCostoBanderazo(Number(e.target.value));
                  formTicket.handleChange(e);
                }}
                value={formTicket.values.casetas}
              />
            </FormControl>
          ) : null}

          {formTicket.values.is_servicio_foraneo === true ? (
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="costoPorCaseta">Costo por Caseta</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<MdOutlineAttachMoney />}
                />
                <Input
                  variant="filled"
                  id="costo_por_caseta"
                  min={0}
                  placeholder="0.00"
                  paddingLeft={8}
                  type="number"
                  borderColor="twitter.100"
                  onChange={(e) => {
                    setCostoBanderazo(Number(e.target.value));
                    formTicket.handleChange(e);
                  }}
                  value={formTicket.values.costo_por_caseta}
                />
              </InputGroup>
            </FormControl>
          ) : null}
        </SimpleGrid>

        {/* PARA SERVICIOS VIALES*/}
        <SimpleGrid columns={[1, 1, 4]} spacing={4}>
          {formTicket.values.asistencia_vial === true ? (
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="modelo_del_carro">Modelo del Carro</FormLabel>
              <Input
                variant="filled"
                id="modelo_carro"
                placeholder="Modelo del Carro"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.modelo_carro}
              />
            </FormControl>
          ) : null}

          {formTicket.values.asistencia_vial === true ? (
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="placas">Placas</FormLabel>
              <Input
                variant="filled"
                id="placas_carro"
                placeholder="Placas"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.placas_carro}
              />
            </FormControl>
          ) : null}

          {formTicket.values.asistencia_vial === true ? (
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="color">Color</FormLabel>
              <Input
                variant="filled"
                id="color_carro"
                placeholder="Color"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.color_carro}
              />
            </FormControl>
          ) : null}

          {formTicket.values.asistencia_vial === true ? (
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="marca">Marca</FormLabel>
              <Input //isDisabled
                variant="filled"
                id="marca_carro"
                placeholder="Marca"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.marca_carro}
              />
            </FormControl>
          ) : null}
        </SimpleGrid>

        {/*SERVICIOS FORANEOS */}
        <SimpleGrid columns={[1, 1, 1]} spacing={4}>
          {formTicket.values.asistencia_vial === true ? (
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="banderazo">Banderazo</FormLabel>
              <InputGroup>
                <InputLeftAddon pointerEvents="none" children={<IoFlag />} />
                <Input
                  paddingLeft={8}
                  variant="filled"
                  id="banderazo"
                  placeholder="0.00"
                  type="number"
                  min={0}
                  borderColor="twitter.100"
                  onChange={(e) => {
                    setCostoBanderazo(Number(e.target.value));
                    formTicket.handleChange(e);
                  }}
                  value={formTicket.values.banderazo}
                />
              </InputGroup>
            </FormControl>
          ) : null}
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
                isReadOnly
                variant="filled"
                id="deducible"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                fontWeight={"bold"}
                textColor={"red"}
                value={calculoDeducible}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="anticipo">Anticipo 60%</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="filled"
                id="anticipo"
                isReadOnly
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                onChange={formTicket.handleChange}
                value={calculoAnticipo}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="total_salida">Total de Salida</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="filled"
                id="total_salida"
                isReadOnly
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                onChange={formTicket.handleChange}
                value={calculoTotalSalida}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="total">Monto Total</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                isReadOnly
                variant="filled"
                id="total"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                onChange={(e) => {
                  formTicket.handleChange(e.target.value);
                }}
                value={calculoMontoTotal}
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
            variant="filled"
            placeholder="Cotización"
            borderColor="twitter.100"
            onChange={formTicket.handleChange}
            value={formTicket.values.cotizacion_gpo_lias}
          />
        </FormControl>

        <Button
          marginTop={15}
          marginRight={8}
          justifySelf="end"
          isLoading={formTicket.isSubmitting}
          leftIcon={<ArrowUpIcon />}
          id="publicarTicket"
          type="submit"
          colorScheme="telegram"
          borderColor="twitter.100"
          size="lg"
        >
          Publicar Ticket
        </Button>
      </Box>
    </form>
  );
};

export default NuevoTicket;

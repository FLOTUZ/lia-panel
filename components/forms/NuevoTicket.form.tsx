import {
  IAseguradoras,
  IAsistencias,
  ICiudad,
  IServicio,
  ITicket,
} from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { CiudadesService } from "@/services/ciudades.service";
import { ServiciosService } from "@/services/servicios.service";
import { TicketsService } from "@/services/tickets.service";
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
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";

const NuevoTicket = () => {
  const toast = useToast();

  const [aseguradorasList, setAseguradorasList] = useState<IAseguradoras[]>([]);
  const [asistenciasList, setAsistenciasList] = useState<IAsistencias[]>([]);
  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);
  const [serviciosList, setServiciosList] = useState<IServicio[]>([]);

  const [fecha, setFecha] = useState("");
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<
    string[]
  >([]);

  useEffect(() => {
    const consultarAseguradoras = async () => {
      const servicio = new AseguradoraService();
      const respuesta = await servicio.getAll();
      const data = respuesta.data as IAseguradoras[];

      setAseguradorasList(data);
    };

    const consultarCiudades = async () => {
      const servicio = new CiudadesService();
      const respuesta = await servicio.getAll();
      const data = respuesta.data as ICiudad[];

      setCiudadesList(data);
    };

    const consultarServicios = async () => {
      const servicio = new ServiciosService();
      const respuesta = await servicio.getAll();
      const data = respuesta.data as IServicio[];

      setServiciosList(data);
    };

    consultarAseguradoras();
    consultarCiudades();
    consultarServicios();
  }, []);

  const asistenciaById = async () => {
    if (Number(formTicket.values.aseguradoraId) !== 0) {
      const servicio = new AsistenciasService();
      const respuesta: any = await servicio.getAsistenciasByIdAseguradora(
        Number(formTicket.values.aseguradoraId)
      );

      const data = respuesta.data as IAsistencias[];

      setAsistenciasList(data || []);
    }
  };

  const formTicket = useFormik({
    initialValues: {
      //--------------------DATOS BASICOS
      num_expediente: "",
      asistencia_vial: false,
      fecha_llamada: "",
      nombre_asesor_aseguradora: "",
      nombre_asesor_gpo_lias: "",
      nombre_usuario_final: "",
      titulo_ticket: "",
      aseguradoraId: "",
      asistenciaId: "", //TODO: cambiar por el id de la asistencia
      problematica: "",
      //---------------------COTIZACION GPO LIAS
      ciudad: "",
      colonia: "",
      calle: "",
      numero_domicilio: "",
      banderazo: 0,
      total_salida: "",
      costo_gpo_lias: "",
      cobertura: "",
      cotizacion_gpo_lias: "",
      deducible: "",
      kilometraje: "",
      costo_de_kilometraje: "",
      costo_por_caseta: 0,
      casetas: 0,
      total: "",
      anticipo: "",
      estado: "NUEVO",
      num_interior: "",
      modelo_carro: "",
      placas_carro: "",
      color_carro: "",
      marca_carro: "",
      is_servicio_domestico: false,
      is_servicio_foraneo: false,
    },
    onSubmit: async (values) => {
      const ticket: any = { ...values };

      console.log(ticket);

      const servicio = new TicketsService();
      const respuestaTicketPost: any = await servicio.create(ticket);
      const dataTicketGuardado = respuestaTicketPost.data as ITicket;

      if (respuestaTicketPost.status === 201) {
        const servicio = new TicketsService();
        const respuestaServiciosTicket: any =
          await servicio.addServiciosForTicket(
            dataTicketGuardado.id || 0,
            serviciosSeleccionados
          );

        if (respuestaServiciosTicket.status === 201) {
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

        <Stack direction="row">
          <Spacer />
          <Divider orientation="vertical" />
          <FormLabel htmlFor="num_expediente">Numero de Expediente:</FormLabel>
          <Input
            variant="filled"
            id="num_expediente"
            type="text"
            placeholder="N° Expediente"
            borderColor="twitter.100"
            onChange={formTicket.handleChange}
            value={formTicket.values.num_expediente}
          />
        </Stack>

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

        <Center>
          <Divider orientation="vertical" />
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
            <FormLabel htmlFor="nombre_asesor_aseguradora">
              Asesor de Aseguradora
            </FormLabel>
            <Input
              variant="filled"
              id="nombre_asesor_aseguradora"
              placeholder="Asesor de la Aseguradora"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.nombre_asesor_aseguradora}
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="nombre_usuario_final">
              Nombre del Usuario Final
            </FormLabel>
            <Input
              variant="filled"
              id="nombre_usuario_final"
              placeholder="Usuario Final"
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

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="aseguradoraId">Aseguradora</FormLabel>
            <Select
              id="aseguradoraId"
              placeholder="Selecciona la Aseguradora"
              variant="filled"
              borderColor="twitter.100"
              value={formTicket.values.aseguradoraId}
              onChange={(e) => {
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
              placeholder="Selecciona Tipo de Asistencia"
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
            Seleccione Servicios relacionados:
          </FormLabel>
          <CheckboxGroup
            variant="filled"
            size={"lg"}
            onChange={(e) => {
              setServiciosSeleccionados(e as string[]);
            }}
          >
            <SimpleGrid minChildWidth="3rem" spacing="4rem">
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
                  Servicio domestico activado
                </Text>
              </Flex>
            ) : null}
          </FormControl>
          <FormControl paddingTop={2} paddingLeft={2}>
            <FormLabel htmlFor="asistencia_vial">Servicio Víal</FormLabel>

            <Switch
              id="asistencia_vial"
              size="lg"
              onChange={(e)=>{
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
                  Servicio vial activado
                </Text>
              </Flex>
            ) : null}
          </FormControl>

          <FormControl paddingTop={2} paddingLeft={2}>
            <FormLabel htmlFor="servicio_foraneo">Servicio Foráneo</FormLabel>
            <Switch
              id="is_servicio_foraneo"
              size="lg"
              onChange={formTicket.handleChange}
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
                  Servicio vial activado
                </Text>
              </Flex>
            ) : null}
          </FormControl>
        </FormControl>

        <SimpleGrid columns={[1, 1, 5]} spacing={4}>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
            <Select
              id="ciudad"
              placeholder="Selecciona la Ciudad"
              variant="filled"
              borderColor="twitter.100"
              value={formTicket.values.ciudad}
              onChange={formTicket.handleChange}
            >
              {ciudadesList?.length !== 0
                ? ciudadesList?.map((ciudad, index) => {
                    return (
                      <option key={index} value={ciudad.nombre}>
                        {ciudad.nombre}
                      </option>
                    );
                  })
                : null}
            </Select>
          </FormControl>

          {formTicket.values.is_servicio_domestico === true ? (
            <FormControl isRequired paddingTop={15} paddingLeft={5}>
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

          {formTicket.values.is_servicio_domestico === true ? (
            <FormControl paddingLeft={5} paddingTop={15}>
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
        </SimpleGrid>

        <Center>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="cobertura">
              Monto de Cobertura del Seguro
            </FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={5}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="cobertura"
              min={0}
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.cobertura}
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="costo_gpo_lias">Costo Grupo Lías</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="costo_gpo_lias"
              placeholder="0.00"
              paddingLeft={8}
              min={0}
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.costo_gpo_lias}
            />
          </FormControl>
        </Center>

        <Center>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="kilometraje">Kilómetros a Recorrer</FormLabel>
            <Input
              variant="filled"
              id="kilometraje"
              min={0}
              placeholder="0"
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.kilometraje}
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="costoPorKilometro">
              Costo por Kilómetro
            </FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="costo_de_kilometraje"
              min={0}
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.costo_de_kilometraje}
            />
          </FormControl>
        </Center>

        {/* PARA SERVICIOS VIALES*/}
        <SimpleGrid columns={[1, 1, 4]} spacing={4}>
          {formTicket.values.asistencia_vial === true ? (
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="modelo_del_carro">Módelo del Carro</FormLabel>
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
        <SimpleGrid columns={[1, 1, 3]} spacing={4}>
          {formTicket.values.is_servicio_foraneo === true ? (
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="casetas">Número de casetas</FormLabel>
              <Input
                variant="filled"
                id="casetas"
                placeholder="0"
                type="number"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.casetas}
              />
            </FormControl>
          ) : null}

          {formTicket.values.is_servicio_foraneo === true ? (
            <FormControl paddingTop={15} paddingLeft={5}>
              <FormLabel htmlFor="costoPorCaseta">Costo por Caseta</FormLabel>
              <InputLeftElement
                paddingTop={55}
                paddingStart={8}
                color="gray.300"
                pointerEvents="none"
                children="$"
              />
              <Input
                variant="filled"
                id="costo_por_caseta"
                min={0}
                placeholder="0.00"
                paddingLeft={8}
                type="number"
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.costo_por_caseta}
              />
            </FormControl>
          ) : null}

          {formTicket.values.asistencia_vial === true ? (
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="banderazo">Banderazo</FormLabel>
              <InputLeftElement
                paddingTop={55}
                paddingStart={5}
                color="gray.300"
                pointerEvents="none"
                children="$"
              />
              <Input
                paddingLeft={8}
                variant="filled"
                id="banderazo"
                placeholder="0.00"
                type="number"
                min={0}
                borderColor="twitter.100"
                onChange={formTicket.handleChange}
                value={formTicket.values.banderazo}
              />
            </FormControl>
          ) : null}
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 4]} spacing={4}>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="deducible">Deducible</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="deducible"
              min={0}
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.deducible}
            />
          </FormControl>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="anticipo">Anticipo 60%</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="anticipo"
              min={0}
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.anticipo}
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={4}>
            <FormLabel htmlFor="total_salida">Total de Salida</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={6}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="total_salida"
              min={0}
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.total_salida}
            />
          </FormControl>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="total">Monto Total</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="total"
              min={0}
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              borderColor="twitter.100"
              onChange={formTicket.handleChange}
              value={formTicket.values.total}
            />
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
          justifySelf="end"
          isLoading={formTicket.isSubmitting}
          id="publicarTicket"
          type="submit"
          colorScheme="blue"
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

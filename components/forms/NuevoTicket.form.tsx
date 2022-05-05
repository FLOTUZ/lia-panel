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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
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
      casetas: "",
      total: "",
      anticipo: "",
      estado: "NUEVO",
    },
    onSubmit: async (values) => {
      const ticket: any = { ...values };

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
              placeholder="Usuario del Técnico"
              onChange={formTicket.handleChange}
              value={formTicket.values.nombre_usuario_final}
            />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="titulo_ticket">Título del Ticket</FormLabel>
            <Input
              variant="filled"
              id="titulo_ticket"
              placeholder="Título del Ticket"
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
              placeholder="Selecciona la aseguradora"
              variant="filled"
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
              placeholder="Selecciona el Tipo de Asistencia"
              variant="filled"
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
            Descripción de la Problematica
          </FormLabel>
          <Textarea
            id="problematica"
            variant="filled"
            placeholder="Problemática"
            onChange={formTicket.handleChange}
            value={formTicket.values.problematica}
          />
        </FormControl>

        <FormControl paddingTop={15}>
          <FormLabel htmlFor="servicioId">
            Seleccione Servicios relacionados
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
        <FormControl paddingTop={2} paddingLeft={2}>
          <FormLabel htmlFor="asistencia_vial">Asistencia Vial</FormLabel>
          <Switch
            id="asistencia_vial"
            size="lg"
            onChange={formTicket.handleChange}
            isChecked={formTicket.values.asistencia_vial}
          />
        </FormControl>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
            <Select
              id="ciudad"
              placeholder="Selecciona la Ciudad"
              variant="filled"
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

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="colonia">Colonia</FormLabel>
            <Input
              variant="filled"
              id="colonia"
              placeholder="Colonia"
              onChange={formTicket.handleChange}
              value={formTicket.values.colonia}
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="calle">Calle</FormLabel>
            <Input
              variant="filled"
              id="calle"
              placeholder="Calle"
              onChange={formTicket.handleChange}
              value={formTicket.values.calle}
            />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="numero_domicilio">
              Número del Domicilio
            </FormLabel>
            <Input
              variant="filled"
              id="numero_domicilio"
              placeholder="N° de Domicilio"
              onChange={formTicket.handleChange}
              value={formTicket.values.numero_domicilio}
            />
          </FormControl>
        </Center>

        <SimpleGrid columns={[1, 1, 2]} spacing={4}>
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
                min={10}
                onChange={formTicket.handleChange}
                value={formTicket.values.banderazo}
              />
            </FormControl>
          ) : null}
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
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              onChange={formTicket.handleChange}
              value={formTicket.values.cobertura}
            />
          </FormControl>
        </SimpleGrid>

        <Center>
          <Divider orientation="vertical" />

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="total_salida">Total de Salida</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="total_salida"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              onChange={formTicket.handleChange}
              value={formTicket.values.total_salida}
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
              type="number"
              onChange={formTicket.handleChange}
              value={formTicket.values.costo_gpo_lias}
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
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
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              onChange={formTicket.handleChange}
              value={formTicket.values.deducible}
            />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="kilometraje">Kilometros a Recorrer</FormLabel>
            <Input
              variant="filled"
              id="kilometraje"
              placeholder="0"
              type="number"
              min={0}
              onChange={formTicket.handleChange}
              value={formTicket.values.kilometraje}
            />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="casetas">Numero de casetas</FormLabel>
            <Input
              variant="filled"
              id="casetas"
              placeholder="0"
              min={0}
              type="number"
              onChange={formTicket.handleChange}
              value={formTicket.values.casetas}
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
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
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              onChange={formTicket.handleChange}
              value={formTicket.values.total}
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="anticipo">Anticipo 60%</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="anticipo"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
              onChange={formTicket.handleChange}
              value={formTicket.values.anticipo}
            />
          </FormControl>
        </Center>

        <FormControl paddingTop={15}>
          <FormLabel htmlFor="cotizacion_gpo_lias">
            Cotizacion de Grupo Lías (Informacion adicional)
          </FormLabel>
          <Textarea
            id="cotizacion_gpo_lias"
            variant="filled"
            placeholder="Cotización"
            onChange={formTicket.handleChange}
            value={formTicket.values.cotizacion_gpo_lias}
          />
        </FormControl>

        <Link href={`/tickets/`}>
          <a>
            <Button
              marginTop={15}
              justifySelf="end"
              isLoading={formTicket.isSubmitting}
              id="publicarTicket"
              type="submit"
              colorScheme="blue"
              size="lg">
              Publicar Ticket
            </Button>
          </a>
        </Link>
      </Box>
    </form>
  );
};

export default NuevoTicket;

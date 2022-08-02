import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState, useEffect } from "react";

import {
  FormLabel,
  Input,
  FormControl,
  HStack,
  Button,
  Spacer,
  useToast,
  Box,
  Select,
  Stack,
  Checkbox,
  CheckboxGroup,
  FormHelperText,
  Heading,
  SimpleGrid,
  Switch,
  Flex,
} from "@chakra-ui/react";

import {
  ITecnico,
  IUsuario,
  IServicio,
  ICiudad,
  IEstado,
} from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";
import { TecnicoService } from "@/services/tecnicos.service";
import { ServiciosService } from "@/services/servicios.service";
import { EstadosService } from "@/services/estados.service";
import { CiudadesService } from "@/services/ciudades.service";

function TecnicoNuevo() {
  // ---- conexion y obtencion de id ---------
  const router = useRouter();
  const { idTecnico } = router.query;
  //------------------------ DATA USUARIO -------------------------------------
  const [usuario, setUsuario] = useState<IUsuario>();
  const [isInactivo, setIsInactivo] = useState<boolean>(false);
  //------------------------ DATA TECNICO -------------------------------------
  const [tecnico, setTecnico] = useState<ITecnico>();

  const [ciudadDeTecnico, setCiudadDeTecnico] = useState<number>();
  const [ciudadesCobertura, setCiudadesCobertura] = useState<string[]>([]);
  const [serviciosDeTecnico, setServiciosDeTecnico] = useState<string[]>([]);
  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);

  const [cargando, setCargando] = useState(false);

  const toast = useToast();

  const [usuarioId, setUsuarioId] = useState<number>();

  // estados -------------
  const [estadosList, setEstadosList] = useState<IEstado[]>([]);
  const consultarEstados = async () => {
    const servicio = new EstadosService();
    const respuesta = await servicio.getAll();
    const dataC = respuesta.data as IEstado[];

    setEstadosList(dataC);
  };

  // Ciudades ----- estado
  const [estado, setEstado] = useState<IEstado>();
  const [IdEstado, setIdEstado] = useState(0);

  const consultarCiudades = async () => {
    const servicio = new CiudadesService();
    const respuesta: any = await servicio.getCiudadesByIdEstado(IdEstado);
    const data = respuesta.data as ICiudad[];

    setCiudadesList(data);
    setCiudadDeTecnico(tecnico?.ciudadId);
  };

  // ---------- servicios ------------
  const [listadoServicios, setListadoServicios] = useState<IServicio[]>([]);

  const consultarServicios = async () => {
    const service = new ServiciosService();
    const respuesta = await service.getAll();

    const data = respuesta.data as IServicio[];
    setListadoServicios(data);
  };

  //------------ adquirir datos del usuario

  const getTecnico = async () => {
    const service = new TecnicoService();
    const respuesta = await service.getById(Number(idTecnico));
    const dato = respuesta.data as ITecnico;
    setTecnico(dato);
  };

  const getUsuario = async () => {
    const service = new UsuariosService();
    if (tecnico?.usuarioId) {
      const respuesta = await service.getById(Number(tecnico?.usuarioId));
      if (respuesta.status == 200) {
        const dato = respuesta.data as IUsuario;
        setUsuario(dato);
        setUsuarioId(Number(dato.id));
        setIsInactivo(dato.inactivo!);
      }
    }
  };

  const getEstado = async () => {
    const service = new EstadosService();
    if (tecnico?.ViveEn?.estadoId) {
      const respuesta = await service.getById(tecnico?.ViveEn?.estadoId);
      const dato = respuesta.data as IEstado;
      setEstado(dato);
      setIdEstado(Number(dato.id));
    }
  };

  const serviciosOfTecnico = async () => {
    const servicios = tecnico?.Servicio;

    const arr = servicios?.map((servicio) => {
      return servicio.id!.toString();
    });

    if (arr != undefined) setServiciosDeTecnico(arr);
  };

  const ciudadesCoberturaOfTecnico = async () => {
    const ciudadesCobertura = tecnico?.Ciudades_Cobertura;

    const arr = ciudadesCobertura?.map((ciudad) => {
      return ciudad.id!.toString();
    });

    if (arr != undefined) setCiudadesCobertura(arr);
  };

  // --------------------- Tecnico-------------------

  const formTecnico = useFormik({
    initialValues: {
      nombre: tecnico?.nombre || "",
      apellido_paterno: tecnico?.apellido_paterno || "",
      apellido_materno: tecnico?.apellido_materno || "",
      telefono: tecnico?.telefono || "",
      ciudadId: tecnico?.ciudadId || 0,
      usuarioId: tecnico?.usuarioId || 0,
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      setCargando(true);
      const service = new TecnicoService();
      const data = {
        ...values,
      } as ITecnico;

      const respuesta = await service.update(data, Number(idTecnico));

      const dataUpdate = respuesta.data as ITecnico;

      if (respuesta.status == 200) {
        setTecnico(dataUpdate);

        //Se actualizan sus servicios

        await service.addServicesAndCiudadesCoberturaToTecnico(
          Number(idTecnico),
          serviciosDeTecnico,
          ciudadesCobertura
        );

        toast({
          title: "Tecnico actualizado",
          description: `Se actualizo tecnico, exitosamente.`,
          position: "bottom-right",
          status: "success",
        });
        setCargando(false);
      } else {
        setCargando(false);
        toast({
          title: "Oops... Ocurrio un error.",
          description: `Error en los datos del tecnico`,
          status: "error",
          position: "bottom-right",
        });
      }
    },
  });

  // -------------------- usuario --------------------
  const formUsuario = useFormik({
    initialValues: {
      inactivo: usuario?.inactivo,
      usuario: usuario?.usuario || undefined,
      email: usuario?.email || undefined,
      password: undefined,
      rol: usuario?.rol || undefined,
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      setCargando(true);
      const datos = {
        ...values,
      } as IUsuario;

      if (datos.password == "") datos.password = undefined;

      const service = new UsuariosService();
      const respuesta = await service.update(datos, Number(usuarioId));

      const dataUpdate = respuesta.data as IUsuario;
      setUsuario(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Oops... Ocurrio un error.",
          description: `Error al actualizar, posibles errores en los datos de usuario`,
          status: "error",
          position: "bottom-right",
        });
        setCargando(false);
      } else {
        toast({
          title: "Se actualizado con éxito.",
          status: "success",
          position: "bottom-right",
          description: `Usuario actualizado, exitosamente`,
        });
        setCargando(false);
      }
    },
  });

  useEffect(() => {
    getTecnico();
  }, [idTecnico]);

  useEffect(() => {
    consultarServicios();
    consultarEstados();
    getUsuario();
    getEstado();
  }, [tecnico]);

  useEffect(() => {
    consultarCiudades();
  }, [IdEstado]);

  useEffect(() => {
    serviciosOfTecnico();
    ciudadesCoberturaOfTecnico();
  }, [listadoServicios]);

  return (
    <DesktopLayout>
      <Header title={"Editar Tecnico"} />

      <form onSubmit={formUsuario.handleSubmit}>
        <Box
          m={2}
          padding={5}
          borderRadius={10}
          boxShadow="lg"
          p="6"
          rounded="md"
          bg={"white"}
          w={"100%"}
        >
          <FormControl isRequired={false}>
            <FormLabel htmlFor="inactivo">Esta inactivo</FormLabel>
            <Switch
              size={"lg"}
              name="inactivo"
              defaultChecked={isInactivo}
              onChange={(e) => {
                formUsuario.setFieldValue("inactivo", e.target.checked);
                setIsInactivo(e.target.checked);
              }}
            />
          </FormControl>

          <SimpleGrid columns={[1, 1, 2]} spacing={2} w={"100%"}>
            <FormControl isRequired={true}>
              <FormLabel htmlFor="usuario">Usuario de tecnico</FormLabel>
              <Input
                maxLength={20}
                variant="filled"
                id="usuario"
                placeholder="Nombre de Usuario"
                defaultValue={usuario?.usuario}
                onChange={formUsuario.handleChange}
                value={formUsuario.values.usuario}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                minLength={3}
                maxLength={100}
                variant="filled"
                id="email"
                type={"email"}
                placeholder="email@gmail.com"
                defaultValue={usuario?.email}
                onChange={formUsuario.handleChange}
                value={formUsuario.values.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Input
                minLength={8}
                maxLength={255}
                variant="filled"
                id="password"
                type={"password"}
                onChange={formUsuario.handleChange}
                value={formUsuario.values.password}
              />
              <FormHelperText>Mínimo 8 carácteres</FormHelperText>
            </FormControl>
          </SimpleGrid>
          <Flex w={"100%"}>
            <Spacer />
            <SimpleGrid columns={[1, 1, 2]} spacing={2}>
              <Button
                id="guardar_usuario"
                colorScheme="whatsapp"
                variant="solid"
                type="submit"
                isLoading={cargando}
              >
                Guardar datos de usuario
              </Button>

              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
            </SimpleGrid>
          </Flex>
        </Box>
      </form>

      {/* terminar el form de usuario y empieza el de tecnico **/}

      <form onSubmit={formTecnico.handleSubmit}>
        <Box
          m={2}
          padding={5}
          borderRadius={10}
          boxShadow="lg"
          p="6"
          rounded="md"
          bg={"white"}
        >
          <Heading as="h2" fontWeight="bold" paddingBottom={15}>
            Datos del tecnico
          </Heading>

          <SimpleGrid columns={[1, 1, 2]} spacing={2}>
            <FormControl isRequired>
              <FormLabel htmlFor="nombre">Nombre</FormLabel>
              <Input
                minLength={3}
                maxLength={50}
                variant="filled"
                id="nombre"
                placeholder="Nombre"
                defaultValue={tecnico?.nombre}
                onChange={formTecnico.handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="apellido_paterno">Primer Apellido</FormLabel>
              <Input
                minLength={3}
                maxLength={50}
                variant="filled"
                id="apellido_paterno"
                placeholder="Apellido Paterno"
                defaultValue={tecnico?.apellido_paterno}
                onChange={formTecnico.handleChange}
              />
            </FormControl>

            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="apellido_materno">Segundo Apellido</FormLabel>
              <Input
                minLength={3}
                maxLength={50}
                variant="filled"
                id="apellido_materno"
                placeholder="Apellido Materno"
                defaultValue={tecnico?.apellido_materno}
                onChange={formTecnico.handleChange}
              />
            </FormControl>

            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="telefono">Teléfono</FormLabel>
              <Input
                maxLength={10}
                variant="filled"
                id="telefono"
                placeholder="Teléfono"
                type={"number"}
                defaultValue={tecnico?.telefono}
                value={formTecnico.values.telefono}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    formTecnico.setFieldValue(
                      "telefono",
                      e.target.value.toString()
                    );
                  }
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="estado" paddingTop={15}>
                Estado
              </FormLabel>
              <Select
                id="estado"
                placeholder="Selecciona el Estado"
                variant="filled"
                value={IdEstado == 0 ? estado?.id : IdEstado}
                onClick={() => consultarCiudades()}
                onChange={(e) => {
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
              <FormLabel htmlFor="ciudadId">Ciudad</FormLabel>
              <Select
                id="ciudadId"
                placeholder="Selecciona la Ciudad"
                variant="filled"
                value={
                  ciudadDeTecnico != 0
                    ? ciudadDeTecnico
                    : formTecnico.values.ciudadId
                }
                onChange={(e) => {
                  formTecnico.setFieldValue("ciudadId", Number(e.target.value));
                  setCiudadDeTecnico(Number(e.target.value));
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

          <SimpleGrid columns={[1, 2, 2]}>
            <FormControl>
              <FormLabel htmlFor="ciudades_cobertura" paddingTop={15}>
                Ciudades cobertura
              </FormLabel>
              <Stack pl={6} mt={1} spacing={1}>
                <CheckboxGroup
                  value={ciudadesCobertura.map((id) => Number(id))}
                  onChange={(checks) => {
                    setCiudadesCobertura(checks as string[]);
                  }}
                >
                  {ciudadesList.length != 0 ? (
                    ciudadesList.map((ciudad, index) => {
                      return (
                        <Checkbox
                          key={index}
                          id={ciudad.nombre}
                          value={ciudad.id}
                        >
                          {ciudad.nombre}
                        </Checkbox>
                      );
                    })
                  ) : (
                    <></>
                  )}{" "}
                </CheckboxGroup>
              </Stack>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="servicios" paddingTop={15}>
                Servicios
              </FormLabel>
              <Stack pl={6} mt={1} spacing={1}>
                <CheckboxGroup
                  value={serviciosDeTecnico.map((id) => Number(id))}
                  onChange={(checks) => {
                    setServiciosDeTecnico(checks as string[]);
                  }}
                >
                  {listadoServicios.length != 0 ? (
                    listadoServicios.map((t, index) => {
                      return (
                        <Checkbox key={index} id={t.nombre} value={t.id}>
                          {t.nombre}
                        </Checkbox>
                      );
                    })
                  ) : (
                    <></>
                  )}{" "}
                </CheckboxGroup>
              </Stack>
            </FormControl>
          </SimpleGrid>

          <HStack>
            <Spacer />
            <Button
              id="guardar_tecnico"
              colorScheme="whatsapp"
              variant="solid"
              type="submit"
              isLoading={cargando}
            >
              Guardar datos de tecnico
            </Button>

            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </HStack>
        </Box>
      </form>
    </DesktopLayout>
  );
}

export default TecnicoNuevo;

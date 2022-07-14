import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import Router from "next/router";
import React from "react";
import { CiudadesService } from "@/services/ciudades.service";
import {
  FormLabel,
  Input,
  FormControl,
  HStack,
  VStack,
  Button,
  Spacer,
  useToast,
  Box,
  Center,
  Divider,
  Select,
  Stack,
  Text,
  Checkbox,
  CheckboxGroup,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/router";

function TecnicoNuevo() {
  // ---- conexion y obtencion de id ---------
  const router = useRouter();
  const { idTecnico } = router.query;
  //------------------------ DATA USUARIO -------------------------------------
  const [usuario, setUsuario] = useState<IUsuario>();
  //------------------------ DATA TECNICO -------------------------------------
  const [tecnico, setTecnico] = useState<ITecnico>();

  const [ciudadDeTecnico, setCiudadDeTecnico] = useState<number>();
  const [serviciosDeTecnico, setServiciosDeTecnico] = useState<number[]>([]);
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
      return servicio.id!;
    });

    if (arr != undefined) setServiciosDeTecnico(arr);
  };

  /*ACTUALIZAR EL ESTADO SELECCIONADO FORMIK */

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
      const data = {
        ...values,
      } as ITecnico;

      const service = new TecnicoService();
      const respuesta = await service.update(data, Number(idTecnico));

      const dataUpdate = respuesta.data as ITecnico;

      if (respuesta.status == 200) {
        setTecnico(dataUpdate);
        //Se actualizan sus servicios

        const respuestaServicios = await service.editarServiciosDeTecnico(
          Number(idTecnico),
          serviciosDeTecnico
        );

        toast({
          title: "Usuario guardado, con éxito",
          position: "bottom-right",
          status: "success",
          description: `Se guardo usuario, exitosamente.`,
        });
        router.push("/tecnicos");
      } else {
        setCargando(false);
        toast({
          title: "Oops... Ocurrio un error.",
          status: "error",
          position: "bottom-right",
          description: `Error, verificar los campos.`,
        });
      }
    },
  });

  // -------------------- usuario --------------------
  const formUsuario = useFormik({
    initialValues: {
      inactivo: usuario?.inactivo,
      usuario: usuario?.usuario || "",
      email: usuario?.email || "",
      password: "",
      rol: usuario?.rol || "TECNICO",
    },
    enableReinitialize: true,

    onSubmit: async (values: IUsuario) => {
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
          status: "error",
          position: "bottom-right",
          description: `Error al actualizar, verificar los campos.`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Se guardo con éxito.",
          status: "success",
          position: "bottom-right",
          description: `Usuario guardado, exitosamente`,
        });
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
  }, [listadoServicios]);

  return (
    <DesktopLayout>
      <Header title={"Editar Usuario"} />

      <form onSubmit={formUsuario.handleSubmit}>
        <FormControl isRequired>
          <VStack
            m={2}
            padding={5}
            borderRadius={10}
            boxShadow="sm"
            p="6"
            rounded="md"
            bg="white"
            spacing={2}
            alignItems={"start"}
          >
            <FormLabel htmlFor="usuario">Nombre de usuario</FormLabel>
            <Input
              maxLength={20}
              isRequired
              variant="filled"
              id="usuario"
              placeholder="Nombre de Usuario"
              defaultValue={usuario?.usuario}
              onChange={formUsuario.handleChange}
              value={formUsuario.values.usuario}
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              maxLength={100}
              isRequired
              variant="filled"
              id="email"
              type={"email"}
              placeholder="email@gmail.com"
              defaultValue={usuario?.email}
              onChange={formUsuario.handleChange}
              value={formUsuario.values.email}
            />

            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              minLength={8}
              maxLength={100}
              isRequired={false}
              variant="filled"
              id="password"
              type={"password"}
              onChange={formUsuario.handleChange}
              value={formUsuario.values.password}
            />
            <FormHelperText>Mínimo 8 carácteres</FormHelperText>

            <HStack spacing={4} w={"100%"} mt={"12rem"}>
              <Spacer />
              <Button
                id="guardar_tecnico"
                colorScheme="whatsapp"
                variant="solid"
                type="submit"
                isLoading={cargando}
              >
                Guardar
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      </form>

      {/* terminar el form de usuario y empieza el de tecnico **/}

      <form onSubmit={formTecnico.handleSubmit}>
        <FormControl>
          <VStack
            m={2}
            padding={5}
            borderRadius={10}
            boxShadow="sm"
            p="6"
            rounded="md"
            bg="white"
            spacing={2}
            alignItems={"start"}
          >
            <Box
              w={"100%"}
              m={2}
              padding={5}
              borderRadius={10}
              boxShadow="lg"
              p="6"
              rounded="md"
              bg={"white"}
            >
              <Text fontWeight="bold">Datos básicos del tecnico</Text>

              <Center>
                <Divider orientation="vertical" />
                <FormControl isRequired paddingTop={15}>
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <Input
                    maxLength={20}
                    variant="filled"
                    id="nombre"
                    placeholder="Nombre"
                    defaultValue={tecnico?.nombre}
                    onChange={formTecnico.handleChange}
                  />
                </FormControl>

                <FormControl isRequired paddingTop={15} paddingLeft={15}>
                  <FormLabel htmlFor="apellidoPaterno">
                    Primer Apellido
                  </FormLabel>
                  <Input
                    maxLength={20}
                    variant="filled"
                    id="apellido_paterno"
                    placeholder="Apellido Paterno"
                    defaultValue={tecnico?.apellido_paterno}
                    onChange={formTecnico.handleChange}
                  />
                </FormControl>
              </Center>

              <Center>
                <Divider orientation="vertical" />

                <FormControl isRequired paddingTop={15}>
                  <FormLabel htmlFor="apellidoMaterno">
                    Segundo Apellido
                  </FormLabel>
                  <Input
                    maxLength={20}
                    variant="filled"
                    id="apellido_materno"
                    placeholder="Apellido Materno"
                    defaultValue={tecnico?.apellido_materno}
                    onChange={formTecnico.handleChange}
                  />
                </FormControl>

                <FormControl isRequired paddingTop={15} paddingLeft={15}>
                  <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                  <Input
                    maxLength={14}
                    variant="filled"
                    id="telefono"
                    placeholder="Teléfono"
                    type={"tel"}
                    defaultValue={tecnico?.telefono}
                    onChange={formTecnico.handleChange}
                  />
                </FormControl>
              </Center>

              <Center>
                <Divider orientation="vertical" />

                <FormControl isRequired paddingTop={15}>
                  <FormLabel htmlFor="estado">Estado</FormLabel>
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

                <FormControl isRequired paddingLeft={5} paddingTop={15}>
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
                      formTecnico.setFieldValue(
                        "ciudadId",
                        Number(e.target.value)
                      );
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
              </Center>

              <Divider orientation="vertical" />

              <FormControl>
                <FormLabel htmlFor="servicios">Servicios</FormLabel>
                <Stack pl={6} mt={1} spacing={1}>
                  <CheckboxGroup
                    value={serviciosDeTecnico}
                    onChange={(checks) => {
                      const arr: number[] = checks.map((check) => {
                        return Number(check);
                      });
                      setServiciosDeTecnico(arr);
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
            </Box>

            <HStack spacing={4} w={"100%"} mt={"12rem"}>
              <Spacer />
              <Button
                id="guardar_usuario"
                colorScheme="whatsapp"
                variant="solid"
                type="submit"
                isLoading={cargando}
              >
                Guardar
              </Button>

              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => Router.back()}
              >
                Cancelar
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      </form>
    </DesktopLayout>
  );
}

export default TecnicoNuevo;

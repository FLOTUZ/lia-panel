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
  FormHelperText
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { FormEvent, useState, useEffect } from "react";
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

  //----------------------- DATA TECNICO -------------------------------------
  const [ciudadId, setciudadId] = useState<number>();
  const [servicios, setServicios] = useState<string[]>([]);
  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);

  const [cargando, setCargando] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

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
  };
  // ---------- servicios ------------
  const [listadoServicios, setListadoServicios] = useState<IServicio[]>([]);

  const consultarServicios = async () => {
    const service = new ServiciosService();
    const respuesta = await service.getAll();

    if (respuesta.status != 200) {
    } else {
      const data = respuesta.data as IServicio[];
      setListadoServicios(data);
    }
  };

  const filtradoServicios = (t: IServicio) => {
    const id = t.id || 0;
    const arr = servicios;
    const found = arr.find((e) => e == String(id));

    if (!found) {
      arr.push(String(id));
      setServicios(arr);
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == String(id)) {
          arr.splice(i, 1);
          setServicios(arr);
        }
      }
    }
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
    const respuesta = await service.getById(Number(tecnico?.usuarioId));
    const dato = respuesta.data as IUsuario
    setUsuario(dato);
  };

  const getEstado = async () => {
    const service = new EstadosService();
    const respuesta = await service.getById(Number(tecnico?.ViveEn?.estadoId));
    const dato = respuesta.data as IEstado
    setEstado(dato);
  };

  useEffect(() => {
    getTecnico();
    
    
    
  }, [])
  
  useEffect(() => {
    consultarServicios();
    consultarCiudades();
    consultarEstados();
    getUsuario();
    getEstado();
  }, [tecnico]);

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
      Servicio: tecnico?.Servicio ,
    },
    enableReinitialize: true,

    onSubmit: async (values: ITecnico) => {
      const data = {
        ...values,
      };
      console.log(data);

      const service = new TecnicoService();
      const respuesta = await service.update(data, Number(idTecnico));
      console.log(respuesta);
      const dataUpdate = respuesta.data as ITecnico;
      setTecnico(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Error",
          status: "error",
          description: `Error al actualizar, verifique sus campos`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Guardado",
          status: "success",
          description: `${respuesta.Estado} guardado`,
        });
      }
    },
  });

  // -------------------- usuario --------------------
  const formUsuario = useFormik({
    initialValues: {
      usuario: usuario?.usuario || "",
      email: usuario?.email || "",
      password: usuario?.password || "",
      rol: usuario?.rol || "TECNICO",
    },
    enableReinitialize: true,

    onSubmit: async (values: IUsuario) => {
      const datos = {
        ...values,
      };

      const service = new UsuariosService();
      const respuesta = await service.update(datos, Number(usuarioId));
console.log(respuesta );
console.log(datos );


      const dataUpdate = respuesta.data as IUsuario;
      setUsuario(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Error",
          status: "error",
          description: `Error al actualizar, verifique sus campos`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Guardado",
          status: "success",
          description: `${respuesta.usuario} guardado`,
        });
      }
    },
  });

  return (
    <DesktopLayout>
      <Header title={"Nuevo Usuario"} />
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
            <FormLabel htmlFor="usuario">Editar Técnico</FormLabel>
            <Input
              isRequired
              variant="filled"
              id="usuario"
              placeholder="Nombre de Usuario"
              defaultValue={usuario?.usuario}
              onChange={formUsuario.handleChange}
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              isRequired
              variant="filled"
              id="email"
              type={"email"}
              placeholder="email@gmail.com"
              defaultValue={usuario?.email}
              onChange={formUsuario.handleChange}
            />

            <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
            <Input
              variant="filled"
              id="password"
              type={"password"}
              defaultValue={usuario?.password}
              isRequired={true}
              onChange={formUsuario.handleChange}
            />

            <HStack spacing={4} w={"100%"} mt={"12rem"}>
              <Spacer />
              <Button
                id="guardar"
                colorScheme="blue"
                variant="solid"
                type="submit"
                isLoading={cargando}
              >
                Guardar
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      </form>

      {/* terminar el fomr de usuario y empieza el de tecnico **/}

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
                    variant="filled"
                    id="nombre"
                    placeholder="Nombre"
                    defaultValue={tecnico?.nombre}
                    onChange={formTecnico.handleChange}
                  />
                </FormControl>

                <FormControl isRequired paddingTop={15} paddingLeft={15}>
                  <FormLabel htmlFor="apellidoPaterno">
                    Apellido Paterno
                  </FormLabel>
                  <Input
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
                    Apellido Materno
                  </FormLabel>
                  <Input
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
                    onChange={(e) => {
                      formTecnico.handleChange,
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
                  <FormHelperText >Seleccione el Estado Nuevamente</FormHelperText>
                </FormControl>

                <FormControl isRequired paddingLeft={5} paddingTop={15}>
                  <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
                  <Select
                    id="ciudad"
                    placeholder="Selecciona la Ciudad"
                    variant="filled"
                    defaultValue={tecnico?.ViveEn?.nombre}
                    onChange={formTecnico.handleChange}
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
                  <FormHelperText >Seleccione la Ciudad Nuevamente</FormHelperText>
                </FormControl>
              </Center>

              <Divider orientation="vertical" />
              <FormControl isRequired paddingTop={15}></FormControl>
              <FormControl>
                <FormLabel htmlFor="ciudad">Servicios</FormLabel>
                <FormHelperText >Agrega los Servicios Nuevamente</FormHelperText>
                <Stack pl={6} mt={1} spacing={1}>
                  <CheckboxGroup
                    onChange={(checks) => {
                      console.log(checks);
                      formTecnico.setFieldValue("servicio", checks);
                    }}
                  >
                    {listadoServicios.length != 0 ? (
                      listadoServicios.map((t, index) => {
                        return <Checkbox key={index}>{t.nombre}</Checkbox>;
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
                id="guardar"
                colorScheme="blue"
                variant="solid"
                type="submit"
                isLoading={cargando}
              >
                Agregar
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

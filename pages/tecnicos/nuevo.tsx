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
  FormHelperText,
  Link,
} from "@chakra-ui/react";
//import { useFormik } from "formik";

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

function UsuarioNuevo() {
  //------------------------ DATA USUARIO -------------------------------------
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("TECNICO");

  //----------------------- DATA TECNICO -------------------------------------
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuarioId, setUsuarioId] = useState(0);
  const [ciudadId, setciudadId] = useState<number>(0);
  const [estadoId, setestadoId] = useState<number>();
  const [servicios, setServicios] = useState<string[]>([]);
  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);
  const [estadosList, setEstadosList] = useState<IEstado[]>([]);

  const [cargando, setCargando] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // consulta de la tabla de servicios

  const [listadoServicios, setListadoServicios] = useState<IServicio[]>([]);

  // ciudades por Estado
  const [IdEstado, setIdEstado] = useState(0);

  const toast = useToast();

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

  const altaUsuario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setCargando(true);
    const dataUsuario: IUsuario = {
      usuario,
      email,
      password,
      rol,
    };

    const serviceUsuario = new UsuariosService();
    const respuestaUsuario = await serviceUsuario.create(dataUsuario);
    const usuarioGuardado = respuestaUsuario.data as IUsuario;

    if (respuestaUsuario.status != 201) {
      setCargando(false);
      toast({
        title: "Oops... Ocurrio un error.",
        status: "error",
        position: "bottom-right",
        description: `Error al dar de alta, verificar los campos.`,
      });
    }
    if (respuestaUsuario.status == 200) {
      toast({
        title: "T??cnico agregado.",
        position: "bottom-right",
        status: "success",
        description: `Se guardo el usuario, exitosamente.`,
      });
    }
    //----------------------------ALTA TECNICO----------------------------------------
    if (rol === "TECNICO" && respuestaUsuario.status == 201) {
      const dataTecnico: ITecnico = {
        nombre: nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        telefono: telefono,
        usuarioId: usuarioGuardado.id || 0,
        ciudadId: ciudadId || 0,
      };

      console.log(dataTecnico);

      const serviceTecnico = new TecnicoService();
      const respuestaTecnico = await serviceTecnico.create(dataTecnico);
      const tecnicoGuardado = respuestaTecnico.data as ITecnico;

      if (respuestaTecnico.status != 201) {
        setCargando(false);
        toast({
          title: "Oops... Ocurrio un error.",
          status: "error",
          position: "bottom-right",
          description: `Error, verificar los campos.`,
        });
      }
      if (respuestaUsuario.status == 201 && respuestaTecnico.status == 201) {
        toast({
          title: "Se agrego el usuario.",
          status: "success",
          position: "bottom-right",
          description: `Se guardo exitosamente, el t??cnico ${tecnicoGuardado.nombre}.`,
        });

        const respuesta = serviceTecnico.agregarServiciosATecnico(
          tecnicoGuardado.id || 0,
          servicios
        );
      }
    }

    Router.back();
  };

  const consultarServicios = async () => {
    const service = new ServiciosService();
    const respuesta = await service.getAll();

    if (respuesta.status != 200) {
    } else {
      const data = respuesta.data as IServicio[];
      setListadoServicios(data);
    }
  };

  const consultarEstados = async () => {
    const servicio = new EstadosService();
    const respuesta = await servicio.getAll();
    const data = respuesta.data as IEstado[];

    setEstadosList(data);
  };

  const consultarCiudades = async () => {
    const servicio = new CiudadesService();
    const respuesta: any = await servicio.getCiudadesByIdEstado(IdEstado);
    const data = respuesta.data as ICiudad[];

    setCiudadesList(data);
  };

  useEffect(() => {
    consultarEstados();
    consultarCiudades();
    consultarServicios();
  }, []);

  return (
    <DesktopLayout>
      <Header title={"Nuevo Tecnico"} />
      <form onSubmit={(e) => altaUsuario(e)}>
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
            <FormLabel htmlFor="usuario">Nombre de Usuario</FormLabel>
            <Input
              isRequired
              maxLength={20}
              variant="filled"
              id="usuario"
              placeholder="Nombre de Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value.toLowerCase())}
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              isRequired
              maxLength={100}
              variant="filled"
              id="email"
              type={"email"}
              placeholder="email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl isRequired>
              <FormLabel htmlFor="password">Contrase??a</FormLabel>
              <Input
                maxLength={100}
                variant="filled"
                id="password"
                type={"password"}
                isRequired={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormHelperText>M??nimo 8 Caracteres</FormHelperText>
            </FormControl>

            {/* //----------------------------FORMULARIO NUEVO TECNICO------------------------------------ */}
            {rol === "TECNICO" ? (
              <>
                <Box
                  w={"100%"}
                  m={2}
                  padding={5}
                  paddingTop={5}
                  borderRadius={10}
                  boxShadow="lg"
                  p="6"
                  rounded="md"
                  bg={"white"}
                >
                  <Text fontWeight="bold">Datos B??sicos del T??cnico</Text>

                  <Center>
                    <Divider orientation="vertical" />
                    <FormControl isRequired paddingTop={15}>
                      <FormLabel htmlFor="nombre">Nombre</FormLabel>
                      <Input
                        maxLength={100}
                        variant="filled"
                        id="nombre"
                        placeholder="Nombre"
                        onChange={(e) => {
                          setNombre(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired paddingTop={15} paddingLeft={15}>
                      <FormLabel htmlFor="apellidoPaterno">
                        Primer Apellido
                      </FormLabel>

                      <Input
                        maxLength={100}
                        variant="filled"
                        id="apellidoPaterno"
                        placeholder="Primer Apellido"
                        onChange={(e) => {
                          setApellidoPaterno(e.target.value);
                        }}
                      />
                    </FormControl>
                  </Center>

                  <Center>
                    <Divider orientation="vertical" />

                    <FormControl paddingTop={15}>
                      <FormLabel htmlFor="apellidoMaterno">
                        Segundo Apellido
                      </FormLabel>
                      <Input
                        maxLength={100}
                        variant="filled"
                        id="apellidoMaterno"
                        placeholder="Segundo Apellido"
                        onChange={(e) => {
                          setApellidoMaterno(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired paddingTop={15} paddingLeft={15}>
                      <FormLabel htmlFor="telefono">Tel??fono</FormLabel>
                      <Input
                        variant="filled"
                        id="telefono"
                        placeholder="Tel??fono"
                        maxLength={10}
                        type={"tel"}
                        onChange={(e) => {
                          setTelefono(e.target.value);
                        }}
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
                          setestadoId(Number(e.target.value));
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
                      <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
                      <Select
                        id="ciudad"
                        placeholder="Selecciona la Ciudad"
                        variant="filled"
                        onChange={(e) => {
                          setciudadId(Number(e.target.value));
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
                  </Center>

                  <Divider orientation="vertical" />
                  <FormControl isRequired paddingTop={15}></FormControl>
                  <FormControl>
                    <FormLabel htmlFor="ciudad">Servicios</FormLabel>
                    <Stack pl={6} mt={1} spacing={1}>
                      {listadoServicios.length != 0 ? (
                        listadoServicios.map((t, index) => {
                          return (
                            <Checkbox
                              key={index}
                              onChange={() => {
                                filtradoServicios(t);
                              }}
                            >
                              {t.nombre}
                            </Checkbox>
                          );
                        })
                      ) : (
                        <></>
                      )}{" "}
                    </Stack>
                  </FormControl>

                  <HStack spacing={4} w={"100%"}>
                    <Spacer />
                    <Link href={"/usuarios/index"}>
                      <Button
                        id="guardar"
                        colorScheme="whatsapp"
                        variant="solid"
                        type="submit"
                        //isLoading={cargando}
                      >
                        Agregar
                      </Button>
                    </Link>

                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={() => Router.back()}
                    >
                      Cancelar
                    </Button>
                  </HStack>
                </Box>
              </>
            ) : null}
          </VStack>
        </FormControl>
      </form>
    </DesktopLayout>
  );
}

export default UsuarioNuevo;

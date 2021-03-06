import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import Router from "next/router";
import React from "react";
import { CiudadesService } from "@/services/ciudades.service";
import {
  FormLabel,
  Input,
  FormControl,
  RadioGroup,
  HStack,
  VStack,
  Radio,
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
} from "@chakra-ui/react";
//import { useFormik } from "formik";

import { FormEvent, useState, useEffect } from "react";
import { ITecnico, IUsuario, IServicio, ICiudad } from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";
import { TecnicoService } from "@/services/tecnicos.service";
import { ServiciosService } from "@/services/servicios.service";

function UsuarioNuevo() {
  //------------------------ DATA USUARIO -------------------------------------
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("USUARIO");

  //----------------------- DATA TECNICO -------------------------------------
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuarioId, setUsuarioId] = useState(0);
  const [ciudadId, setCiudad] = useState<number>();
  const [servicios, setServicios] = useState<string[]>([]);
  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);

  const [cargando, setCargando] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

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
        position: "bottom-right",
        status: "error",
        description: `Error, verificar los campos.`,
      });
    }
    if (respuestaUsuario.status == 201) {
      toast({
        title: "Usuario agregado",
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
          title: "Usuario guardado.",
          status: "success",
          position: "bottom-right",
          description: `Se guardo, con ??xito el t??cnico ${tecnicoGuardado.nombre}.`,
        });

        const servicioToTecnicos = new TecnicoService();
        const respuesta = servicioToTecnicos.agregarServiciosATecnico(
          tecnicoGuardado.id || 0,
          servicios
        );
      }
    }

    Router.back();
  };

  // consulta de la tabla de servicios

  const [listadoServicios, setListadoServicios] = useState<IServicio[]>([]);

  useEffect(() => {
    const consultarTecnicos = async () => {
      const service = new ServiciosService();
      const respuesta = await service.getAll();

      if (respuesta.status != 200) {
      } else {
        const data = respuesta.data as IServicio[];
        setListadoServicios(data);
      }
    };

    const consultarCiudades = async () => {
      const servicio = new CiudadesService();
      const respuesta = await servicio.getAll();
      const data = respuesta.data as ICiudad[];

      setCiudadesList(data);
    };

    consultarCiudades();
    consultarTecnicos();
  }, []);

  return (
    <DesktopLayout>
      <Header title={"Nuevo Usuario"} />
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
              variant="filled"
              id="usuario"
              placeholder="Nombre de Usuario"
              maxLength={20}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value.toLowerCase())}
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              isRequired
              variant="filled"
              id="email"
              type={"email"}
              maxLength={100}
              placeholder="email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl isRequired>
              <FormLabel htmlFor="password">Contrase??a</FormLabel>
              <Input
                variant="filled"
                id="password"
                type={"password"}
                placeholder="Contrase??a"
                maxLength={255}
                isRequired={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormHelperText>M??nimo 8 caracteres</FormHelperText>
            </FormControl>
            <FormLabel htmlFor="rol">Seleccione Rol</FormLabel>

            <RadioGroup
              id="rol"
              aria-required={true}
              defaultValue="USUARIO"
              onChange={(e) => setRol(e)}
            >
              <HStack spacing="1rem">
                <Radio size={"lg"} value="TECNICO">
                  Es T??cnico
                </Radio>

                <Radio size={"lg"} value="CAPTURISTA">
                  Capturista
                </Radio>

                <Radio size={"lg"} value="ADMIN">
                  Administrador
                </Radio>
              </HStack>
            </RadioGroup>
            {/* //----------------------------FORMULARIO NUEVO TECNICO------------------------------------ */}
            {rol === "TECNICO" ? (
              <>
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
                  <Text fontWeight="bold">Datos B??sicos del T??cnico</Text>

                  <Center>
                    <Divider orientation="vertical" />
                    <FormControl isRequired paddingTop={15}>
                      <FormLabel htmlFor="nombre">Nombre</FormLabel>
                      <Input
                        variant="filled"
                        id="Nombre"
                        placeholder="Nombre"
                        onChange={(e) => {
                          setNombre(e.target.value);
                        }}
                      />
                    </FormControl>
                  </Center>

                  <Center>
                    <Divider orientation="vertical" />
                    <FormControl isRequired paddingTop={15}>
                      <FormLabel htmlFor="apellidoPaterno">
                        Primer Apellido
                      </FormLabel>
                      <Input
                        variant="filled"
                        id="apellidoPaterno"
                        placeholder="Apellido Paterno"
                        onChange={(e) => {
                          setApellidoPaterno(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired paddingLeft={5} paddingTop={15}>
                      <FormLabel htmlFor="apellidoMaterno">
                        Segundo Apellido
                      </FormLabel>
                      <Input
                        variant="filled"
                        id="apellidoMaterno"
                        placeholder="Apellido Materno"
                        onChange={(e) => {
                          setApellidoMaterno(e.target.value);
                        }}
                      />
                    </FormControl>
                  </Center>

                  <Center>
                    <Divider orientation="vertical" />
                    <FormControl isRequired paddingTop={15}>
                      <FormLabel htmlFor="telefono">Tel??fono</FormLabel>
                      <Input
                        variant="filled"
                        id="telefono"
                        placeholder="Tel??fono"
                        type={"tel"}
                        onChange={(e) => {
                          setTelefono(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired paddingLeft={5} paddingTop={15}>
                      <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
                      <Select
                        id="ciudad"
                        placeholder="Selecciona la Ciudad"
                        variant="filled"
                        onChange={(e) => {
                          setCiudad(Number(e.target.value));
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
                      )}
                    </Stack>
                  </FormControl>
                </Box>
              </>
            ) : null}
            <HStack spacing={4} w={"100%"} mt={"12rem"}>
              <Spacer />
              <Button
                id="guardar"
                colorScheme="whatsapp"
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

export default UsuarioNuevo;

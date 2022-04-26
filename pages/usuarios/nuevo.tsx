import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import Router from "next/router";
import React from "react";
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
  InputLeftElement,
  Select,
  Stack,
  Switch,
  Text,
  Checkbox,

} from "@chakra-ui/react";
import { useFormik } from "formik";

import { FormEvent, useState, useEffect } from "react";
import { ITecnico, IUsuario, IServicio } from "@/services/api.models";
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
  const [ciudadId, setciudadId] = useState(0);

  const [cargando, setCargando] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const toast = useToast();

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

    console.log(usuarioGuardado);

    if (respuestaUsuario.status != 201) {
      setCargando(false);
      toast({
        title: "Error",
        status: "error",
        description: `Error al dar de alta, verifique sus campos de usuario`,
      });
    }
    if (respuestaUsuario.status == 201) {
      toast({
        title: "Guardado",
        status: "success",
        description: `Se guardo el usuario `,
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
        ciudadId: 1,
      };

      const serviceTecnico = new TecnicoService();
      const respuestaTecnico = await serviceTecnico.create(dataTecnico);
      const tecnicoGuardado = respuestaTecnico.data as ITecnico;

      console.log({ datatecnico: dataTecnico });

      if (respuestaTecnico.status != 201) {
        setCargando(false);
        toast({
          title: "Error",
          status: "error",
          description: `Error al dar de alta, verifique sus campos de usuario`,
        });
      }
      if (respuestaUsuario.status == 201 && respuestaTecnico.status == 201) {
        toast({
          title: "Guardado",
          status: "success",
          description: `Se guardo el tecnico ${tecnicoGuardado.nombre} con el usuario ${usuarioGuardado.usuario}`,
        });
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
            <FormLabel htmlFor="usuario">Nombre de usuario</FormLabel>
            <Input
              isRequired
              variant="filled"
              id="usuario"
              placeholder="María"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value.toLowerCase())}
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              isRequired
              variant="filled"
              id="email"
              type={"email"}
              placeholder="maria@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
            <Input
              variant="filled"
              id="password"
              type={"password"}
              isRequired={true}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormLabel htmlFor="rol">Seleccione Rol</FormLabel>

            <RadioGroup
              id="rol"
              aria-required={true}
              defaultValue="USUARIO"
              onChange={(e) => setRol(e)}
            >
              <HStack spacing="1rem">
                <Radio size={"lg"} value="USUARIO">
                  Usuario Comun
                </Radio>

                <Radio size={"lg"} value="TECNICO">
                  Es Tecnico
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
                  <Text fontWeight="bold">Datos básicos del tecnico</Text>

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
                        Apellido Paterno
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
                        Apellido Materno
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
                      <FormLabel htmlFor="telefono">Telefono</FormLabel>
                      <Input
                        variant="filled"
                        id="telefono"
                        placeholder="1234567890"
                        type={"tel"}
                        onChange={(e) => {
                          setTelefono(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired paddingLeft={5} paddingTop={15}>
                      <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
                      <Input
                        variant="filled"
                        id="ciudad"
                        placeholder="Morelia"
                      />
                    </FormControl>
                  </Center>
                  <Center>
                    <Divider orientation="vertical" />
                    <FormControl isRequired paddingTop={15}></FormControl>
                    <FormControl>
                      <FormLabel htmlFor="ciudad">Servicios</FormLabel>
                      <Stack pl={6} mt={1} spacing={1}>
                        {listadoServicios.length != 0 ? (
                          listadoServicios.map((t, index) => {
                            <Checkbox>
                              {t.nombre}
                            </Checkbox>
                          })
                        ) : (
                          <></>
                        )}{" "}

                      </Stack>
                    </FormControl>
                  </Center>
                </Box>
              </>
            ) : null}

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

export default UsuarioNuevo;

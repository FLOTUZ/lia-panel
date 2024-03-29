import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

import {
  FormLabel,
  Input,
  FormControl,
  VStack,
  Button,
  useToast,
  Select,
  Stack,
  Checkbox,
  FormHelperText,
  SimpleGrid,
  Heading,
  Flex,
  CheckboxGroup,
} from "@chakra-ui/react";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { UsuariosService } from "@/services/usuarios.service";
import { TecnicoService } from "@/services/tecnicos.service";
import { ServiciosService } from "@/services/servicios.service";
import { CiudadesService } from "@/services/ciudades.service";

import { ITecnico, IUsuario, IServicio, ICiudad } from "@/services/api.models";

function UsuarioNuevo() {
  const [listadoServicios, setListadoServicios] = useState<IServicio[]>([]);
  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);
  //------------------------ DATA USUARIO -------------------------------------
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //----------------------- DATA TECNICO -------------------------------------
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudadId, setCiudad] = useState<number>();
  const [servicios, setServicios] = useState<string[]>([]);

  const [ciudadesCobertura, setCiudadesCobertura] = useState<string[]>([]);

  const [cargando, setCargando] = useState(false);
  const toast = useToast();
  const router = useRouter();

  // consulta de la tabla de servicios
  const consultarTecnicos = async () => {
    const service = new ServiciosService();
    const respuesta = await service.getAll();

    if (respuesta.status == 200) {
      const data = respuesta.data as IServicio[];
      setListadoServicios(data);
    } else {
      toast({
        title: "Error",
        description: "Error al consultar los servicios",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const consultarCiudades = async () => {
    const servicio = new CiudadesService();
    const respuesta = await servicio.getAll();
    const data = respuesta.data as ICiudad[];

    if (respuesta.status == 200) {
      setCiudadesList(data);
    } else {
      toast({
        title: "Error",
        description: "Error al consultar las ciudades",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  //Controlar el cambio de servicios
  const filtradoServicios = (t: IServicio) => {
    //Id del servicio
    const idServicio = t.id || 0;
    //Arreglo de servicios
    const arr = servicios;
    //Buscar el servicio en el arreglo
    const found = arr.find((e) => e == String(idServicio));

    //Si no existe el servicio, agregarlo
    if (!found) {
      arr.push(idServicio.toString());
      //Asigna el arreglo de servicios actualizado
      setServicios(arr);
    } else {
      //Si existe el servicio, eliminarlo
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == idServicio.toString()) {
          arr.splice(i, 1);
          //Asigna el arreglo de servicios actualizado
          setServicios(arr);
        }
      }
    }
  };

  const altaUsuario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCargando(true);
    const serviceUsuario = new UsuariosService();

    const dataUsuario: IUsuario = {
      usuario,
      email,
      password,
      rol: "TECNICO",
    };

    if (servicios.length == 0) {
      toast({
        title: "Error al registrar tecnico",
        description: "Debe seleccionar al menos un servicio",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
      return;
    }

    const respuesta = await serviceUsuario.create(dataUsuario);

    if (respuesta.status != 201) {
      setCargando(false);
      toast({
        title: "Error al registrar usuario",
        status: "error",
        isClosable: true,
        description: `Es posible que el nombre de usuario ya exista o que el email esté en uso.`,
      });
      return;
    }
    //----------------------------ALTA TECNICO----------------------------------------
    if (respuesta.status == 201 && dataUsuario.rol === "TECNICO") {
      const usuarioEnBD = respuesta.data as IUsuario;
      await altaTecnico(usuarioEnBD);
    }
  };

  const altaTecnico = async (usuarioEnBD: IUsuario) => {
    const usuarioService = new UsuariosService();
    const tecnicoService = new TecnicoService();

    const dataTecnico: ITecnico = {
      nombre: nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      telefono: telefono,
      usuarioId: usuarioEnBD.id || 0,
      ciudadId: ciudadId || 0,
    };

    const respuestaTecnico = await tecnicoService.create(dataTecnico);
    const tecnicoGuardado = respuestaTecnico.data as ITecnico;

    if (respuestaTecnico.status != 201) {
      setCargando(false);
      toast({
        title: "Error al registrar tecnico",
        status: "error",
        position: "bottom-right",
        description: `Error, verificar los campos del tecnico`,
      });
      await usuarioService.remove(usuarioEnBD.id!);
    }
    if (respuestaTecnico.status == 201) {
      toast({
        title: "Usuario guardado.",
        status: "success",
        position: "bottom-right",
        description: `Se guardo, con éxito el técnico ${tecnicoGuardado.nombre}.`,
      });

      const servicioToTecnicos = new TecnicoService();
      await servicioToTecnicos.addServicesAndCiudadesCoberturaToTecnico(
        tecnicoGuardado.id || 0,
        servicios,
        ciudadesCobertura
      );
      setCargando(false);
      router.back();
    }
  };

  useEffect(() => {
    consultarCiudades();
    consultarTecnicos();
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
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Input
                variant="filled"
                id="password"
                type={"password"}
                placeholder="Contraseña"
                minLength={8}
                maxLength={255}
                isRequired={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormHelperText>Mínimo 8 caracteres</FormHelperText>
            </FormControl>

            {/* //----------------------------FORMULARIO NUEVO TECNICO------------------------------------ */}

            <Heading as={"h2"} fontWeight="bold">
              Datos Básicos del Técnico
            </Heading>
            <SimpleGrid
              w={"100%"}
              columns={[1, 2, 2]}
              spacingX={10}
              spacingY={2}
            >
              <FormControl isRequired>
                <FormLabel htmlFor="nombre">Nombre</FormLabel>
                <Input
                  variant="filled"
                  id="nombre_tecnico"
                  placeholder="Nombre"
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="apellidoPaterno">Primer Apellido</FormLabel>
                <Input
                  variant="filled"
                  id="primer_apellido"
                  placeholder="Apellido Paterno"
                  onChange={(e) => {
                    setApellidoPaterno(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="apellidoMaterno">
                  Segundo Apellido
                </FormLabel>
                <Input
                  variant="filled"
                  id="segundo_apellido"
                  placeholder="Apellido Materno"
                  onChange={(e) => {
                    setApellidoMaterno(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                <Input
                  id="telefono"
                  variant="filled"
                  step="1"
                  minLength={10}
                  maxLength={10}
                  placeholder="Teléfono"
                  type={"number"}
                  value={telefono}
                  onChange={(e) => {
                    if (e.target.value.length <= 10)
                      setTelefono(e.target.value);
                  }}
                />
                <FormHelperText>10 digitos numericos</FormHelperText>
              </FormControl>

              <FormControl isRequired>
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
            </SimpleGrid>

            <SimpleGrid columns={[1, 2, 2]} w={"100%"}>
              <FormControl>
                <FormLabel htmlFor="ciudades">Ciudades de cobertura</FormLabel>
                <CheckboxGroup
                  value={ciudadesCobertura}
                  onChange={(e) => {
                    setCiudadesCobertura(e as string[]);
                  }}
                >
                  <Stack pl={6} mt={1} spacing={1}>
                    {ciudadesList.length != 0 ? (
                      ciudadesList.map((ciudad, index) => {
                        return (
                          <Checkbox
                            key={index}
                            id={ciudad.nombre}
                            value={ciudad.id?.toString()}
                          >
                            {ciudad.nombre}
                          </Checkbox>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="servicios">Servicios</FormLabel>
                <Stack pl={6} mt={1} spacing={1}>
                  {listadoServicios.length != 0 ? (
                    listadoServicios.map((t, index) => {
                      return (
                        <Checkbox
                          id={index.toString()}
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
            </SimpleGrid>

            <Flex w={"100%"}>
              <SimpleGrid
                justifyContent={"right"}
                columns={[1, 2, 2]}
                spacing={2}
              >
                <Button
                  id="guardar"
                  colorScheme="whatsapp"
                  variant="solid"
                  type="submit"
                  isLoading={cargando}
                >
                  Guardar Tecnico
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
          </VStack>
        </FormControl>
      </form>
    </DesktopLayout>
  );
}

export default UsuarioNuevo;

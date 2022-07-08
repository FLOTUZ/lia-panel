import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { AddIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EstadosService } from "@/services/estados.service";
import { IEstado, ICiudad } from "@/services/api.models";
import { CiudadesService } from "@/services/ciudades.service";

function EstadoNuevo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [IdEstado, setIdEstado] = useState(0);
  const [habilitado, setHabilitado] = useState<boolean>(false);
  /*CONSULTA de Ciudades  */
  const [listadoCiudades, setListadoCiudades] = useState<ICiudad[]>([]);

  const consultarCiudades = async () => {
    const ciudad = new CiudadesService();
    const respuesta: any = await ciudad.getCiudadesByIdEstado(IdEstado);
    const data = respuesta.data as ICiudad[];

    if (respuesta.status == 200) {
      setListadoCiudades(data);
    } else {
    }
  };

  /*AGREGAR Ciudades */

  const [estadoGuardado, setEstadoGuardado] = useState<ICiudad>();
  const [nombreCiudad, setNombreCiudad] = useState("");

  const guardarCiudad = async () => {
    const data: ICiudad = {
      nombre: nombreCiudad,
      estadoId: estadoGuardado?.id,
    };

    const service = new CiudadesService();
    const response = await service.create(data);

    if (response.status === 201) {
      setNombreCiudad("");
      consultarCiudades();
      onClose();
      toast({
        title: "Ciudad agregada.",
        description: "La ciudad se agrego, exitosamente.",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setNombreCiudad("");
      toast({
        title: "Oops... Ocurrio un error.",
        position: "bottom-right",
        description: "Verificar los campos.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /*AGREGAR Estado*/
  const [nombreEstado, setNombreEstado] = useState("");

  const guardarEstado = async () => {
    const data: IEstado = {
      nombre: nombreEstado,
    };

    const estado = new EstadosService();

    const response = await estado.create(data);
    const estad = response.data as IEstado;
    setEstadoGuardado(estad);

    if (response.status === 201) {
      //onClose();
      setNombreEstado("");
      setIdEstado(estad.id || 0);
      toast({
        title: "Estado agregado.",
        description: "El estado se agrego, exitosamente.",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (response.status === 409) {
      toast({
        title: "Oops... Ocurrio un error.",
        description: "Posibles causas: El estado ya existe.",
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    console.log("CIUDADES ACTUALIZADAS");
  }, []);

  return (
    <div>
      <DesktopLayout>
        <Header title={"Crear Nuevo Estado"} />

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
          <Stack spacing={4} paddingTop={15}>
            <InputGroup>
              <FormControl isRequired>
                <FormLabel htmlFor="nombre">Nombre del Estado</FormLabel>
                <InputGroup>
                  <Input
                    type="Nombre"
                    placeholder="Estado"
                    maxLength={25}
                    value={nombreEstado}
                    onChange={(e) => {
                      const nombreM = e.target.value.toUpperCase();
                      setNombreEstado(nombreM);
                    }}
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <Divider paddingTop={5} orientation="horizontal" />
          </Stack>

          <Stack
            paddingTop={10}
            align="center"
            paddingLeft={"65%"}
            spacing={4}
            direction="row"
          >
            <Button
              colorScheme="whatsapp"
              variant="solid"
              onClick={() => {
                guardarEstado();
                setHabilitado(true);
              }}
            >
              Agregar
            </Button>

            <Link href={"/ciudades"}>
              <a>
                {" "}
                <Button colorScheme="red" variant="outline">
                  Regresar
                </Button>
              </a>
            </Link>
          </Stack>
        </Box>

        {/*-------------------Agregar ciudades al estado   se habilitada al guardar el estado */}
        {habilitado === true ? (
          <Box
            m={2}
            bgColor="white"
            padding={10}
            borderRadius={10}
            boxShadow="2xl"
            p="6"
            rounded="md"
            bg="white"
          >
            <Heading marginTop={5} as="h5" size="md">
              Ciudades del Estado
            </Heading>

            <Stack
              paddingTop={10}
              align="center"
              paddingLeft={"65%"}
              spacing={5}
              direction="row"
            >
              <Button
                leftIcon={<AddIcon />}
                colorScheme="facebook"
                variant="solid"
                onClick={onOpen}
                textAlign="center"
              >
                Nueva Ciudad
              </Button>
            </Stack>

            <Modal
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Agregar una Nueva Ciudad</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel>Nombre de la Ciudad</FormLabel>
                    <Input
                      placeholder="Nombre de la Ciudad"
                      value={nombreCiudad}
                      onChange={(e) => {
                        const nombreM = e.target.value.toUpperCase();
                        setNombreCiudad(nombreM);
                      }}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => guardarCiudad()}
                  >
                    Guardar
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <TableContainer>
              <Table
                marginTop={8}
                size="md"
                colorScheme="teal"
                variant="simple"
              >
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listadoCiudades.length !== 0 ? (
                    listadoCiudades.map((t, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{t.nombre}</Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <Tr>
                      <Td>NO DATA</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : null}
      </DesktopLayout>
    </div>
  );
}

export default EstadoNuevo;

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
import { AddIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EstadosService } from "@/services/estados.service";
import { IEstado, ICiudad } from "@/services/api.models";
import { CiudadesService } from "@/services/ciudades.service";

function EstadoNuevo() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  /*CONSULTA de Ciudades  */
  const [listadoCiudades, setListadoCiudades] = useState<ICiudad[]>([]);

  const consultarCiudades = async () => {
    const ciudad = new CiudadesService();
    const respuesta = await ciudad.getAll();
    const data = respuesta.data as ICiudad[];

    if (respuesta.status == 200) {
      setListadoCiudades(data);
    } else {
      console.log(respuesta);
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

    consultarCiudades();
    if (response.status === 201) {
      onClose();
      toast({
        title: "Asistencia Nueva Agregado con Exito.",
        description: "La Asistencia se Agrego con Exito.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: response.message,
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
      toast({
        title: "Estado Nuevo Agregado con Exito.",
        description: "El Estado se Agrego con Exito.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: response.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
          <Stack spacing={4}>
            <InputGroup>
              <FormControl isRequired>
                <FormLabel htmlFor="nombre">Nombre del Estado</FormLabel>
                <InputGroup>
                  <Input
                    type="Nombre"
                    placeholder="Estado"
                    onChange={(e) => {
                      setNombreEstado(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <Divider paddingTop={5} orientation="horizontal" />
          </Stack>

          <Stack
            marginTop={50}
            direction="row"
            spacing={4}
            align="center"
            paddingLeft={930}
          >
            <Button
              colorScheme="facebook"
              variant="solid"
              onClick={guardarEstado}
            >
              Agregar
            </Button>

            <Link href={"/ciudades"}>
              <a>
                {" "}
                <Button colorScheme="red" variant="outline">
                  Cancelar
                </Button>
              </a>
            </Link>
          </Stack>
        </Box>

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
            marginTop={2}
            direction="row"
            spacing={2}
            align="center"
            paddingLeft={930}
          >
            <Button
              leftIcon={<AddIcon />}
              colorScheme="facebook"
              variant="solid"
              onClick={onOpen}
            >
              Nueva Asistencia
            </Button>
          </Stack>

          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar una Nueva Ciudad</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={4}>
                  <FormLabel>Nombre de la Ciudad</FormLabel>
                  <Input
                    placeholder="Nombre de la Asistencia"
                    onChange={(e) => {
                      setNombreCiudad(e.target.value);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={guardarCiudad}>
                  Guardar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <TableContainer>
            <Table marginTop={8} size="md" colorScheme="teal" variant="simple">
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
      </DesktopLayout>
    </div>
  );
}

export default EstadoNuevo;

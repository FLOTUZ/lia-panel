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
  Link,
  IconButton,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon, ViewOffIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EstadosService } from "@/services/estados.service";
import { IEstado, ICiudad } from "@/services/api.models";
import { CiudadesService } from "@/services/ciudades.service";
import { useFormik } from "formik";

function EstadoVer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [nombreCiudad, setNombreCiudad] = useState("");

  const [data, setData] = useState<IEstado>();

  const router = useRouter();

  const [cargando, setCargando] = useState(false);

  const { idEstado } = router.query;

  /*CONSULTA de Ciudades  */

  const [listadoCiudades, setListadoCiudades] = useState<ICiudad[]>([]);

  /*  AGREGAR CIUDAD AL ESTADO*/

  const consultarCiudades = async () => {
    const city = new CiudadesService();
    const response: any = await city.getCiudadesByIdEstado(Number(idEstado));
    const data = response.data as ICiudad[];

    if (response.status == 200) {
      setListadoCiudades(data);
    } else {
    }
  };

  const guardarCiudad = async () => {
    const data: ICiudad = {
      nombre: nombreCiudad,
      estadoId: Number(idEstado),
    };

    const service = new CiudadesService();
    const response = await service.create(data);

    if (response.status === 201) {
      consultarCiudades();
      setNombreCiudad("");
      onClose();
      toast({
        title: "Ciudad agregada con éxito.",
        description: "La ciudad se agrego, exitosamente.",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: "Verificar los campos, no deben ser vacios.",
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /**ID ESTADO  */

  useEffect(() => {
    const getEstado = async () => {
      const service = new EstadosService();
      const respuesta = await service.getById(Number(idEstado));
      if (respuesta.status == 200) {
        setData(respuesta.data as IEstado);
      }
    };
    const consultaCiudades = async () => {
      const services = new CiudadesService();
      const response: any = await services.getCiudadesByIdEstado(
        Number(idEstado)
      );
      const data = response.data as IEstado[];

      if (response.status == 200) {
        setListadoCiudades(data || []);
      } else {
      }
    };

    getEstado();
    consultaCiudades();
  }, [idEstado]);

  /*ACTUALIZAR EL ESTADO SELECCIONADO FORMIK */

  const formEstado = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
    },
    enableReinitialize: true,

    onSubmit: async (values: IEstado) => {
      const data = {
        ...values,
      };

      const service = new EstadosService();
      const respuesta = await service.update(data, Number(idEstado));

      const dataUpdate = respuesta.data as IEstado;
      setData(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Oops... Ocurrio un error.",
          status: "error",
          position: "bottom-right",
          description: `Error al actualizar, verifique sus campos`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Actualización exitosa",
          status: "success",
          position: "bottom-right",
          description: `El estado se actualizó, correctamente`,
        });
        router.push("/ciudades");
      }
    },
  });

  return (
    <div>
      <DesktopLayout>
        <Header title={"Editar Estado"} />
        <form onSubmit={formEstado.handleSubmit}>
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
                      id="nombre"
                      variant="filled"
                      defaultValue={data?.nombre}
                      placeholder="Estado"
                      onChange={(e) => {
                        const nombreM = e.target.value.toUpperCase();
                        formEstado.setFieldValue("nombre", nombreM);
                      }}
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>

              <Divider paddingTop={5} orientation="horizontal" />
            </Stack>

            <Stack direction="row" spacing={4} align="center">
              <Spacer/>
              <Button
                id="guardar"
                type="submit"
                colorScheme="whatsapp"
                variant="solid"
              >
                Actualizar
              </Button>

              <Button
                onClick={() => router.back()}
                colorScheme="red"
                variant="outline"
              >
                Cancelar
              </Button>
            </Stack>
          </Box>

          <Box
            m={2}
            bgColor="white"
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
            >
              <Spacer/>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="facebook"
                variant="solid"
                onClick={onOpen}
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
                      placeholder="Nombre de la ciudad"
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
                    colorScheme="whatsapp"
                    variant="solid"
                    mr={3}
                    onClick={guardarCiudad}
                  >
                    Guardar
                  </Button>
                  <Button colorScheme="red" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <TableContainer>
              <Table
                marginTop={50}
                size="md"
                colorScheme="teal"
                variant="simple"
              >
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Opción</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listadoCiudades.length !== 0 ? (
                    listadoCiudades.map((t, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{t.nombre}</Td>
                          <Td>
                            <IconButton
                              variant="ghost"
                              aria-label="edit"
                              icon={<EditIcon />}
                              onClick={() => {
                                router.push(`/estados/ciudad/${t.id}`);
                              }}
                            />
                          </Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <Tr>
                      <Td> NO DATA </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </form>
      </DesktopLayout>
    </div>
  );
}

export default EstadoVer;

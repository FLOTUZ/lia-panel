/* eslint-disable react/no-children-prop */
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
  InputLeftElement,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  InputRightAddon,
  useToast,
  SimpleGrid,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import {
  MdCarRepair,
  MdOutlineAttachMoney,
  MdOutlineHomeMax,
  MdVerifiedUser,
} from "react-icons/md";
import { IAseguradora, IAsistencia } from "@/services/api.models";
import { useRouter } from "next/router";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { useFormik } from "formik";
import { IoLogoWhatsapp, IoSpeedometerOutline } from "react-icons/io5";

function AseguradoraVer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [nombreAsistencia, setNombreAsistencia] = useState("");

  const [data, setData] = useState<IAseguradora>();

  const router = useRouter();

  const [cargando, setCargando] = useState(false);

  const { idAseguradora } = router.query;

  /**CONSULTA DE ASISTENCIA DE LA ASEGURADORA */

  const [dataA, setDataA] = useState<IAsistencia>();

  const [listaAsistencias, setListaAsistencias] = useState<IAsistencia[]>([]);
  /**AGREGAR ASISTENCIA A LA ASEGURADORA */

  const consultaAsistencias = async () => {
    const services = new AsistenciasService();
    const response: any = await services.getAsistenciasByIdAseguradora(
      Number(idAseguradora)
    );
    const data = response.data as IAsistencia[];

    if (response.status == 200) {
      setListaAsistencias(data || []);
    } else {
    }
  };

  const guardarAsistencia = async () => {
    const data: IAsistencia = {
      nombre: nombreAsistencia,
      aseguradoraId: Number(idAseguradora),
    };

    const service = new AsistenciasService();
    const response = await service.create(data);

    consultaAsistencias();
    if (response.status === 201) {
      setNombreAsistencia("");
      onClose();
      toast({
        title: "Asistencia agregada con éxito.",
        description: "La asistencia se agrego, exitosamente.",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops... Ocurrio un error.",
        description: "Error al agregar, verificar los campos.",
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /**ID ASEGURADORA  */

  useEffect(() => {
    const getAseguradora = async () => {
      const service = new AseguradoraService();
      const respuesta = await service.getById(Number(idAseguradora));
      if (respuesta.status == 200) {
        setData(respuesta.data as IAseguradora);
      }
    };

    const consultaAsistencias = async () => {
      const services = new AsistenciasService();
      const response: any = await services.getAsistenciasByIdAseguradora(
        Number(idAseguradora)
      );
      const data = response.data as IAsistencia[];

      if (response.status == 200) {
        setListaAsistencias(data || []);
      } else {
      }
    };

    getAseguradora();
    consultaAsistencias();
  }, [idAseguradora]);

  /*ACTUALIZAR LA ASEGURADORA SELECCIONADA FORMIK */

  const formAseguradora = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
      telefono: data?.telefono || "",
      kilometraje_permitido: data?.kilometraje_permitido,
      costo_por_kilometro: data?.costo_por_kilometro!,
      costo_por_kilometro_foraneo: data?.costo_por_kilometro_foraneo!,
      telefono_domestico: data?.telefono_domestico || "",
      telefono_vial: data?.telefono_vial || "",
      telefono_whats: data?.telefono_whats || "",
    },
    enableReinitialize: true,

    onSubmit: async (values: IAseguradora) => {
      const data = {
        ...values,
      };

      const service = new AseguradoraService();
      const respuesta = await service.update(data, Number(idAseguradora));

      const dataUpdate = respuesta.data as IAseguradora;
      setData(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Oops... Ocurrio un error.",
          status: "error",
          position: "bottom-right",
          description: `Error al actualizar, verifique los campos.`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Actualización exitosa.",
          status: "success",
          position: "bottom-right",
          description: `La actualización se agrego, exitosamente.`,
        });
        router.push("/aseguradoras");
      }
    },
  });

  return (
    <div>
      <DesktopLayout>
        <Header title={"Editar Aseguradora"} />
        <form onSubmit={formAseguradora.handleSubmit}>
          <FormControl isRequired>
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
              <Stack spacing={1}>
                <FormControl isRequired>
                  <FormLabel htmlFor="nombre">
                    Nombre de la aseguradora
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdVerifiedUser color="green" />}
                    />
                    <Input
                      id="nombre"
                      variant="filled"
                      defaultValue={data?.nombre}
                      onChange={(e) => {
                        const nombreM = e.target.value.toUpperCase();
                        formAseguradora.setFieldValue("nombre", nombreM);
                      }}
                      type="Nombre"
                      minLength={3}
                      maxLength={255}
                      placeholder="Aseguradora"
                    />
                    <InputRightAddon
                      pointerEvents="none"
                      children={<EditIcon color="green" />}
                    />
                  </InputGroup>
                </FormControl>

                <InputGroup>
                  <FormControl isRequired>
                    <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="blue.300" />}
                      />
                      <Input
                        isRequired
                        id="telefono"
                        variant="filled"
                        defaultValue={data?.telefono}
                        onChange={(e) => {
                          if (e.target.value.length <= 10) {
                            formAseguradora.setFieldValue(
                              "telefono",
                              e.target.value.toString()
                            );
                          }
                        }}
                        value={formAseguradora.values.telefono}
                        type="number"
                        minLength={8}
                        maxLength={12}
                        placeholder="Phone number"
                      />
                      <InputRightAddon
                        pointerEvents="none"
                        children={<EditIcon color="green" />}
                      />
                    </InputGroup>
                  </FormControl>
                </InputGroup>

                <SimpleGrid columns={[1, 1, 3]} spacing={5}>
                  <InputGroup>
                    <FormControl isRequired>
                      <FormLabel htmlFor="kilometraje">
                        Kilometraje maximo
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<IoSpeedometerOutline color="gray.300" />}
                        />
                        <Input
                          minLength={1}
                          maxLength={3}
                          min={0}
                          max={100}
                          id="kilometraje_permitido"
                          variant="filled"
                          defaultValue={data?.kilometraje_permitido}
                          onChange={formAseguradora.handleChange}
                          type="number"
                          placeholder="Kilometraje"
                        />
                      </InputGroup>
                    </FormControl>
                  </InputGroup>

                  <InputGroup>
                    <FormControl isRequired>
                      <FormLabel htmlFor="costo por kilometraje">
                        Costo por Kilometro
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<MdOutlineAttachMoney color="gray.300" />}
                        />
                        <Input
                          minLength={1}
                          maxLength={3}
                          min={0}
                          max={100}
                          id="costo_por_kilometro"
                          variant="filled"
                          defaultValue={data?.costo_por_kilometro!}
                          onChange={formAseguradora.handleChange}
                          step={"any"}
                          type="number"
                          placeholder="costo por kilometro"
                        />
                      </InputGroup>
                    </FormControl>
                  </InputGroup>
                </SimpleGrid>

                <Divider paddingTop={5} orientation="horizontal" />
                <Heading paddingLeft={2} paddingBottom={5} as="h4" size="md">
                  Información adicional
                </Heading>
                <SimpleGrid columns={[1, 1, 3]} spacing={5}>
                  <InputGroup>
                    <FormControl>
                      <FormLabel htmlFor="telefono">
                        Teléfono Servicio Domestico
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<MdOutlineHomeMax color="gray.300" />}
                        />
                        <Input
                          id="telefono_domestico"
                          variant="filled"
                          defaultValue={data?.telefono_domestico}
                          onChange={(e) => {
                            if (e.target.value.length <= 10) {
                              formAseguradora.setFieldValue(
                                "telefono_domestico",
                                e.target.value.toString()
                              );
                            }
                          }}
                          type="number"
                          minLength={8}
                          maxLength={12}
                          placeholder="Numero de Teléfono de servicio domestico"
                          value={formAseguradora.values.telefono_domestico}
                        />
                      </InputGroup>
                    </FormControl>
                  </InputGroup>

                  <InputGroup>
                    <FormControl>
                      <FormLabel htmlFor="telefono">
                        Teléfono Servicio Vial
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<MdCarRepair color="gray.300" />}
                        />

                        <Input
                          id="telefono_vial"
                          variant="filled"
                          defaultValue={data?.telefono_vial}
                          onChange={(e) => {
                            if (e.target.value.length <= 10) {
                              formAseguradora.setFieldValue(
                                "telefono_vial",
                                e.target.value.toString()
                              );
                            }
                          }}
                          value={formAseguradora.values.telefono_vial}
                          type="number"
                          minLength={8}
                          maxLength={10}
                          placeholder="Numero de Teléfono de servicio vial"
                        />
                      </InputGroup>
                    </FormControl>
                  </InputGroup>

                  <InputGroup>
                    <FormControl>
                      <FormLabel htmlFor="telefono">
                        Teléfono solo para whatsapp
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<IoLogoWhatsapp color="green" />}
                        />

                        <Input
                          id="telefono_whats"
                          variant="filled"
                          defaultValue={data?.telefono_whats}
                          onChange={(e) => {
                            if (e.target.value.length <= 10) {
                              formAseguradora.setFieldValue(
                                "telefono_whats",
                                e.target.value.toString()
                              );
                            }
                          }}
                          value={formAseguradora.values.telefono_whats}
                          type="number"
                          minLength={8}
                          maxLength={12}
                          placeholder="Numero de whatsapp"
                        />
                      </InputGroup>
                    </FormControl>
                  </InputGroup>
                </SimpleGrid>
              </Stack>
              <Stack marginTop={50} direction="row" spacing={4}>
                <Button
                  id="guardar"
                  type="submit"
                  isLoading={cargando}
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
          </FormControl>

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
            <Heading marginTop={30} as="h5" size="md">
              Asistencia de Aseguradora
            </Heading>

            <Stack marginTop={5} direction="row" spacing={4} align="center">
              <Button
                leftIcon={<AddIcon />}
                colorScheme="facebook"
                variant="solid"
                onClick={onOpen}
              >
                Nueva Asistencia
              </Button>
            </Stack>
            <Modal
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Crea una Nueva Asistencia</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel>Nombre de la Asistencia</FormLabel>
                    <Input
                      maxLength={50}
                      minLength={3}
                      value={nombreAsistencia}
                      onChange={(e) => {
                        const nombreM = e.target.value.toUpperCase();
                        setNombreAsistencia(nombreM);
                      }}
                      placeholder="Nombre de la Asistencia"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="whatsapp"
                    variant="solid"
                    mr={3}
                    onClick={guardarAsistencia}
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
                variant="simple"
                colorScheme="teal"
              >
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Opción</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listaAsistencias.length !== 0 ? (
                    listaAsistencias.map((asistencias, index) => {
                      return (
                        <Tr key={index}>
                          <Td> {asistencias.nombre} </Td>
                          <Td>
                            <IconButton
                              variant="ghost"
                              aria-label="edit"
                              icon={<EditIcon />}
                              onClick={() => {
                                router.push(
                                  `/aseguradoras/asistencia/${asistencias.id}`
                                );
                              }}
                            />
                          </Td>
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
        </form>
      </DesktopLayout>
    </div>
  );
}

export default AseguradoraVer;

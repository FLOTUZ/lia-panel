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
  useToast,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import {
  MdCarRepair,
  MdOutlineAttachMoney,
  MdOutlineHomeMax,
  MdOutlineMapsHomeWork,
  MdVerifiedUser,
} from "react-icons/md";
import Link from "next/link";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { IAseguradora, IAsistencia } from "@/services/api.models";
import { AsistenciasService } from "@/services/asistencias.service";
import {
  IoLogoWhatsapp,
  IoSpeedometerOutline,
} from "react-icons/io5";

function AseguradoraNueva() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoDomestico, setTelefonoDomestico] = useState("");
  const [telefonoVial, setTelefonoVial] = useState("");
  const [telefonoWhats, setTelefonoWhats] = useState("");

  const [kilometraje, setKilometraje] = useState<number>(0);
  const [costoKilometro, setCostoKilometro] = useState<number>(0);
  const [costoKilometroForaneo, setCostoKilometroForaneo] = useState<number>(0);

  const [nombreAsistencia, setNombreAsistencia] = useState("");
  const [aseguradoraGuardada, setAseguradoraGuardada] =
    useState<IAseguradora>();

  const [listadoAsistencias, setListadoAsistencias] = useState<IAsistencia[]>(
    []
  );

  /*CONSULTA de asistencias  */
  const consultaAsistencias = async () => {
    const services = new AseguradoraService();
    const respuesta = await services.getById(aseguradoraGuardada?.id || 0);
    const data = respuesta.data as IAseguradora;

    if (respuesta.status == 200) {
      setListadoAsistencias(data.Asistencia || []);
    } else {
    }
  };

  /*AGREGAR ASISTENCIA */
  const guardarAsistencia = async () => {
    const data: IAsistencia = {
      nombre: nombreAsistencia,
      aseguradoraId: aseguradoraGuardada?.id,
    };

    const service = new AsistenciasService();
    const response = await service.create(data);

    consultaAsistencias();
    if (response.status === 201) {
      onClose();
      toast({
        title: "Asistencia Nueva Agregado con Exito.",
        description: "La Asistencia se Agrego con Exito.",
        position: "bottom-right",
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

  /**AGREGAR ASESOR EN LA ASEGURADORA */

  /*AGREGAR ASEGURADORA*/
  const guardarAseguradora = async () => {
    const data: IAseguradora = {
      nombre: nombre,
      telefono: telefono,
      kilometraje_permitido: kilometraje,
      costo_por_kilometro: costoKilometro,
      telefono_domestico: telefonoDomestico,
      telefono_vial: telefonoVial,
      telefono_whats: telefonoWhats,
      costo_por_kilometro_foraneo: costoKilometroForaneo,
    };

    const service = new AseguradoraService();
    const response = await service.create(data);
    const aseguradora = response.data as IAseguradora;
    setAseguradoraGuardada(aseguradora);

    if (response.status === 201) {
      onClose();
      toast({
        title: "Aseguradora nueva agregado con exito",
        description: "La Aseguradora se agrego con exito",
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
        <Header title={"Crear Nueva Aseguradora"} />

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
                <FormLabel htmlFor="nombre">Nombre de la Aseguradora</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdVerifiedUser color="green" />}
                  />
                  <Input
                    type="Nombre"
                    placeholder="Aseguradora"
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <InputGroup>
              <FormControl isRequired>
                <FormLabel htmlFor="telefono">Teléfono General</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineMapsHomeWork color="gray.300" />}
                  />
                  <Input
                    minLength={8}
                    maxLength={12}
                    onChange={(e) => {
                      setTelefono(e.target.value);
                    }}
                    type="phone"
                    placeholder="Numero de Teléfono"
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <SimpleGrid minChildWidth="200px" spacing={5}>
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
                      onChange={(e) => {
                        setKilometraje(Number(e.target.value));
                      }}
                      type="number"
                      placeholder="Kilometraje"
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <FormControl isRequired>
                  <FormLabel htmlFor="costo_kilometraje">
                    Costo por Kilometraje
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdOutlineAttachMoney color="gray.300" />}
                    />
                    <Input
                      min={0}
                      step={0.01}
                      onChange={(e) => {
                        setCostoKilometro(Number(e.target.value));
                      }}
                      type="number"
                      placeholder="Kilometraje"
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <FormControl isRequired>
                  <FormLabel htmlFor="costo_kilometro_foraneo">
                    Costo por Kilometraje Foraneo
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdOutlineAttachMoney color="gray.300" />}
                    />
                    <Input
                      id="costo_kilometro_foraneo"
                      min={0}
                      step={0.01}
                      onChange={(e) => {
                        setCostoKilometroForaneo(Number(e.target.value));
                      }}
                      type="number"
                      placeholder="Kilometraje excedente"
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>
            </SimpleGrid>

            <Divider paddingTop={5} orientation="horizontal" />
            <Heading paddingLeft={2} paddingBottom={5} as="h4" size="md">
              Información Adicional
            </Heading>
            <SimpleGrid columns={3} spacing={5}>
              <InputGroup>
                <FormControl>
                  <FormLabel htmlFor="telefono">
                    Teléfono Servicio Doméstico
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdOutlineHomeMax color="gray.300" />}
                    />
                    <Input
                      onChange={(e) => {
                        setTelefonoDomestico(e.target.value);
                      }}
                      minLength={8}
                      maxLength={12}
                      type="phone"
                      placeholder="Número de Teléfono de Servicio Doméstico"
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
                      minLength={8}
                      maxLength={12}
                      onChange={(e) => {
                        setTelefonoVial(e.target.value);
                      }}
                      type="phone"
                      placeholder="Número de Teléfono de Servicio Vial"
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <FormControl>
                  <FormLabel htmlFor="telefono">Teléfono de WhatsApp</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<IoLogoWhatsapp color="green" />}
                    />
                    <Input
                      minLength={8}
                      maxLength={12}
                      onChange={(e) => {
                        setTelefonoWhats(e.target.value);
                      }}
                      type="phone"
                      placeholder="Numero de WhatsApp"
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>
            </SimpleGrid>

            <Stack
              paddingTop={10}
              align="center"
              paddingLeft={"70%"}
              spacing={4}
              direction="row"
            >
              <Button
                colorScheme="whatsapp"
                variant="solid"
                onClick={guardarAseguradora}
              >
                Agregar
              </Button>

              <Link href={"/aseguradoras"}>
                <a>
                  <Button colorScheme="red" variant="outline">
                    Cancelar
                  </Button>
                </a>
              </Link>
            </Stack>
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
            Asistencia de Aseguradora
          </Heading>

          <Stack paddingLeft={"75%"}>
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
              <ModalHeader>Crea una Nueva Asistencia</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={4}>
                  <FormLabel>Nombre de la Asistencia</FormLabel>
                  <Input
                    placeholder="Nombre de la Asistencia"
                    onChange={(e) => {
                      setNombreAsistencia(e.target.value);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="whatsapp"
                  mr={3}
                  onClick={guardarAsistencia}
                >
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
                {listadoAsistencias.length !== 0 ? (
                  listadoAsistencias.map((t, index) => {
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

export default AseguradoraNueva;

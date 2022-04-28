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
  Select,
  Textarea,
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
  Spacer,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { IAseguradoras, IAsistencias } from "@/services/api.models";
import { AsistenciasService } from "@/services/asistencias.service";

function AseguradoraNueva() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const [nombreAseguradora, setNombreAseguradora] = useState("")
  const [telefonoAseguradora, setTelefonoAseguradora] = useState("")
  const [nombreAsistencia, setNombreAsistencia] = useState("")


  /*CONSULTA EN TABLA DE LAS ASEGURADORAS CON ASISTENCIAS */
  const [listadoAseguradoras, setListadoAseguradoras] = useState<IAseguradoras[]>([])
  useEffect(() => {
    const consultaAseguradoras = async () => {
      const services = new AseguradoraService();
      const respuesta = await services.getAll();
      const data = respuesta.data as IAseguradoras[];

      if (respuesta.status == 200) {
        setListadoAseguradoras(data);
      } else {
        console.log(respuesta)
      }
    };
    consultaAseguradoras();
  }, []);

  /*CONSULTA de asistencias  */
  const [listadoAsistencias, setListadoAsistencias] = useState<IAsistencias[]>([])
  useEffect(() => {
    const consultaAsistencias = async () => {
      const services = new AsistenciasService();
      const respuesta = await services.getAll();
      const data = respuesta.data as IAsistencias[];

      if (respuesta.status == 200) {
        setListadoAsistencias(data);
      } else {
        console.log(respuesta)
      }
    };
    consultaAsistencias();
  }, []);

  /*AGREGAR ASISTENCIA */
  const guardarAsistencia = async () => {
    const data: IAsistencias = {
      nombre: nombreAsistencia
    };

    const service = new AsistenciasService()
    const response = await service.create(data)
    console.log(response)

    if (response.status === 201) {
      onClose()
      setNombreAsistencia("")
      toast({
        title: "Asistencia nueva agregado con exito",
        description: 'La Asistencia se agrego con exito',
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

  }

  /*AGREGAR ASEGURADORA*/
  const guardarAseguradora = async () => {
    const data: IAseguradoras = {
      nombre: nombreAseguradora,
      telefono: telefonoAseguradora,
      expediente: "",
    };

    const service = new AseguradoraService()
    const response = await service.create(data)
    console.log(response)


    if (response.status === 201) {
      onClose()
      setNombreAseguradora("")
      setTelefonoAseguradora("")
      toast({
        title: "Aseguradora nueva agregado con exito",
        description: 'La Aseguradora se agrego con exito',
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


  }
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
                <FormLabel htmlFor="nombre">Nombre de la aseguradora</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdVerifiedUser color="green" />}
                  />
                  <Input type="Nombre" placeholder="Qualitas"
                    onChange={(e) => {
                      setNombreAseguradora(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <InputGroup>
              <FormControl isRequired>
                <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="gray.300" />}
                  />
                  <Input
                    onChange={(e) => {
                      setTelefonoAseguradora(e.target.value);
                    }}
                    type="tel" placeholder="Phone number" />
                </InputGroup>
              </FormControl>
            </InputGroup>
          </Stack>
          <Stack marginTop={50} direction="row" spacing={4} align="center">
            <Button colorScheme="twitter" variant="solid"
              onClick={guardarAseguradora}
            >
              Agregar
            </Button>

            <Link href={"/aseguradoras"}>
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
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={onOpen}
          >
            Nueva Asistencia
          </Button>
          <Heading marginTop={50} as="h5" size="md">
            Asistencia de aseguradora
          </Heading>

          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Crea una nueva asistencia</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={4}>
                  <FormLabel>Nombre de la asistencia</FormLabel>
                  <Input placeholder="Nombre de la asistencia"
                    onChange={(e) => {
                      setNombreAsistencia(e.target.value)
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}
                  onClick={guardarAsistencia}
                >
                  Guardar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <TableContainer>
            <Table marginTop={50} size="sm">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listadoAsistencias.length != 0 ? (
                  listadoAsistencias.map((t, index) => {
                    return (
                      <Tr key={index}>

                        <Td>{t.nombre}</Td>

                      </Tr>
                    )
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

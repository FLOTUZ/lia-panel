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
  Spacer,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
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
  const [expedienteAseguradora, setExpedienteAseguradora] = useState("")

  const [nombreAsistencia, setNombreAsistencia] = useState("")
  const [aseguradoraGuardada, setAseguradoraGuardada] = useState<IAseguradoras>()


  /*CONSULTA de asistencias  */
  const [listadoAsistencias, setListadoAsistencias] = useState<IAsistencias[]>([])


  const consultaAsistencias = async () => {
    const services = new AseguradoraService();
    const respuesta = await services.getById(aseguradoraGuardada?.id || 0);
    const data = respuesta.data as IAseguradoras;


    if (respuesta.status == 200) {
      setListadoAsistencias(data.Asistencia || []);
    } else {
      console.log(respuesta)
    }
  };


  /*AGREGAR ASISTENCIA */
  const guardarAsistencia = async () => {
    const data: IAsistencias = {
      nombre: nombreAsistencia,
      aseguradoraId: aseguradoraGuardada?.id,
    };

    const service = new AsistenciasService()
    const response = await service.create(data)

    consultaAsistencias()
    if (response.status === 201) {
      onClose()
      toast({
        title: "Asistencia Nueva Agregado con Exito.",
        description: 'La Asistencia se Agrego con Exito.',
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
      expediente: expedienteAseguradora,
    };

    const service = new AseguradoraService()
    const response = await service.create(data)
    const aseguradora = response.data as IAseguradoras
    setAseguradoraGuardada(aseguradora)

    if (response.status === 201) {
      onClose()
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
                <FormLabel htmlFor="expediente">Folio de la Aseguradora</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CheckIcon color="gray.300" />} />
                  <Input type="nombre" placeholder="Folio de la Aseguradora"
                    onChange={(e) => {
                      setExpedienteAseguradora(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <InputGroup>
              <FormControl isRequired>
                <FormLabel htmlFor="nombre">Nombre de la aseguradora</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdVerifiedUser color="green" />}
                  />
                  <Input type="Nombre" placeholder="Aseguradora"
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
                    type="tel" placeholder="Numero de Teléfono" />
                </InputGroup>
              </FormControl>
            </InputGroup>
            <InputGroup>
                  
 
            </InputGroup>
          </Stack>
          <Stack marginTop={50} direction="row" spacing={4} align="center" paddingLeft={930}>
            <Button colorScheme="facebook"
              variant="solid"
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
          bg="white">

          <Heading marginTop={5} as="h5" size="md">
            Asistencia de Aseguradora
          </Heading>

          <Stack marginTop={2}
            direction="row"
            spacing={2}
            align="center"
            paddingLeft={930}>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="facebook"
              variant="solid"
              onClick={onOpen}>
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
                  <Input placeholder="Nombre de la Asistencia"
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

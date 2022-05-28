/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  IAseguradora,
  IAsistencia,
  ICiudad,
  IServicio,
} from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { CiudadesService } from "@/services/ciudades.service";

import { useFormik } from "formik";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

import NuevoTicket from "@/forms/NuevoTicket.form";

function TicketNuevo() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DesktopLayout>
      <Header title={"Nuevo Ticket"} />

      {/*---------------------------------PUBLICACION TICKET--------------------------------*/}
      <NuevoTicket />
      {/* //------------------------------COTIZACION TECNICO------------------------------------- */}

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
        {/* <Text fontWeight="bold" fontSize="25px">
          Cotización del Técnico
        </Text>

        <Center>
          <Divider orientation="vertical" />

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="cotizacionTecnico">
              Solución y Cotización del Técnico
            </FormLabel>
            <Textarea variant="filled" placeholder="Aquí va el texto..." />
          </FormControl>
        </Center>

        <Center>
          <FormControl isRequired paddingTop={15} paddingRight={15}>
            <FormLabel htmlFor="horaDeContacto">Hora de Contacto</FormLabel>
            <Input
              variant="filled"
              id="horaDeContacto"
              type="time"
              placeholder="08:55 a.m."
              paddingLeft={5}
            />
          </FormControl>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="costoManoDeObra">
              Costo de Mano de Obra
            </FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="costoManoDeObra"
              placeholder="120.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="costoMateriales">Costo de Materiales</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="costoMateriales"
              placeholder="000.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="cotizaciónTecnico">
              Cotización Total del Técnico
            </FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="cotizaciónTecnico"
              placeholder="120.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" paddingTop={30} />
          <Box
            m={2}
            bgColor="white"
            padding={5}
            borderRadius={10}
            boxShadow="2xl"
            p="6"
            height={200}
            width={200}
          >
            <Image
              src=""
              alt="Evidencia justificacion del problema 1"
              paddingStart={8}
              paddingTop={16}
            />
          </Box>
          <Box
            m={2}
            bgColor="white"
            padding={5}
            borderRadius={10}
            boxShadow="2xl"
            p="6"
            height={200}
            width={200}
            paddingLeft={10}
          >
            <Image
              src=""
              alt="Evidencia justificacion del problema 2"
              paddingStart={8}
              paddingTop={16}
            />
          </Box>
        </Center>
      </Box>

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
        <Text fontWeight="bold" fontSize="25px">
          Citas
        </Text>

        <Button
          leftIcon={<AddIcon />}
          colorScheme="facebook"
          variant="solid"
          marginTop={15}
          marginLeft={900}
        >
          Nueva Cita
        </Button>

        <TableContainer marginTop={15}>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Citas</TableCaption>
            <Thead>
              <Tr>
                <Th>Título del Ticket</Th>
                <Th>Estatus</Th>
                <Th>Ultima actividad</Th>
                <Th>Creado</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Trabajo de Plomeria</Td>
                <Td>Activo</Td>
                <Td>Plomería en el Hogar</Td>
                <Td>Juan Perez</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

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
        <Text fontWeight="bold" fontSize="25px">
          Seguimiento
        </Text>



        <Button leftIcon={<AddIcon />} colorScheme='facebook' variant='solid' marginTop={15} marginLeft={850} onClick={onOpen}>
          Nuevo Seguimiento
        </Button>

        <TableContainer marginTop={15}>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Seguimiento</TableCaption>
            <Thead>
              <Tr>
                <Th>Asesor Grupo Lías</Th>
                <Th>Seguimiento</Th>
                <Th>Asesor de Seguro</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Juan Perez</Td>
                <Td>Alejandro Hernandez</Td>
                <Td>Enrique Zavala</Td>
                <Td>12/03/2022</Td>
                <Td>11:00 a.m.</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer> */}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Creación de Nuevo Seguimiento</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Asesor de Grupo Lías</FormLabel>
              <Input placeholder="Asesor de Grupo Lías" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Seguimiento</FormLabel>
              <Input placeholder="Seguimiento" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Asesor de Seguro</FormLabel>
              <Input placeholder="Asesor de Seguro" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Fecha</FormLabel>
              <Input variant="filled" type="date" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Hora</FormLabel>
              <Input variant="filled" id="horaLlamada" type="time" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Creación de Cita</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Título del Ticket</FormLabel>
              <Input placeholder="Título del Ticket" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Estatus</FormLabel>
              <Input placeholder="Estatus" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Ultima Actividad</FormLabel>
              <Input placeholder="Ultima Actividad" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Creado por</FormLabel>
              <Input placeholder="Creado por" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DesktopLayout>
  );
}

export default TicketNuevo;

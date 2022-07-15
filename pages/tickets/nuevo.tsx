/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

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

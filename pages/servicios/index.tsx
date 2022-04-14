import Header from "@/common/Header";
import Link from "next/link";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Box,
  Button,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  IconButton,
  EditableInput,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  useDisclosure,
  Editable,
  EditablePreview,
} from "@chakra-ui/react";
import {
  AddIcon,
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useState } from "react";

function ServiciosListado() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenedit,
    onOpen: onOpenedit,
    onClose: onCloseedit,
  } = useDisclosure();
  const [query, setQuery] = useState("");

  return (
    <DesktopLayout>
      <Header title={"Lista de servicios "} />
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
        <Box
          m={2}
          bgColor="white"
          padding={5}
          borderRadius={10}
          p="6"
          rounded="md"
          bg="white"
        >
          {" "}
          <Button
            onClick={onOpen}
            leftIcon={<AddIcon />}
            colorScheme="facebook"
            variant="solid"
            marginLeft={"80%"}
          >
            Nuevo servicio
          </Button>
        </Box >
        <Box marginLeft={"25%"}>
          
        <TableContainer  >
          <Table size={"sm"} variant="unstyled" colorScheme="teal">
            <TableCaption>Servicios</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Opciones</Th>              
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Asistencia Vial</Td>

                <Td>
                  <IconButton
                    onClick={onOpenedit}
                  
                    variant="ghost"
                    aria-label="edit"
                    icon={<EditIcon />}
                  /> <IconButton
            
                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<DeleteIcon color={"red"} />}
                  />

                </Td>
              </Tr>

              <Tr>
                <Td>promeria</Td>

                <Td>
                  <IconButton
                    onClick={onOpenedit}
                    variant="ghost"
                    aria-label="edit"
                    icon={<EditIcon />}
                  /> <IconButton
          
                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<DeleteIcon color={"red"} />}
                  />

                </Td>
              </Tr>
              <Tr>
                <Td>Electricista</Td>
                <Td>
                  <IconButton
                    onClick={onOpenedit}
                    variant="ghost"
                    aria-label="edit"
                    icon={<EditIcon />}
                  />

                  <IconButton

                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<DeleteIcon color={"red"} />}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        </Box>
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea una nuevo servicio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Nombre del servicio</FormLabel>
              <Input placeholder="Nombre del servicio" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenedit}
        onClose={onCloseedit}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar servicio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Nombre del servicio</FormLabel>
              <Input placeholder="Nombre del servicio" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onCloseedit}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DesktopLayout>
  );
}

export default ServiciosListado;

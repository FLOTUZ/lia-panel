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
} from "@chakra-ui/react";
import {
  AddIcon,
  AttachmentIcon,
  EditIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useState } from "react";


function ServiciosListado() {
  const { isOpen, onOpen, onClose } = useDisclosure();
 
  const [query, setQuery] = useState("");

  return <div>Listado de servicios
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
                Nueva aseguradora
              </Button>
          
        </Box>


        <TableContainer>
          <Table overflow={"auto"} size={
            "sm"} variant="unstyled" colorScheme="teal">
            <TableCaption>Servicios</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Asistencia vial</Td>
                <Td>
                  <Link href={""}>
                    <a>
                      <IconButton
                        onClick={onOpen}
                        variant="outline"
                        aria-label="edit"
                        icon={<EditIcon />}
                      />
                    </a>
                  </Link>
                </Td>
              </Tr>
              <Tr>
                <Td>promeria</Td>

                <Td>
                  {" "}
                  <IconButton
                    onClick={onOpen}
                    variant="outline"
                    aria-label="edit"
                    icon={<EditIcon />}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Electricista</Td>
                <Td>
                  <IconButton
                    onClick={onOpen}
                    variant="outline"
                    aria-label="edit"
                    icon={<EditIcon />}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar servicio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Nombre del servicio</FormLabel>
              <Input placeholder="Editar servicio" />
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
    </DesktopLayout>


  </div>;
}

export default ServiciosListado;

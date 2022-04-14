import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { AddIcon, AttachmentIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  Spacer,
  Stack,
  Switch,
  FormLabel,
  Text,
  InputGroup,
  InputLeftAddon,
  IconButton,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function UsuariosListado() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <DesktopLayout>
      <Header title={"Usuarios"} />
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
          <Link href={"/usuarios/nuevo"}>
            <a>
              {" "}
              <Button
                leftIcon={<AddIcon />}
                colorScheme="facebook"
                variant="solid"
                marginLeft={"80%"}
              >
                Nuevo usuario
              </Button>
            </a>
          </Link>
        </Box>

        <TableContainer>
          <Table variant="simple" colorScheme="teal">
            <TableCaption>Aseguradoras</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Estatus</Th>
                <Th>Rol</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Juan</Td>
                <Td>Guzman</Td>
                <Td><Badge colorScheme='green'>Activo</Badge></Td>
                <Td>Administrador</Td>
                <Td>
                  <Link href={"/usuarios/1"}>
                    <a>
                      <IconButton
                        variant="outline"
                        aria-label="edit"
                        icon={<EditIcon />}
                      />
                    </a>
                  </Link>
                  <IconButton

                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<AttachmentIcon color={"gray"} />}
                  />
                  <IconButton

                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<DeleteIcon color={"red"} />}
                  />



                </Td>


              </Tr>
              <Tr>
                <Td>Jose</Td>
                <Td>Guzman</Td>
                <Td><Badge colorScheme='green'>Activo</Badge></Td>
                <Td>Capturador</Td>

                <Td>
                  <Link href={"/usuarios/1"}>
                    <a>
                      <IconButton
                        variant="outline"
                        aria-label="edit"
                        icon={<EditIcon />}
                      />

                    </a>
                  </Link>
                  <IconButton

                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<AttachmentIcon color={"gray"} />}
                  />
                  <IconButton

                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<DeleteIcon color={"red"} />}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Fernando</Td>
                <Td>Torres</Td>
                <Td><Badge>Desabilitado</Badge>
                </Td>
                <Td>Administrador</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    aria-label="edit"
                    icon={<EditIcon />}

                  />
                  <IconButton

                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<AttachmentIcon color={"gray"} />}
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea una nueva asistencia</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Nombre de la asistencia</FormLabel>
              <Input placeholder="Nombre de la asistencia" />
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
  );
}

export default UsuariosListado;

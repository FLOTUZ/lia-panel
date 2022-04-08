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

export default function AseguradorasListado() {
  const { isOpen, onOpen, onClose } = useDisclosure();
    return (
    <div>
      Aseguradoras
      <DesktopLayout>
        <Header title={"Aseguradoras "} />
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
            <Link href={"/aseguradoras/nuevo"}>
              <a>
                {" "}
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="facebook"
                  variant="solid"
                  marginLeft={"80%"}
                >
                  Nueva aseguradora
                </Button>
              </a>
            </Link>
          </Box>


          <Box marginLeft= '25%' w='100%' p={4} >
            <InputGroup>
              <InputLeftAddon>
                <IconButton
                  disabled
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />{" "}
              </InputLeftAddon>

              <Input
                htmlSize={60}
                width="auto"
                type="text"
                placeholder="Buscar aseguradoras..."
                className="search"
              />
            </InputGroup>
          </Box>




          <TableContainer>
            <Table variant="simple" colorScheme="teal">
              <TableCaption>Aseguradoras</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Estatus</Th>
                  <Th>Ultima actividad</Th>
                  <Th>Asistencias</Th>
                  <Th>Creado</Th>
                  <Th>Ultima modificacion</Th>
                  <Th>Reportes</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Nombre</Td>
                  <Td>Estatus</Td>
                  <Td>Actividad</Td>
                  <Td>
                    {" "}
                    5{" "}
                    <IconButton
                      onClick={onOpen}
                      variant="ghost"
                      aria-label="add"
                      icon={<AddIcon />}
                    />
                  </Td>
                  <Td>creado</Td>
                  <Td>Modificacion</Td>
                  <Td>reportes</Td>
                  <Td>
                    <Link href={"/aseguradoras/1"}>
                      <a>
                        <IconButton
                          variant="outline"
                          aria-label="edit"
                          icon={<EditIcon />}
                        />
                      </a>
                    </Link>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Nombre</Td>
                  <Td>Estatus</Td>
                  <Td>Actividad</Td>
                  <Td>
                    1{" "}
                    <IconButton
                      variant="ghost"
                      onClick={onOpen}
                      aria-label="add"
                      icon={<AddIcon />}
                    />
                  </Td>
                  <Td>creado</Td>
                  <Td>Modificacion</Td>
                  <Td>reportes</Td>
                  <Td>
                    {" "}
                    <IconButton
                      variant="outline"
                      aria-label="edit"
                      icon={<EditIcon />}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Nombre</Td>
                  <Td>Estatus</Td>
                  <Td>Actividad</Td>
                  <Td>
                    1{" "}
                    <IconButton
                      variant="ghost"
                      onClick={onOpen}
                      aria-label="add"
                      icon={<AddIcon />}
                    />
                  </Td>
                  <Td>creado</Td>
                  <Td>Modificacion</Td>
                  <Td>reportes</Td>
                  <Td>
                    <IconButton
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
    </div >
  );
}
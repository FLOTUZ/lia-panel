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
  IconButton,
  InputRightAddon,
  Switch,
  EditableInput,
  Editable,
  EditablePreview,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";

function AseguradoraVer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <DesktopLayout>
        <Header title={"Editar aseguradora"} />

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
            <FormControl display="flex" alignItems="center">
              <FormLabel
                display="flex"
                alignItems="center"
                marginLeft={1280}
                htmlFor="isRequired"
              >
                {" "}
                Archivar:
              </FormLabel>
              <Switch id="isRequired" isRequired />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nombre">Nombre de la aseguradora</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdVerifiedUser color="green" />}
                />

                <Input type="Nombre" placeholder="Qualitas" />
                <InputRightAddon
                  pointerEvents="none"
                  children={<EditIcon color="green" />}
                />
              </InputGroup>
            </FormControl>

            <InputGroup>
              <FormControl>
                <FormLabel htmlFor="email">Correo</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input type="Email" placeholder="aseguradora@gmail.com" />
                  <InputRightAddon
                    pointerEvents="none"
                    children={<EditIcon color="green" />}
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <InputGroup>
              <FormControl>
                <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="gray.300" />}
                  />
                  <Input type="tel" placeholder="Phone number" />
                  <InputRightAddon
                    pointerEvents="none"
                    children={<EditIcon color="green" />}
                  />
                </InputGroup>
              </FormControl>
            </InputGroup>
          </Stack>
          <Stack marginTop={50} direction="row" spacing={4} align="center">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={onOpen}
            >
              Nueva Asistencia
            </Button>
          </Stack>
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Crea una nueva asistencia</ModalHeader>
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
          <Heading marginTop={30} as="h5" size="md">
            Asistencia de aseguradora
          </Heading>
          <TableContainer>
            <Table marginTop={50} size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    <IconButton
                      onClick={onOpen}
                      variant="outline"
                      aria-label="edit"
                      icon={<EditIcon />}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>{" "}
                  <Td>
                    <IconButton
                      onClick={onOpen}
                      variant="outline"
                      aria-label="edit"
                      icon={<EditIcon />}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
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

          <Stack marginTop={50} direction="row" spacing={4} align="center">
            <Button colorScheme="twitter" variant="solid">
              Guardar
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
      </DesktopLayout>
    </div>
  );
}

export default AseguradoraVer;

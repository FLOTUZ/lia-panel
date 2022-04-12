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
} from "@chakra-ui/react";
import { AddIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";

function AseguradoraNueva() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                  <Input type="Nombre" placeholder="Qualitas" />
                </InputGroup>
              </FormControl>
            </InputGroup>

            <InputGroup>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Correo</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input type="Email" placeholder="aseguradora@gmail.com" />
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
                  <Input type="tel" placeholder="Phone number" />
                </InputGroup>
              </FormControl>
            </InputGroup>
          </Stack>
          <Stack marginTop={50} direction="row" spacing={4} align="center">
            <Button colorScheme="twitter" variant="solid">
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
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </DesktopLayout>
    </div>
  );
}

export default AseguradoraNueva;

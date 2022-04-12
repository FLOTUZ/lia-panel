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
} from "@chakra-ui/react";
import { AddIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";

function TenicosListado() {
  return (
    <DesktopLayout>
      <Header title={"Técnicos "} />
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
          <Link href={"/tecnicos/nuevo"}>
            <a>
              {" "}
              <Button
                leftIcon={<AddIcon />}
                colorScheme="facebook"
                variant="solid"
                marginLeft={"80%"}
              >
                Nuevo Técnico
              </Button>
            </a>
          </Link>
        </Box>

        <InputGroup>
          <InputLeftAddon>
            <IconButton
              disabled
              colorScheme="blue"
              aria-label="Search database"
              icon={<SearchIcon />}
            />{" "}
          </InputLeftAddon>
          <Input type="search" placeholder="Buscar aseguradoras..." />
        </InputGroup>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Técnicos</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Servicios</Th>
                <Th>Estatus</Th>
                <Th>Ultima actividad</Th>
                <Th>Ciudad</Th>
                <Th>Telefono</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Pedro</Td>
                <Td>plomeria</Td>
                <Td>Disponible</Td>
                <Td>2022/04/06 11:09</Td>
                <Td>Morelia</Td>
                <Td>4433666666</Td>
                <Td>edit</Td>
              </Tr>
              <Tr>
                <Td>Juan</Td>
                <Td>Electricista</Td>
                <Td>Disponible</Td>
                <Td>2022/04/06 11:09</Td>
                <Td>Monterrey</Td>
                <Td>4433777777</Td>
                <Td>edit</Td>
              </Tr>
              <Tr>
                <Td>Esteban</Td>
                <Td>Asistencia Vial</Td>
                <Td>Disponible</Td>
                <Td>2022/04/06 11:09</Td>
                <Td>Guadalajara</Td>
                <Td>4433888888</Td>
                <Td>edit</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DesktopLayout>
  );
}

export default TenicosListado;

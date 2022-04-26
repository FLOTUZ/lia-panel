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
  useToast,
} from "@chakra-ui/react";
import { AddIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ITecnico } from "@/services/api.models";
import { TecnicoService } from "@/services/tecnicos.service";

function TenicosListado() {
  const toast = useToast();

  const [listadoTecnicos, setListadoTenicos] = useState<ITecnico[]>([]);

  useEffect(() => {
    const consultarTecnicos = async () => {
      const service = new TecnicoService();
      const respuesta = await service.getAll();

      if (respuesta.status != 200) {
      } else {
        const data = respuesta.data as ITecnico[];
        setListadoTenicos(data);
      }
    };

    consultarTecnicos();
  }, []);
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
          <Link href={"/usuarios/nuevo"}>
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
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Apellido Paterno</Th>
                <Th>Ciudad</Th>
                <Th>Telefono</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listadoTecnicos.length != 0 ? (
                listadoTecnicos.map((t, index) => {
                  <Tr key={index}>
                    <Td>{t.nombre}</Td>
                    <Td>{t.apellido_paterno}</Td>
                    <Td>{t.ciudadId}</Td>
                    <Td>{t.telefono}</Td>
                    <Td>edit</Td>
                  </Tr>;
                })
              ) : (
                <Tr>
                  <Td>No hay data</Td>
                </Tr>
              )}{" "}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DesktopLayout>
  );
}

export default TenicosListado;

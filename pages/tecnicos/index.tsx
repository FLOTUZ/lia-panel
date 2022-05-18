import Header from "@/common/Header";
import Link from "next/link";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ITecnico, ICiudad } from "@/services/api.models";
import { TecnicoService } from "@/services/tecnicos.service";

function TenicosListado() {
  const toast = useToast();
  const [query, setQuery] = useState("");

  const [listadoTecnicos, setListadoTenicos] = useState<ITecnico[]>([]);
  const [ciudadesList, setCiudadesList] = useState<ICiudad[]>([]);

  useEffect(() => {
    const consultarTecnicos = async () => {
      const service = new TecnicoService();
      const respuesta = await service.getAll();
      console.log(respuesta);

      if (respuesta.status == 200) {
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
                  return (
                    <Tr key={index}>
                      <Td>{t.nombre}</Td>
                      <Td>{t.apellido_paterno}</Td>
                      <Td>
                        {ciudadesList?.length !== 0
                          ? ciudadesList?.map((ciudad, index) => {
                              return (
                                <option key={index} value={ciudad.id}>
                                  {ciudad.nombre}
                                </option>
                              );
                            })
                          : null}
                          </Td>
                      <Td>{t.telefono}</Td>
                      <Td>
                        <IconButton

                          variant="ghost"
                          aria-label="edit"
                          icon={<EditIcon />}
                        />{" "}
                      </Td>
                    </Tr>
                  );
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

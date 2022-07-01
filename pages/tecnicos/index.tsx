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
  HStack,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ITecnico, IUsuario } from "@/services/api.models";
import { TecnicoService } from "@/services/tecnicos.service";
function TenicosListado() {
  const toast = useToast();
  const [query, setQuery] = useState("");

  const [listadoTecnicos, setListadoTenicos] = useState<ITecnico[]>([]);

  const consultarTecnicos = async () => {
    const service = new TecnicoService();
    const respuesta = await service.getAll();

    if (respuesta.status == 200) {
      const data = respuesta.data as ITecnico[];
      setListadoTenicos(data);
    }
  };
  useEffect(() => {
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
          <HStack spacing={4} w={"50%"}>
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
          </HStack>
        </Box>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Apellido Paterno</Th>
                <Th>Estado</Th>
                <Th>Ciudad</Th>
                <Th>Teléfono</Th>
                <Th>Servicio Principal</Th>
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
                      <Td>{t.ViveEn?.Estado?.nombre}</Td>
                      <Td>{t.ViveEn?.nombre}</Td>
                      <Td>{t.telefono}</Td>
                      <Td>{t.Servicio![0]?.nombre}</Td>

                      <Td>
                        <Link href={`/tecnicos/${t.id}`}>
                          <a>
                            <IconButton
                              variant="ghost"
                              aria-label="edit"
                              icon={<EditIcon />}
                            />{" "}
                          </a>
                        </Link>
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

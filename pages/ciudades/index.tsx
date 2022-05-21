import Header from "@/common/Header";
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
  Box,
  Button,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { EstadosService } from "@/services/estados.service";
import { IEstado } from "@/services/api.models";

function EstadosListado() {
  /*CONSULTA EN TABLA DE Estados*/

  const [listadoEstados, setListadoEstados] = useState<IEstado[]>([]);

  useEffect(() => {
    const consultarEstados = async () => {
      const estado = new EstadosService();
      const respuesta = await estado.getAll();
      const data = respuesta.data as IEstado[];

      if (respuesta.status == 200) {
        setListadoEstados(data);
      } else {
        console.log(respuesta);
      }
    };

    consultarEstados();
  }, []);

  //-------------------------------------------------------------------------------

  return (
    <DesktopLayout>
      <Header title={"Lista de Estados "} />

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
          <Link href={"/ciudades/nuevo"}>
             <Button
                leftIcon={<AddIcon />}
                colorScheme="facebook"
                variant="solid"
                marginLeft={"80%"}
             >
                Agregar Nuevo Estado
              </Button>
          </Link>
        </Box>
        <Box marginLeft={"1%"}>
          <TableContainer>
            <Table size={"md"} variant="simple" colorScheme="teal">
              <TableCaption>Estados</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nombre</Th>
                  <Th>Opciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listadoEstados.length != 0 ? (
                  listadoEstados.map((estado, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{estado.id}</Td>
                        <Td>{estado.nombre}</Td>
                        <Td>
                          <Link href={`/ciudades/${estado.id}`}>
                          <a>
                            <IconButton
                              variant="ghost"
                              aria-label="edit"
                              icon={<EditIcon />}
                            />
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
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </DesktopLayout>
  );
}

export default EstadosListado;

import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IUsuario } from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";
import {
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  useToast,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdPersonAdd } from "react-icons/md";

function UsuariosListado() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const toast = useToast();

  useEffect(() => {
    const consultaUsuarios = async () => {
      const servicio = new UsuariosService();
      const respuesta = await servicio.getAll();
      const data = respuesta.data as IUsuario[];

      if (respuesta.status != 200) {
        // toast({
        //   title: "Error de servidor",
        //   status: "error",
        // });
      } else {
        setUsuarios(data);
      }
    };
    consultaUsuarios();
  }, []);

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
          <HStack spacing={4} w={"50%"}>
            <Link href={"/usuarios/nuevo"}>
              <a>
                {" "}
                <Button
                  leftIcon={<MdPersonAdd />}
                  colorScheme="facebook"
                  variant="solid"
                >
                  Nuevo Usuario
                </Button>
              </a>
            </Link>
          </HStack>
        </Box>

        <TableContainer>
          <Table size={"md"} variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Usuario</Th>
                <Th>Estatus</Th>
                <Th>Rol</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usuarios.length == 0 ? (
                <Tr>
                  <Td>No hay data</Td>
                </Tr>
              ) : (
                usuarios.map((usuario, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{usuario.usuario}</Td>
                      <Td>
                        {usuario.inactivo ? (
                          <Badge colorScheme="yellow">INACTIVO</Badge>
                        ) : (
                          <Badge colorScheme="green">ACTIVO</Badge>
                        )}
                      </Td>
                      <Td>{usuario.rol}</Td>
                      <Td>
                        <Link href={`/usuarios/${usuario.id}`}>
                          <a>
                            <IconButton
                              variant="outline"
                              aria-label="edit"
                              icon={<EditIcon />}
                            />
                          </a>
                        </Link>

                        {/*<IconButton
                          variant="ghost"
                          aria-label="delet"
                          colorScheme={"red"}
                          icon={<AttachmentIcon color={"gray"} />}
                        />*/}

                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DesktopLayout>
  );
}

export default UsuariosListado;

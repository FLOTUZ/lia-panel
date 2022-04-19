import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IUsuario } from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";
import {
  AddIcon,
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
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
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function UsuariosListado() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

  const consultaUsuarios = async () => {
    const servicio = new UsuariosService();
    const respuesta = await servicio.listado();
    setUsuarios(respuesta);
  };

  useEffect(() => {
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
            <Thead>
              <Tr>
                <Th>Usuario</Th>
                <Th>Estatus</Th>
                <Th>Rol</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usuarios.map((usuario, index) => {
                return (
                  <Tr key={index}>
                    <Td>{usuario.usuario}</Td>
                    <Td>
                      {usuario.inactivo ? (
                        <Badge colorScheme="yellow">Archivado</Badge>
                      ) : (
                        <Badge colorScheme="green">Activo</Badge>
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
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DesktopLayout>
  );
}

export default UsuariosListado;

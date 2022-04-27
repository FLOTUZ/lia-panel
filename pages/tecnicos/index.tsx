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
  Input,
  InputLeftAddon,
  InputGroup,
  IconButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon,DeleteIcon,EditIcon, } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ITecnico } from "@/services/api.models";
import { TecnicoService } from "@/services/tecnicos.service";

function TenicosListado() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenedit,
    onOpen: onOpenedit,
    onClose: onCloseedit,
  } = useDisclosure();
  const [query, setQuery] = useState("");


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
                    <Td>
                    <IconButton
                    onClick={onOpenedit}
                    variant="ghost"
                    aria-label="edit"
                    icon={<EditIcon />}
                  /> <IconButton
          
                    variant="ghost"
                    aria-label="delet"
                    colorScheme={"red"}
                    icon={<DeleteIcon color={"red"} />}
                  />
                    </Td>
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

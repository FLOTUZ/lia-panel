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
  Box,
  Button,
  Input,
  InputLeftAddon,
  InputGroup,
  IconButton,
  FormControl,
  Stack,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { IAseguradoras, } from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";

export default function AseguradorasListado() {

  /*CONSULTA EN TABLA DE LAS ASEGURADORAS CON ASISTENCIAS */
  const [listadoAseguradoras, setListadoAseguradoras] = useState<IAseguradoras[]>([])
  useEffect(() => {
    const consultaAseguradoras = async () => {
      const services = new AseguradoraService();
      const respuesta = await services.getAll();
      const data = respuesta.data as IAseguradoras[];

      if (respuesta.status == 200) {
        setListadoAseguradoras(data);
      } else {
        console.log(respuesta)
      }
    };
    consultaAseguradoras();
  }, []);
  

  return (
    <DesktopLayout>
      <Header title={"Aseguradoras "} />
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
          <FormControl>
          <Stack
            paddingTop={10}
            direction={["column", "row"]} spacing="24px">

            <Link href={"/aseguradoras/nuevo"}>    
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="facebook"
                  variant="solid"
                  marginLeft={"80%"}
                >
                  Nueva Aseguradora
                </Button>
            </Link>
            </Stack>
          </FormControl>
        </Box>

        <Box  marginLeft="20%" padding={5}>
          <InputGroup>
            <InputLeftAddon>
              <IconButton
                disabled
                aria-label="Search database"
                icon={<SearchIcon />}
              />{" "}
            </InputLeftAddon>

            <Input
              htmlSize={60}
              width="auto"
              type="text"
              placeholder="Buscar aseguradoras..."
              className="search"
            />
          </InputGroup>
        </Box>

        <TableContainer padding={10}>
          <Table variant="simple" colorScheme="teal">
            <TableCaption>Aseguradoras</TableCaption>
            <Thead>
              <Tr>
                <Th>Nº</Th>
                <Th>Nombre</Th>
                <Th>Teléfono</Th>
                <Th>Km Max</Th>
                <Th>Costo Km</Th>
                <Th>Creado</Th>
                <Th> opciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listadoAseguradoras.length != 0 ? (
                listadoAseguradoras.map((aseguradoras, index) => {

                  return (
                    <Tr key={index} >
                      
                      <Td>{aseguradoras.id}</Td>
                      <Td>{aseguradoras.nombre}</Td>
                      <Td>{aseguradoras.telefono}</Td>
                      <Td>{aseguradoras.kilometraje_permitido}</Td>
                      <Td>{aseguradoras.costo_por_kilometro}</Td>
                      <Td>{aseguradoras.createdAt}</Td>
                      
                      <Td>
                      <Link href={`/aseguradoras/${aseguradoras.id}`}>
                          <a>
                            <IconButton
                              variant="outline"
                              aria-label="edit"
                              icon={<EditIcon />}
                            />
                          </a>
                        </Link>
                      </Td>
                    </Tr>
                  )
                })
              ) : (
                <Tr>
                  <Td>NO DATA</Td>
                </Tr>
              )
              }

            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DesktopLayout>
  );
}

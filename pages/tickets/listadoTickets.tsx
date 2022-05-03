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
  Box,
  Button,
  Input,
  InputLeftAddon,
  InputGroup,
  IconButton,
  FormControl,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  SearchIcon,
} from "@chakra-ui/icons";


export default function ListadoTickets() {

  
    return (
      <DesktopLayout>
        <Header title={"Tickets "} />
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
  
              <Link href={"/tickets/nuevo"}>
                <a>
                  {" "}
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="facebook"
                    variant="solid"
                    marginLeft={"80%"}
                  >
                    Nuevo Ticket
                  </Button>
                </a>
              </Link>
            </FormControl>
          </Box>
  
          <Box marginLeft="25%" p={4}>
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
                placeholder="Buscar ticket..."
                className="search"
              />
            </InputGroup>
          </Box>
  
          <TableContainer>
            <Table variant="simple" colorScheme="teal">
              <TableCaption>Tickets</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nº Expediente</Th>
                  <Th>Asesor de Grupo Lías</Th>
                  <Th>Nombre del Técnico</Th>
                  <Th>Fecha Inicial</Th>
                  <Th>Fecha de Término</Th>
                  <Th>Problema</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
  
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </DesktopLayout>
    );
  }
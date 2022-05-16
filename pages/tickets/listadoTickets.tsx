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
  Td,
  Tbody,
  Box,
  Button,
  Input,
  InputLeftAddon,
  InputGroup,
  IconButton,
  FormControl,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  SearchIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ITicket } from "@/services/api.models";
import { TicketsService } from "@/services/tickets.service";


export default function ListadoTickets() {

  /*LISTADO PARA LOS TICKETS*/
  const [listadoTickets, setListadoTickets] = useState<ITicket[]>([])
  useEffect(() => {
    const consultaTickets = async () => {
      const services = new TicketsService();
      const respuesta = await services.getAll();
      const data = respuesta.data as ITicket[];

      if (respuesta.status == 200) {
        setListadoTickets(data);
      } else {
        console.log(respuesta)
      }
    };
    consultaTickets();
  }, []);


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
                <Th>Título del Ticket</Th>
                <Th>Nombre del Técnico</Th>
                <Th>Fecha de Llamada</Th>
                <Th>Hora de Cierre</Th>
                <Th>Problematica</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listadoTickets.length != 0 ? (
                listadoTickets.map((ticket, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{ticket.num_expediente}</Td>
                      <Td>{ticket.titulo_ticket}</Td>
                      <Td>{ticket.nombre_usuario_final}</Td>
                      <Td>{ticket.fecha_llamada}</Td>
                      <Td>{ticket.hora_cierre}</Td>
                      <Td>{ticket.problematica}</Td>
                      <Td>
                        <Link href={`/tickets/${ticket.id}`}>
                          <a>
                            <IconButton
                              variant="outline"
                              aria-label="edit"
                              icon={<ViewIcon/>}
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
    </DesktopLayout >
  );
}
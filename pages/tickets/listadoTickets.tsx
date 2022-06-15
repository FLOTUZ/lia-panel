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
  IconButton,
  FormControl,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Stack,
} from "@chakra-ui/react";
import {
  AddIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ITicket } from "@/services/api.models";
import { TicketsService } from "@/services/tickets.service";
import { BsPrinter } from "react-icons/bs";
import Printer from "components/printer/printer";
import TicketImprimible from "components/imprimibles/ticket.imprimible";

import moment from 'moment';
moment.locale("es");
import 'moment-timezone'
import 'moment/locale/es';

export default function ListadoTickets() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

        <TableContainer>
          <Table variant="simple" colorScheme="teal">
            <TableCaption>Tickets</TableCaption>
            <Thead>
              <Tr>
                <Th>Nº Expediente</Th>
                <Th>Título del Ticket</Th>
                <Th>Nombre del Técnico</Th>
                <Th>Fecha de Llamada</Th>
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
                      <Td>{moment(Date.parse(ticket.fecha_llamada)).format("LLLL")}</Td>
                      <Td>{ticket.problematica}</Td>
                      <Td>

                        <IconButton
                          variant="outline"
                          aria-label="edit"
                          icon={<BsPrinter />}
                          onClick={onOpen}
                        />

                        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
                          <ModalOverlay/>
                          <ModalContent>
                            <ModalHeader>Impresión</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Printer doc={<TicketImprimible ticket={ticket} />} />
                            </ModalBody>
                            <ModalFooter>
                              <Stack
                                align="center"
                                paddingLeft={"60%"}
                                spacing={4}
                                direction="row"
                              >
                                <Button
                                  paddingLeft={10}
                                  paddingRight={10}
                                  colorScheme="red"
                                  variant="outline"
                                  onClick={onClose}
                                >
                                  Cerrar
                                </Button>
                              </Stack>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
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
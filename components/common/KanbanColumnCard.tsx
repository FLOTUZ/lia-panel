import { IAseguradora, IServicio, ITicket } from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { ServiciosService } from "@/services/servicios.service";
import {
  Text,
  Container,
  Heading,
  HStack,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IKanbanColumnCard {
  ticket: ITicket;
}
const KanbanColumnCard = ({
  ticket,
}: IKanbanColumnCard): React.ReactElement => {
  const [aseguradora, setAseguradora] = useState<IAseguradora>();
  const [servicio, setServicio] = useState<IServicio>();

  useEffect(() => {
    /*Obtener aseguradora*/
    const getAseguradora = async () => {
      const service = new AseguradoraService();
      const respuesta = await service.getById(Number(ticket?.aseguradoraId));
      const data = respuesta.data as IAseguradora;
      setAseguradora(data);
    };
    /*Obtener servicio*/
    const getServicio = async () => {
      const service = new ServiciosService();
      const respuesta = await service.getById(Number(ticket.tecnicoId));
      const data = respuesta.data as IServicio;
      setServicio(data);
    };

    getAseguradora();
    getServicio();
  }, [ticket]);

  return (
    <Link href={`/tickets/${ticket.id}`}>
      <a>
        <Container
          my={1}
          h={"fit-content"}
          bgColor="white"
          p={2}
          borderRadius={10}
          _hover={{
            shadow: "lg",
            borderColor: "gray",
            bgColor: "black",
            color: "white",
          }}
        >
          <HStack>
            <Text fontWeight={"bold"}>Expediente:</Text>
            <Text>{ticket.num_expediente}</Text>
          </HStack>

          <Heading size={"sm"}>
            {ticket.titulo_ticket.length > 30
              ? `${ticket.titulo_ticket.substring(0, 30)}...`
              : `${ticket.titulo_ticket.substring(0, 30)}`}
          </Heading>
          <Tooltip
            placement="right"
            hasArrow
            bg={"gray.300"}
            color={"black"}
            label={ticket.problematica}
          >
            <Text isTruncated={true}>{ticket.problematica}</Text>
          </Tooltip>

          <HStack>
            <Text fontWeight={"bold"}>Aseguradora:</Text>
            <Text>{aseguradora?.nombre}</Text>
          </HStack>

          <HStack>
            <Text fontWeight={"bold"}>Usuario:</Text>
            <Text>{ticket.nombre_usuario_final}</Text>
          </HStack>

          {ticket.estado == "FINALIZADO" && ticket.is_facturado ? (
            <Flex
              w={"100%"}
              padding={1}
              bgColor={"whatsapp.500"}
              justifyContent="center"
              borderRadius={"base"}
            >
              <Text color={"white"} fontWeight="bold">
                Facturación Realizada
              </Text>
            </Flex>
          ) : null}

          {/* {ticket.tecnico ? (
            <HStack>
              <Text fontWeight={"bold"}>Tecnico:</Text>
              <Text>{ticket.tecnico}</Text>
            </HStack>
          ) : null} */}
        </Container>
      </a>
    </Link>
  );
};

export default KanbanColumnCard;

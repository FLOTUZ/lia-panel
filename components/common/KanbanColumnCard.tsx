import { IAseguradoras, ITicket } from "@/services/api.models";
import { Text, Container, Heading, HStack, Tooltip } from "@chakra-ui/react";
import Link from "next/link";


interface IKanbanColumnCard {
  ticket: ITicket;
  aseguradoras: IAseguradoras;
}
const KanbanColumnCard = ({
  ticket, aseguradoras,
}: IKanbanColumnCard): React.ReactElement => {
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
          <Heading size={"sm"}>{ticket.titulo_ticket}</Heading>
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
            <Text>{ticket.aseguradoraId}</Text>
          </HStack>
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

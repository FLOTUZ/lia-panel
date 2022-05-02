import KanbanColumn from "@/common/KanbanColumn";
import KanbanColumnCard from "@/common/KanbanColumnCard";
import { ITicket } from "@/services/api.models";
import { TicketsService } from "@/services/tickets.service";
import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IKanban {}

const Kanban = ({}: IKanban) => {
  const [ticketsList, setTicketsList] = useState<ITicket[]>([]);
  useEffect(() => {
    const consultarTickets = async () => {
      const servicio = new TicketsService();
      const respuesta = await servicio.getAll();
      const data = respuesta.data as ITicket[];
      setTicketsList(data);
    };
    consultarTickets();
  }, []);



  const nuevosTickets: ITicket[] = ticketsList.filter((e: any) => {
    return e.estado === "NUEVO";
  });

  const aAprobar: ITicket[] = ticketsList.filter((e: any) => {
    return e.estado === "APROBAR";
  });

  const enProceso: ITicket[] = ticketsList.filter((e: any) => {
    return e.estado === "PROCESO";
  });

  const aCerrar: ITicket[] = ticketsList.filter((e: any) => {
    return e.estado === "CERRAR";
  });

  const finalizados: ITicket[] = ticketsList.filter((e: any) => {
    return e.estado === "FINALIZADO";
  });

  return (
    <>
      <Grid
        h="94vh"
        templateRows="repeat(10, 1fr)"
        templateColumns={"repeat( 5, 1fr)"}
        overflow="overlay"
        p={2}
        columnGap={2}
      >
        <KanbanColumn colorGridBg={"green"} columnName={"Nuevos"}>
          {nuevosTickets.map((ticket, index) => {
            return <KanbanColumnCard key={index} ticket={ticket} />;
          })}
        </KanbanColumn>
        <KanbanColumn colorGridBg={"purple"} columnName={"A aprobar"}>
          {aAprobar.map((ticket, index) => {
            return <KanbanColumnCard key={index} ticket={ticket} />;
          })}
        </KanbanColumn>
        <KanbanColumn colorGridBg={"bisque"} columnName={"En proceso"}>
          {enProceso.map((ticket, index) => {
            return <KanbanColumnCard key={index} ticket={ticket} />;
          })}
        </KanbanColumn>
        <KanbanColumn colorGridBg={"blue"} columnName={"A cerrar"}>
          {aCerrar.map((ticket, index) => {
            return <KanbanColumnCard key={index} ticket={ticket} />;
          })}
        </KanbanColumn>
        <KanbanColumn colorGridBg={"red"} columnName={"Finalizados"}>
          {finalizados.map((ticket, index) => {
            return <KanbanColumnCard key={index} ticket={ticket} />;
          })}
        </KanbanColumn>
      </Grid>
    </>
  );
};

export default Kanban;

import KanbanColumn from "@/common/KanbanColumn";
import KanbanColumnCard from "@/common/KanbanColumnCard";
import { ITicket } from "@/services/api.models";
import { Grid } from "@chakra-ui/react";

interface IKanban {}

const Kanban = ({}: IKanban) => {
  const tickets: ITicket[] = [
    {
      id: 1,
      estado: "NUEVO",
      titulo: "MECANICO KM 99 Salida Quiroga",
      descripcion: "Auto BMW con llanta pinchada",
      aseguradora: "IKE",
      tecnico: "",
    },
    {
      id: 2,
      estado: "APROBAR",
      titulo: "HANDY MAN para montar television",
      descripcion: 'Montar TV de 70" en la cafeteria San Diego',
      aseguradora: "AXA",
      tecnico: "Juan Morales",
    },
    {
      id: 3,
      estado: "PROCESO",
      titulo: "ELECTRICISTA en Hotel Alameda",
      descripcion: "Tendido de cable para camaras de CCTV",
      aseguradora: "SPV",
      tecnico: "Rodigo Macias",
    },
    {
      id: 4,
      estado: "CERRAR",
      titulo: "PLOMERIA restaurante la mansion",
      descripcion: "Galon con 10lts de gasolina",
      aseguradora: "Telemedic",
      tecnico: "",
    },
  ];

  const nuevosTickets: ITicket[] = tickets.filter((e: any) => {
    return e.estado === "NUEVO";
  });

  const aAprobar: ITicket[] = tickets.filter((e: any) => {
    return e.estado === "APROBAR";
  });

  const enProceso: ITicket[] = tickets.filter((e: any) => {
    return e.estado === "PROCESO";
  });

  const aCerrar: ITicket[] = tickets.filter((e: any) => {
    return e.estado === "CERRAR";
  });

  const finalizados: ITicket[] = tickets.filter((e: any) => {
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

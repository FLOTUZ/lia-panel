import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";
import { Button, Box, SimpleGrid, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";

function TicketsListado() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Tickets" />

        <SimpleGrid
          margin={"20px"}
          columns={[1, 1, 3]}
          spacing={5}
          width="fit-content"
        >
          <Button
            leftIcon={<ViewIcon />}
            colorScheme="facebook"
            variant="solid"
            w={"fit-content"}
            onClick={() => {
              router.push("/tickets/listadoTickets");
            }}
          >
            Ver Tickets
          </Button>

          <Button
            leftIcon={<AddIcon />}
            colorScheme="facebook"
            variant="solid"
            w={"fit-content"}
            onClick={() => {
              router.push("/tickets/nuevo");
            }}
          >
            Nuevo Ticket
          </Button>
        </SimpleGrid>

        <Kanban />
      </DesktopLayout>
    </>
  );
}

export default TicketsListado;

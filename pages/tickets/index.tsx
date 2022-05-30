import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";
import { Button, HStack, Box, SimpleGrid, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";

function TicketsListado() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Tickets" />

        <Box>
          <SimpleGrid columns={[1, 2, 5]} spacing='10px'>
            <Button
              leftIcon={<ViewIcon />}
              colorScheme="facebook"
              variant="solid"
              width={150}
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
              width={150}
              onClick={() => {
                router.push("/tickets/nuevo");
              }}
            >
              Nuevo Ticket
            </Button>
          </SimpleGrid>
        </Box>
        <Kanban />
      </DesktopLayout>
    </>
  );
}

export default TicketsListado;

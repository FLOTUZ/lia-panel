import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";
import { Button, Box, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";

function TicketsListado() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Tickets" />

        <Box>
          <SimpleGrid margin={"20px"} columns={[1, 2, 5]} spacing='10px'>
            <Button
              leftIcon={<ViewIcon />}
              colorScheme="facebook"
              variant="solid"
              width={250}
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
              width={250}
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

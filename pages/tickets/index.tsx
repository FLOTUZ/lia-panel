import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";
import {
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";

function TicketsListado() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Tickets" />

        <HStack>
        <Box
            paddingTop={5}
            paddingLeft={2}>
            <Button
              leftIcon={<ViewIcon/>}
              colorScheme="facebook"
              variant="solid"
              onClick={() => {
                router.push("/tickets/listadoTickets");
              }}>
              Ver Tickets
            </Button>
          </Box>
          <Box
            paddingTop={5}
            paddingLeft={15}>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="facebook"
              variant="solid"
              onClick={() => {
                router.push("/tickets/nuevo");
              }}>
              Nuevo Ticket
            </Button>
          </Box>

         

        </HStack>
        <Kanban />
      </DesktopLayout>
    </>
  );
}

export default TicketsListado;

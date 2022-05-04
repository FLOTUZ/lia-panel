import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";
import {
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AddIcon } from "@chakra-ui/icons";

function TicketsListado() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Tickets" />
        <HStack>

          <Box
            paddingTop={5}
            paddingLeft={1020}>
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

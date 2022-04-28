import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";
import { Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

function TicketsListado() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <HStack>
          <Header title="Tickets" />
          <Button
            colorScheme={"blue"}
            onClick={() => {
              router.push("/tickets/nuevo");
            }}
          >
            Nuevo
          </Button>
        </HStack>
        <Kanban />
      </DesktopLayout>
    </>
  );
}

export default TicketsListado;

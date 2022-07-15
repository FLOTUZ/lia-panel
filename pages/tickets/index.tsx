import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";
import { Button, IconButton, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AddIcon } from "@chakra-ui/icons";
import { BsList } from "react-icons/bs";
import Link from "next/link";

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
          <Link href={"/tickets/listadoTickets"}>
            <a>
              <Button
                leftIcon={<BsList color="white" size={20} />}
                colorScheme="facebook"
                variant="solid"
                w={"fit-content"}
              >
                Listado de tickets
              </Button>
            </a>
          </Link>

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

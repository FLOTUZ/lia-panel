import Kanban from "@/layouts/Kanban";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";

function TicketsListado() {
 

  return (
    <>
      <DesktopLayout>
        <Header title="Tickets" />
        <Kanban />
      </DesktopLayout>
    </>
  );
}

export default TicketsListado;

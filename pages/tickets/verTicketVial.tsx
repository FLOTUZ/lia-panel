import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";

import { useRouter } from "next/router";


function VerTicketVial() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Ticket de servicio vial" />

        
      </DesktopLayout>
    </>
  );
}

export default VerTicketVial;
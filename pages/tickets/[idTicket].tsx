import CrearCotizacionTecnico from "@/forms/CotizacionTecnicoForm";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IAseguradora, IAsistencia, IServicio, ITicket } from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { TicketsService } from "@/services/tickets.service";
import { VerTicketDomestico } from "@/views/VerTicketDomestico";
import { VerTicketDomesticoForaneo } from "@/views/VerTicketDomesticoForaneo";
import { VerTicketVial } from "@/views/VerTicketVial";
import { VerTicketVialForaneo } from "@/views/VerTicketVialForaneo";


import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

function TicketVer() {

    const router = useRouter();
    const [ticket, setTicket] = useState<ITicket>();
    const [aseguradora, setAseguradora] = useState<IAseguradora>();
    const [asistencia, setAsistencia] = useState<IAsistencia>();

    const [tipoVista, setTipoVista] = useState<JSX.Element>()

    const { idTicket } = router.query;
    /*Obtener aseguradora*/
    const getAseguradora = async () => {
        const service = new AseguradoraService();
        const respuesta = await service.getById(Number(ticket?.aseguradoraId));
        const data = respuesta.data as IAseguradora;
        setAseguradora(data);
    }

    /*Obtener asistencias*/
    const getAsistencia = async () => {
        const service = new AsistenciasService();
        const respuesta = await service.getById(Number(ticket?.asistenciaId));
        const data = respuesta.data as IAsistencia;
        setAsistencia(data);

    }
    const getTicket = async () => {
        const service = new TicketsService();
        const respuesta = await service.getById(Number(idTicket));
        const data = respuesta.data as ITicket;

        setTicket(data);
    };

    /*Obtener ticket*/

    useEffect(() => {
        getTicket();
    }, [])

    useEffect(() => {
        getAsistencia();
        getAseguradora();
        getVista();
    }, [ticket])

    const getVista = () => {
        if (ticket?.asistencia_vial && ticket?.is_servicio_foraneo) {
            setTipoVista(< VerTicketVialForaneo ticket={ticket} aseguradora={aseguradora!} asistencia={asistencia!} />)
        }

        else if (ticket?.asistencia_vial) {
            setTipoVista(<VerTicketVial ticket={ticket} aseguradora={aseguradora!} asistencia={asistencia!} />)
        }

        else if (ticket?.is_servicio_domestico) {
            setTipoVista(< VerTicketDomestico ticket={ticket} aseguradora={aseguradora!} asistencia={asistencia!} />)
        }

        else if (ticket?.is_servicio_domestico && ticket?.is_servicio_foraneo) {
            setTipoVista(< VerTicketDomesticoForaneo ticket={ticket} aseguradora={aseguradora!} asistencia={asistencia!} />)
        }
        else {
            setTipoVista(<></>)
        }

    }

    return (
        <DesktopLayout>

            {tipoVista}

        </DesktopLayout>
    );
}


export default TicketVer;
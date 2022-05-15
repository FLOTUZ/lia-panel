import Header from "@/common/Header";
import ViewText from "@/common/ViewText";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IAseguradoras, IAsistencias, IServicio, ITicket } from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { ServiciosService } from "@/services/servicios.service";
import { TicketsService } from "@/services/tickets.service";

import {
    AddIcon,

} from '@chakra-ui/icons'

import {
    Box,
    Divider,
    FormControl,
    FormLabel,
    Text,
    Center,
    Stack,
    Switch,
    Image,
    Button,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useDisclosure,
    Input,
    SimpleGrid,

} from "@chakra-ui/react";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

function TicketVer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const [ticket, setTicket] = useState<ITicket>();
    const [aseguradora, setAseguradora] = useState<IAseguradoras>();
    const [asistencias, setAsistencias] = useState<IAsistencias>();



    /*Obtener ticket*/
    const { idTicket } = router.query;

    useEffect(() => {
        const getTicket = async () => {
            const service = new TicketsService();
            const respuesta = await service.getById(Number(idTicket));
            const data = respuesta.data as ITicket;

            setTicket(data);
        };

        getTicket();
    }, [])



    useEffect(() => {
        /*Obtener aseguradora*/
        const getAseguradora = async () => {
            const service = new AseguradoraService();
            const respuesta = await service.getById(Number(ticket?.aseguradoraId));


            const data = respuesta.data as IAseguradoras;


            setAseguradora(data);
        }

        /*Obtener asistencias*/
        const getAsistencias = async () => {
            const service = new AsistenciasService();
            const respuesta = await service.getById(Number(ticket?.asistenciaId));


            const data = respuesta.data as IAsistencias;


            setAsistencias(data);

        }
        getAsistencias();

        getAseguradora();

    }, [ticket])





    return (
        <DesktopLayout>

            <Header title={"Ver Ticket"} />

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Datos Básicos </Text>

                {/*Datos básicos*/}
                <Stack
                    direction='row'
                    paddingTop={15}
                    marginLeft="1300px">
                    <ViewText
                        id_form="num_expediente"
                        form_label="Numero de Expediente:">
                        {ticket?.num_expediente}
                    </ViewText>
                </Stack>


                <Box marginRight={780}>
                    <ViewText
                        form_label="Fecha de la Llamada"
                        id_form="fecha_llamada">
                        {ticket?.fecha_llamada}
                    </ViewText>
                </Box>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <ViewText
                        id_form="nombre_asesor_gpo_lias"
                        form_label="Asesor de Grupo Lías">
                        {ticket?.nombre_asesor_gpo_lias}
                    </ViewText>

                    <ViewText
                        id_form="nombre_asesor_aseguradora"
                        form_label="Asesor de Aseguradora">
                        {ticket?.nombre_asesor_aseguradora}
                    </ViewText>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <ViewText
                        id_form="nombre_usuario_final"
                        form_label="Nombre del Usuario Final">
                        {ticket?.nombre_usuario_final}
                    </ViewText>

                    <ViewText
                        id_form="nombre_usuario_final"
                        form_label="Descripción corta del Ticket">
                        {ticket?.titulo_ticket}
                    </ViewText>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <ViewText
                        id_form="aseguradora"
                        form_label="Aseguradora">
                        {aseguradora?.nombre}
                    </ViewText>

                    <ViewText
                        id_form="asistencia"
                        form_label="Asistencia">
                        {asistencias?.nombre}
                    </ViewText>
                </SimpleGrid>

                <ViewText
                    id_form="problematica"
                    form_label="Descripción de la Problemática">
                    {ticket?.problematica}
                </ViewText>
            </Box>

            {/* Cotización de grupo Lías */}
            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Cotización de Grupo Lías </Text>

                <SimpleGrid columns={[1, 1, 3]} spacing={5}>
                    <ViewText
                        id_form="is_servicio_domestico"
                        form_label="Servicio Doméstico">
                        {ticket?.is_servicio_domestico}
                    </ViewText>

                    <ViewText
                        id_form="asistencia_vial"
                        form_label="Servicio Víal">
                        {ticket?.asistencia_vial}
                    </ViewText>

                    <ViewText
                        id_form="is_servicio_foraneo"
                        form_label="Servicio Foráneo">
                        {ticket?.is_servicio_foraneo}
                    </ViewText>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 5]} spacing={4}>
                    <ViewText
                        id_form="ciudad"
                        form_label="Ciudad">
                        {ticket?.ciudad}
                    </ViewText>

                    <ViewText
                        id_form="colonia"
                        form_label="Colonia">
                        {ticket?.colonia}
                    </ViewText>

                    <ViewText
                        id_form="calle"
                        form_label="Calle">
                        {ticket?.calle}
                    </ViewText>

                    <ViewText
                        id_form="num_interior"
                        form_label="N° de Domicilio Interior">
                        {ticket?.num_interior}
                    </ViewText>

                    <ViewText
                        id_form="numero_domicilio"
                        form_label="N° de Domicilio Exterior">
                        {ticket?.numero_domicilio}
                    </ViewText>
                </SimpleGrid>


                <SimpleGrid columns={[1, 1, 2]} spacing={4}>
                    <ViewText
                        id_form="cobertura"
                        form_label="Monto de Cobertura del Seguro">
                        {ticket?.cobertura}
                    </ViewText>

                    <ViewText
                        id_form="costo_gpo_lias"
                        form_label="Costo Grupo Lías">
                        {ticket?.costo_gpo_lias}
                    </ViewText>
                </SimpleGrid>

                {/* SOLO SI ES SERVICIO FORANEO*/}
                <SimpleGrid columns={[1, 1, 2]} spacing={4}>
                    <ViewText
                        id_form="kilometraje"
                        form_label="Kilómetros a Recorrer">
                        {ticket?.kilometraje}
                    </ViewText>

                    <ViewText
                        id_form="costo_de_kilometraje"
                        form_label="Costo por Kilómetro">
                        {ticket?.costo_de_kilometraje}
                    </ViewText>
                </SimpleGrid>

                {/* SÓLO SI ES SERVICIO VÍAL */}
                <SimpleGrid columns={[1, 1, 4]} spacing={4}>
                    <ViewText
                        id_form="modelo_carro"
                        form_label="Módelo del Carro">
                        {ticket?.modelo_carro}
                    </ViewText>

                    <ViewText
                        id_form="placas_carro"
                        form_label="Placas">
                        {ticket?.placas_carro}
                    </ViewText>

                    <ViewText
                        id_form="color_carro"
                        form_label="Color">
                        {ticket?.color_carro}
                    </ViewText>

                    <ViewText
                        id_form="marca_carro"
                        form_label="Marca">
                        {ticket?.marca_carro}
                    </ViewText>
                </SimpleGrid>

                {/* SOLO SI ES SERVICIO FORANEO */}
                <SimpleGrid columns={[1, 1, 3]} spacing={4}>
                    <ViewText
                        id_form="casetas"
                        form_label="Número de casetas">
                        {ticket?.casetas}
                    </ViewText>

                    <ViewText
                        id_form="costo_por_caseta"
                        form_label="Costo por Caseta">
                        {ticket?.costo_por_caseta}
                    </ViewText>

                    <ViewText
                        id_form="banderazo"
                        form_label="Banderazo">
                        {ticket?.banderazo}
                    </ViewText>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 4]} spacing={4}>
                    <ViewText
                        id_form="deducible"
                        form_label="Deducible">
                        {ticket?.deducible}
                    </ViewText>

                    <ViewText
                        id_form="anticipo"
                        form_label="Anticipo 60%">
                        {ticket?.anticipo}
                    </ViewText>

                    <ViewText
                        id_form="total_salida"
                        form_label="Total de Salida">
                        {ticket?.total_salida}
                    </ViewText>

                    <ViewText
                        id_form="total"
                        form_label="Monto Total">
                        {ticket?.total}
                    </ViewText>
                </SimpleGrid>

                <ViewText
                    id_form="cotizacion_gpo_lias"
                    form_label="Cotización de Grupo Lías (Información Adicional)">
                    {ticket?.cotizacion_gpo_lias}
                </ViewText>
            </Box>

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Cotización del Técnico</Text>

                <ViewText
                    id_form="solucion_cotizacion_del_tecnico"
                    form_label="Solución y Cotización del Técnico">
                    { }
                </ViewText>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <ViewText
                        id_form="hora_de_contacto"
                        form_label=">Fecha y Hora de Contacto">
                        {ticket?.fecha_llamada}
                    </ViewText>

                    <ViewText
                        id_form="hora_de_cierre"
                        form_label=">Hora de Cierre">
                        {ticket?.hora_cierre}
                    </ViewText>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <ViewText
                        id_form="costo_de_mano_de_obra"
                        form_label="Costo de Mano de Obra">
                        { }
                    </ViewText>

                    <ViewText
                        id_form="costo_de_materiales"
                        form_label="Costo de Materiales">
                        { }
                    </ViewText>
                </SimpleGrid>

                <Center>
                    <Divider orientation='vertical' paddingTop={30} />
                    <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200}>
                        <Image src='' alt='Evidencia 1' paddingStart={8} paddingTop={16} />
                    </Box>
                    <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200} paddingLeft={10}>
                        <Image src='' alt='Evidencia 2' paddingStart={8} paddingTop={16} />
                    </Box>
                </Center>
            </Box>


            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Citas</Text>


                <TableContainer marginTop={15}>
                    <Table variant='striped' colorScheme='teal'>
                        <TableCaption>Citas</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Título del Ticket</Th>
                                <Th>Estatus</Th>
                                <Th>Ultima actividad</Th>
                                <Th>Creado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Trabajo en el Hogar</Td>
                                <Td>Activo</Td>
                                <Td>Plomería en el Hogar</Td>
                                <Td>Juan Perez</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Seguimiento</Text>

                <TableContainer marginTop={15}>
                    <Table variant='striped' colorScheme='teal'>
                        <TableCaption>Seguimiento</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Asesor Grupo Lías</Th>
                                <Th>Seguimiento</Th>
                                <Th>Asesor de Seguro</Th>
                                <Th>Fecha</Th>
                                <Th>Hora</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Juan Perez</Td>
                                <Td>Alejandro Hernandez</Td>
                                <Td>Enrique Zavala</Td>
                                <Td>12/03/2022</Td>
                                <Td>11:00 a.m.</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                {/*<Button colorScheme="blue" marginLeft={1050}>Editar</Button>*/}
            </Box>

        </DesktopLayout>
    );
}


export default TicketVer;
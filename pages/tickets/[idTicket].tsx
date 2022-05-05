import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IAseguradoras, IAsistencias, ITicket } from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
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
        }
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

                <Stack direction='row' paddingTop={15}>
                    <Divider orientation='vertical' paddingLeft={700} />
                    <FormLabel htmlFor='nExpediente'>Numero de Expediente:</FormLabel>
                    <Text marginLeft={20}>{ticket?.num_expediente}</Text>


                    <FormControl paddingTop={2} paddingLeft={2} >
                        <Stack align='center' direction='row'>
                            <Divider orientation='vertical' />
                            <FormLabel htmlFor='asistenciaVial'>Asistencia Vial</FormLabel>
                            <Switch size='md' />
                        </Stack>
                    </FormControl>
                </Stack>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15.5}>
                        <FormLabel htmlFor='horaLlamada'>Hora y Fecha de la Llamada</FormLabel>
                        <Text marginLeft={5}>{ticket?.fecha_llamada}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />

                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='asesorGpoLias'>Asesor de Gpo. Lías</FormLabel>
                        <Text marginLeft={5}>{ticket?.nombre_asesor_gpo_lias}</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='asesorAseguradora'>Asesor de Aseguradora</FormLabel>
                        <Text marginLeft={5}>{ticket?.nombre_asesor_aseguradora}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='nombreUsuarioFinal'>Nombre del Usuario Final</FormLabel>
                        <Text marginLeft={5}>{ticket?.nombre_usuario_final}</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='tituloTicket'>Título del Ticket</FormLabel>
                        <Text marginLeft={5}>{ticket?.titulo_ticket}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15} >
                        <FormLabel htmlFor='seguro'>Seguro</FormLabel>
                        <Text marginLeft={5}>{aseguradora?.nombre}</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='asistencia'>Asistencia</FormLabel>
                        <Text marginLeft={5}>{asistencias?.nombre }</Text>
                    </FormControl>
                </Center>

                <FormControl paddingTop={15}>
                    <FormLabel htmlFor='descripcion'>Descripción de la Problematica</FormLabel>
                    <Text marginLeft={5}>{ticket?.problematica}</Text>
                </FormControl>
            </Box>


            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Cotización de Grupo Lías </Text>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='ciudad'>Ciudad</FormLabel>
                        <Text marginLeft={5}>{ticket?.ciudad}</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='colonia'>Colonia</FormLabel>
                        <Text marginLeft={5}>{ticket?.colonia}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='calle'>Calle</FormLabel>
                        <Text marginLeft={5}>{ticket?.calle}</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='numeroDomicilio'>Número del Domicilio</FormLabel>
                        <Text marginLeft={5}>{ticket?.numero_domicilio}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='banderazo'>Banderazo</FormLabel>
                        <Text marginLeft={5}>{ticket?.banderazo}</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='totalSalida'>Total de Salida</FormLabel>
                        <Text marginLeft={5}>{ticket?.total_salida}0</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='montoSeguro'>Monto de Cobertura del Seguro</FormLabel>
                        <Text marginLeft={5}>{ticket?.cobertura}</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='costoGpoLias'>Costo Grupo Lías</FormLabel>
                        <Text marginLeft={5}>{ticket?.costo_gpo_lias}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='deducible'>Deducible</FormLabel>
                        <Text marginLeft={5}>{ticket?.deducible}</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='kilometros'>Kilometros a Recorrer</FormLabel>
                        <Text marginLeft={5}>{ticket?.kilometraje}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor='total'>Total</FormLabel>
                        <Text marginLeft={5}>{ticket?.total}</Text>
                    </FormControl>

                    <FormControl isRequired paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='anticipo'>Anticipo 60%</FormLabel>
                        <Text marginLeft={5}>{ticket?.anticipo}</Text>
                    </FormControl>
                </Center>
            </Box>

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Cotización del Técnico</Text>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='cotizacionGpoLias'>Cotización de Grupo Lías</FormLabel>
                        <Text marginLeft={5}>{ticket?.cotizacion_gpo_lias}</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='cotizacionTecnico'>Solución y Cotización del Técnico</FormLabel>
                        <Text marginLeft={5}>{}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='horaDeContacto'>Hora de Contacto</FormLabel>
                        <Text marginLeft={5}>{}</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='horaDeCierre'>Hora de Cierre</FormLabel>
                        <Text marginLeft={5}>{ticket?.hora_cierre}</Text>
                    </FormControl>

                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='costoManoDeObra'>Costo de Mano de Obra</FormLabel>
                        <Text marginLeft={5}>{}</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='costoMateriales'>Costo de Materiales</FormLabel>
                        <Text marginLeft={5}>{}</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                    <FormLabel htmlFor='casetas'>Número de Casetas</FormLabel>
                        <Text marginLeft={5}>{ticket?.casetas}</Text>
                    </FormControl>

                </Center>

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
                <Button colorScheme="blue" marginLeft={1050}>Editar</Button>
            </Box>




        </DesktopLayout >
    );
}


export default TicketVer;
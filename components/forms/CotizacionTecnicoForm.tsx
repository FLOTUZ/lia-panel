import ViewText from "@/common/ViewText";
import { Box, Center, Divider, SimpleGrid, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Image from "next/image";



const CrearCotizacionTecnico = () =>{
    return <div>
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
                    form_label="Fecha y Hora de Contacto">
                    
                </ViewText>

                <ViewText
                    id_form="hora_de_cierre"
                    form_label="Hora de Cierre">
                    
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
                    <Image src='Logo' alt='Evidencia 1'  />
                </Box>
                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200} paddingLeft={10}>
                    <Image src="Logo" alt='Evidencia 2' />
                </Box>
            </Center>
        </Box>



    </div>;
};

export default CrearCotizacionTecnico;

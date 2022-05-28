
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";

import { useRouter } from "next/router";
import {
    Box,
    Divider,
    FormLabel,
    Input,
    FormControl,
    Center,
    Textarea,
    Image,
    Text,
    SimpleGrid,
    Switch,
    Button,
    Flex,
    InputGroup,
    InputLeftAddon,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from "@chakra-ui/react";
import { BsPrinter } from "react-icons/bs";
import { MdAdd, MdOutlineAttachMoney } from "react-icons/md";
import { IoFlag, IoSpeedometerOutline } from "react-icons/io5";
import { IAseguradora, IAsistencia, ITicket } from "@/services/api.models";

interface VerTicketDomesticoForaneoProps {
    ticket: ITicket;
    aseguradora: IAseguradora;
    asistencia: IAsistencia;
}

export function VerTicketDomesticoForaneo({ ticket, aseguradora, asistencia }: VerTicketDomesticoForaneoProps) {

    return (
        <>

            <Header title="Ver Ticket de Servicio Doméstico Foráneo" />
            <Box
                m={2}
                bgColor="white"
                padding={5}
                borderRadius={10}
                boxShadow="2xl"
                p="6"
                rounded="md"
                bg="white"
            >
                <Text fontWeight="bold" fontSize="25px">Datos Básicos</Text>

                <SimpleGrid columns={[1, 1, 5]} spacing="20px" paddingTop={17}>
                    <FormLabel htmlFor="num_expediente">Número de Expediente:</FormLabel>
                    <Input
                        variant="unstyled"
                        isReadOnly
                        id="num_expediente"
                        type="text"
                        placeholder="N° Expediente"
                        borderColor="twitter.100"
                    />
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 1]} spacing="20px">
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="fecha_llamada">Fecha de la Llamada</FormLabel>
                        <Input
                            w={"fit-content"}
                            id="fecha_llamada"
                            variant="unstyled"
                            isReadOnly
                            placeholder="Fecha de la Llamada"
                            borderColor="twitter.100"
                        />
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 2]} spacing="20px">
                    <Center>
                        <FormControl paddingTop={15}>
                            <FormLabel htmlFor="aseguradoraId">
                                Aseguradora
                            </FormLabel>
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="aseguradoraId"
                                placeholder="Nombre de Aseguradora"
                                borderColor="twitter.100" />
                        </FormControl>

                        <FormControl paddingTop={15}>
                            <FormLabel htmlFor="asistenciaId">
                                Asistencia
                            </FormLabel>
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="asistenciaId"
                                placeholder="Nombre de Asistencia"
                                borderColor="twitter.100" />
                        </FormControl>
                    </Center>

                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <Center>
                        <FormControl paddingTop={15}>
                            <FormLabel htmlFor="nombre_asesor_gpo_lias">
                                Asesor de Gpo. Lías
                            </FormLabel>
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="nombre_asesor_gpo_lias"
                                placeholder="Asesor de Grupo Lías"
                                borderColor="twitter.100" />
                        </FormControl>

                        <FormControl paddingTop={15}>
                            <FormLabel htmlFor="nombre_asesor_aseguradora">
                                Asesor de la Aseguradora
                            </FormLabel>
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="nombre_asesor_aseguradora"
                                placeholder="Asesor de la Aseguradora"
                                borderColor="twitter.100" />
                        </FormControl>
                    </Center>
                </SimpleGrid>

                <Center>
                    <Divider orientation="vertical" />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="nombre_usuario_final">
                            Nombre del Usuario a Brindar Servicio
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="nombre_usuario_final"
                            placeholder="Usuario a Brindar Servicio"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor="titulo_ticket">
                            Descripción Corta del Ticket
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="titulo_ticket"
                            placeholder="Descripción Corta"
                            borderColor="twitter.100"
                        />
                    </FormControl>
                </Center>

                <FormControl paddingTop={15}>
                    <FormLabel htmlFor="problematica">
                        Descripción de la Problemática
                    </FormLabel>
                    <Textarea
                        id="problematica"
                        variant="unstyled"
                        placeholder="Problemática"
                        borderColor="twitter.100" />
                </FormControl>

                <FormControl paddingTop={15}>
                    <FormLabel htmlFor="servicioId">
                        Servicios Relacionados:
                    </FormLabel>
                    <Textarea
                        id="servicioId"
                        variant="unstyled"
                        isReadOnly
                        placeholder="Servicios Relacionados"
                        borderColor="twitter.100" />
                </FormControl>
            </Box>

            <Box
                m={2}
                bgColor="white"
                padding={5}
                borderRadius={10}
                boxShadow="2xl"
                p="6"
                rounded="md"
                bg="white"
            >
                <Text fontWeight="bold" fontSize="25px" w={"100%"}>
                    Cotización de Grupo Lías
                </Text>
                <Divider orientation="vertical" />

                <FormControl as={SimpleGrid} columns={{ base: 1, lg: 6 }}>
                    <FormControl paddingTop={2} paddingLeft={2}>
                        <FormLabel htmlFor="servicio_domestico">
                            Servicio Doméstico
                        </FormLabel>
                        <Switch
                            id="is_servicio_domestico"
                            size="lg"
                            isReadOnly
                        />
                        <Flex
                            w={"100%"}
                            padding={1}
                            bgColor={"green"}
                            justifyContent="center"
                            borderRadius={"2xl"}
                        >
                            <Text color={"white"} fontWeight="bold">
                                Servicio Dómestico Activado
                            </Text>
                        </Flex>
                    </FormControl>

                    <FormControl paddingTop={2} paddingLeft={2}>
                        <FormLabel htmlFor="servicio_foraneo">Servicio Foráneo</FormLabel>
                        <Switch
                            id="is_servicio_foraneo"
                            size="lg"
                            isReadOnly

                        />
                        <Flex
                            w={"100%"}
                            padding={1}
                            bgColor={"green"}
                            justifyContent="center"
                            borderRadius={"2xl"}
                        >
                            <Text color={"white"} fontWeight="bold">
                                Servicio Dómestico Activado
                            </Text>
                        </Flex>
                    </FormControl>
                </FormControl>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="estado">
                            Estado
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="estado"
                            placeholder="Estado"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
                        <Input
                            id="ciudad"
                            placeholder="Ciudad"
                            variant="unstyled"
                            isReadOnly
                            borderColor="twitter.100"
                        >
                        </Input>
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 4]} spacing={5}>
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="colonia">Colonia</FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="colonia"
                            placeholder="Colonia"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="calle">Calle</FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="calle"
                            placeholder="Calle"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor="numero_domicilio_exterior">
                            Número Exterior
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="numero_domicilio"
                            placeholder="N° de Domicilio Exterior"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor="numero_domicilio_interior">
                            Número Interior
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="num_interior"
                            placeholder="N° de Domicilio Interior"
                            borderColor="twitter.100"
                        />
                    </FormControl>
                </SimpleGrid>

                <Center>
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="cobertura">
                            Monto de Cobertura del Seguro
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="cobertura"
                                min={0}
                                placeholder="0.00"
                                paddingLeft={8}
                                type="number"
                                max={2}
                                borderColor="twitter.100"
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor="costo_gpo_lias">Costo Grupo Lías</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="costo_gpo_lias"
                                placeholder="0.00"
                                paddingLeft={8}
                                min={0}
                                type="number"
                                borderColor="twitter.100"
                            />
                        </InputGroup>
                    </FormControl>
                </Center>


                <SimpleGrid paddingTop={10} columns={[1, 1, 4]} spacing="40px">
                    <FormControl>
                        <FormLabel htmlFor="kilometraje">Kilómetros a Recorrer</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<IoSpeedometerOutline />}
                            />
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="kilometraje"
                                min={0}
                                placeholder="0"
                                paddingLeft={8}
                                type="number"
                                borderColor="twitter.100"
                            />
                        </InputGroup>
                    </FormControl>


                    <FormControl>
                        <FormLabel htmlFor="costoPorKilometro">
                            Costo por Kilómetro
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="costo_de_kilometraje"
                                min={0}
                                placeholder="0.00"
                                paddingLeft={8}
                                type="number"
                                borderColor="twitter.100"
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="casetas">Número de Casetas</FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="casetas"
                            placeholder="0"
                            type="number"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="costoPorCaseta">Costo por Caseta</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                variant="unstyled"
                                isReadOnly
                                id="costo_por_caseta"
                                min={0}
                                placeholder="0.00"
                                paddingLeft={8}
                                type="number"
                                borderColor="twitter.100"
                            />
                        </InputGroup>
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid paddingTop={5} columns={[1, 2, 4]} spacing="40px">
                    <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor="deducible">Deducible</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                variant='unstyled'
                                isReadOnly
                                id="deducible"
                                min={0}
                                placeholder="0.00"
                                paddingLeft={8}
                                type="number"
                                borderColor="twitter.100"
                                fontWeight={"bold"}
                                textColor={"red"}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="anticipo">Anticipo 60%</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                variant="unstyled"
                                id="anticipo"
                                isReadOnly
                                min={0}
                                placeholder="0.00"
                                paddingLeft={8}
                                type="number"
                                borderColor="twitter.100"
                                fontWeight={"bold"}
                                textColor={"red"}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={4}>
                        <FormLabel htmlFor="total_salida">Total de Salida</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                variant="unstyled"
                                id="total_salida"
                                isReadOnly
                                min={0}
                                placeholder="0.00"
                                paddingLeft={8}
                                type="number"
                                borderColor="twitter.100"
                                fontWeight={"bold"}
                                textColor={"red"}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor="total">Monto Total</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<MdOutlineAttachMoney />}
                            />
                            <Input
                                isReadOnly
                                variant="unstyled"
                                id="total"
                                min={0}
                                placeholder="0.00"
                                paddingLeft={8}
                                type="number"
                                borderColor="twitter.100"
                                fontWeight={"bold"}
                                textColor={"red"}
                            />
                        </InputGroup>
                    </FormControl>
                </SimpleGrid>

                <FormControl paddingTop={15}>
                    <FormLabel htmlFor="cotizacion_gpo_lias">
                        Cotización de Grupo Lías (Información Adicional)
                    </FormLabel>
                    <Textarea
                        id="cotizacion_gpo_lias"
                        variant="unstyled"
                        isReadOnly
                        placeholder="Cotización"
                        borderColor="twitter.100"

                    />
                </FormControl>
            </Box>

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Cotización del Técnico</Text>

                <FormControl paddingLeft={5} paddingTop={15}>
                    <FormLabel htmlFor="solucion_cotizacion_del_tecnico">
                        Solución y Cotización del Técnico
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        isReadOnly
                        id="fecha_solucion_cotizacion_del_tecnicollamada"
                        placeholder="Solución y Cotización del Técnico"
                        borderColor="twitter.100"
                    />
                </FormControl>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor="fecha_llamada">
                            Fecha y Hora de Contacto
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="fecha_llamada"
                            placeholder="Fecha y Hora de Contacto"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor="hora_cierre">
                            Hora de Cierre
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="hora_cierre"
                            placeholder="Hora de Cierre"
                            borderColor="twitter.100"
                        />
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor="costo_de_mano_de_obra">
                            Costo de Mano de Obra
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="costo_de_mano_de_obra"
                            placeholder="Costo de Mano de Obra"
                            borderColor="twitter.100"
                        />
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor="costo_de_materiales">
                            Costo de Materiales
                        </FormLabel>
                        <Input
                            variant="unstyled"
                            isReadOnly
                            id="costo_de_materiales"
                            placeholder="Costo de Materiales"
                            borderColor="twitter.100"
                        />
                    </FormControl>
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
                <Button
                    marginTop={15}
                    marginRight={8}
                    justifySelf="end"
                    leftIcon={<BsPrinter />}
                    id="imprimirTicket"
                    type="submit"
                    colorScheme="telegram"
                    borderColor="twitter.100"
                    size="lg"
                >
                    Imprimir
                </Button>
            </Box>


        </>
    );
}


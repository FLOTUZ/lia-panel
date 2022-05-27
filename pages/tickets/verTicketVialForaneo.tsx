import {
  Box,
  Stack,
  Spacer,
  Divider,
  FormLabel,
  Input,
  FormControl,
  Center,
  Select,
  Textarea,
  Text,
  CheckboxGroup,
  SimpleGrid,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { MdAdd, MdOutlineAttachMoney } from "react-icons/md";
import { AsesoresService } from "@/services/asesores.service";
import { TecnicoService } from "@/services/tecnicos.service";
import { useRouter } from "next/router";
import { IoFlag, IoSpeedometerOutline } from "react-icons/io5";
import { EstadosService } from "@/services/estados.service";
import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";

function verTicketVialForaneo() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Ver Ticket de Servicio Vial Foráneo" />
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
          <Text fontWeight="bold" fontSize={"25px"}>
            Datos Básicos
          </Text>

          <Stack direction="row">
            <Spacer />
            <Divider orientation="vertical" />
            <FormLabel htmlFor="num_expediente">
              Número de Expediente:
            </FormLabel>
            <Input
              variant="filled"
              id="num_expediente"
              type="text"
              placeholder="N° Expediente"
              borderColor="twitter.100"
            />
          </Stack>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="fecha_llamada">Fecha de la Llamada</FormLabel>
            <Input
              w={"fit-content"}
              id="fecha_llamada"
              variant="filled"
              type="datetime-local"
              borderColor="twitter.100"
            />
          </FormControl>
          <SimpleGrid columns={[1, 1, 2]} spacing="20px">
            <Center>
              <FormControl isRequired paddingTop={15}>
                <FormLabel htmlFor="aseguradoraId">Aseguradora</FormLabel>
                <Select
                  id="aseguradoraId"
                  placeholder="Selecciona la Aseguradora"
                  variant="filled"
                  borderColor="twitter.100"
                ></Select>
              </FormControl>

              <FormControl isRequired paddingLeft={5} paddingTop={15}>
                <FormLabel htmlFor="asistenciaId">Asistencia</FormLabel>
                <Select
                  id="asistenciaId"
                  placeholder="Selecciona Asistencia"
                  variant="filled"
                  borderColor="twitter.100"
                ></Select>
              </FormControl>
            </Center>
          </SimpleGrid>

          <SimpleGrid columns={1} spacing={5}>
            <Center>
              <FormControl isRequired paddingTop={15}>
                <FormLabel htmlFor="nombre_asesor_gpo_lias">
                  Asesor de Gpo. Lías
                </FormLabel>
                <Input
                  variant="filled"
                  id="nombre_asesor_gpo_lias"
                  placeholder="Asesor de Grupo Lías"
                  borderColor="twitter.100"
                />
              </FormControl>

              <FormControl isRequired paddingLeft={5} paddingTop={15}>
                <FormLabel htmlFor="asesorid">Asesor de Aseguradora</FormLabel>
                <Select
                  overflowWrap={"normal"}
                  id="asesorId"
                  placeholder="Selecciona el Asesor de la Aseguradora"
                  alignItems={"center"}
                  alignContent={"center"}
                  variant="filled"
                  borderColor="twitter.100"
                ></Select>
              </FormControl>
            </Center>
          </SimpleGrid>
          <Center>
            <Divider orientation="vertical" />
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="nombre_usuario_final">
                Nombre del Usuario a Brindar Servicio
              </FormLabel>
              <Input
                variant="filled"
                id="nombre_usuario_final"
                placeholder="Usuario a Brindar Servicio"
                borderColor="twitter.100"
              />
            </FormControl>

            <FormControl isRequired paddingLeft={5} paddingTop={15}>
              <FormLabel htmlFor="titulo_ticket">
                Descripción Corta del Ticket
              </FormLabel>
              <Input
                variant="filled"
                id="titulo_ticket"
                placeholder="Descripción Corta"
                borderColor="twitter.100"
              />
            </FormControl>
          </Center>

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="problematica">
              Descripción de la Problemática
            </FormLabel>
            <Textarea
              id="problematica"
              variant="filled"
              placeholder="Problemática"
              borderColor="twitter.100"
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="servicioId">
              Seleccione Servicios Relacionados:
            </FormLabel>
            <CheckboxGroup variant="filled" size={"lg"}></CheckboxGroup>
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

         

          <SimpleGrid columns={[1, 1, 2]} spacing={5}>
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="estado">Estado</FormLabel>
             
            </FormControl>

            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
              
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={[1, 1, 4]} spacing={5}>
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="colonia">Colonia</FormLabel>
              <Input
                variant="filled"
                id="colonia"
                placeholder="Colonia"
                borderColor="twitter.100"
              />
            </FormControl>

            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="calle">Calle</FormLabel>
              <Input
                variant="filled"
                id="calle"
                placeholder="Calle"
                borderColor="twitter.100"
              />
            </FormControl>

            <FormControl isRequired paddingLeft={5} paddingTop={15}>
              <FormLabel htmlFor="numero_domicilio_exterior">
                Número Exterior
              </FormLabel>
              <Input
                variant="filled"
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
                variant="filled"
                id="num_interior"
                placeholder="N° de Domicilio Interior"
                borderColor="twitter.100"
              />
            </FormControl>
          </SimpleGrid>

          <Center>
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="cobertura">
                Monto de Cobertura del Seguro
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<MdOutlineAttachMoney />}
                />
                <Input
                  variant="filled"
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

            <FormControl isRequired paddingTop={15} paddingLeft={5}>
              <FormLabel htmlFor="costo_gpo_lias">Costo Grupo Lías</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<MdOutlineAttachMoney />}
                />
                <Input
                  variant="filled"
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

          <SimpleGrid paddingTop={10} columns={[1, 2, 4]} spacing="40px">
            <FormControl isRequired>
              <FormLabel htmlFor="kilometraje">Kilómetros a Recorrer</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<IoSpeedometerOutline />}
                />
                <Input
                  variant="filled"
                  id="kilometraje"
                  min={0}
                  placeholder="0"
                  type="number"
                  borderColor="twitter.100"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="costoPorKilometro">
                Costo por Kilómetro
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<MdOutlineAttachMoney />}
                />
                <Input
                  variant="filled"
                  id="costo_de_kilometraje"
                  min={0}
                  placeholder="0.00"
                  paddingLeft={8}
                  type="number"
                  borderColor="twitter.100"
                />
              </InputGroup>
            </FormControl>
          </SimpleGrid>
        </Box>
      </DesktopLayout>
    </>
  );
}

export default verTicketVialForaneo;

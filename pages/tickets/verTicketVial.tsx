import DesktopLayout from "@/layouts/DesktopLayout";
import Header from "@/common/Header";

import { useRouter } from "next/router";
import {
  Box,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";

function VerTicketVial() {
  const router = useRouter();
  return (
    <>
      <DesktopLayout>
        <Header title="Ticket de servicio vial" />

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
          <Text fontWeight="bold" fontSize="25px">
            Datos Básicos
          </Text>

          <SimpleGrid columns={[1, 1, 5]} spacing="20px" paddingTop={17}>
            <FormLabel htmlFor="num_expediente">
              Número de Expediente:
            </FormLabel>
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
                <FormLabel htmlFor="aseguradoraId">Aseguradora</FormLabel>
                <Input
                  variant="unstyled"
                  isReadOnly
                  id="aseguradoraId"
                  placeholder="Nombre de Aseguradora"
                  borderColor="twitter.100"
                />
              </FormControl>

              <FormControl paddingTop={15}>
                <FormLabel htmlFor="asistenciaId">Asistencia</FormLabel>
                <Input
                  variant="unstyled"
                  isReadOnly
                  id="asistenciaId"
                  placeholder="Nombre de Asistencia"
                  borderColor="twitter.100"
                />
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
                  borderColor="twitter.100"
                />
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
                  borderColor="twitter.100"
                />
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
              borderColor="twitter.100"
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="servicioId">Servicios Relacionados:</FormLabel>
            <Textarea
              id="servicioId"
              variant="unstyled"
              isReadOnly
              placeholder="Servicios Relacionados"
              borderColor="twitter.100"
            />
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
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="estado">Estado</FormLabel>
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
              ></Input>
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={[1, 1, 4]} spacing={4}>
            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="modelo_del_carro">Modelo del Carro</FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="modelo_carro"
                placeholder="Modelo del Carro"
                borderColor="twitter.100"
              />
            </FormControl>

            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="placas">Placas</FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="placas_carro"
                placeholder="Placas"
                borderColor="twitter.100"
              />
            </FormControl>

            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="color">Color</FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="color_carro"
                placeholder="Color"
                borderColor="twitter.100"
              />
            </FormControl>

            <FormControl isRequired paddingTop={15}>
              <FormLabel htmlFor="marca">Marca</FormLabel>
              <Input
                variant="unstyled"
                isReadOnly
                id="marca_carro"
                placeholder="Marca"
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
                  variant="unstyled"
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
      </DesktopLayout>
    </>
  );
}

export default VerTicketVial;

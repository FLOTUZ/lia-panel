import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  Box,
  Button,
  FormControl,
  Input,
  Spacer,
  Stack,
  Switch,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function UsuariosListado() {
  return (
    <DesktopLayout>
      <Box m={2} bgColor="white" padding={5} borderRadius={10}>
        <Header title="Crear Usuario" />

        <Stack direction="row">
          <Spacer />
          <Text mb="8px" color="gray.500">
            Creado en:
          </Text>
        </Stack>

        <FormControl isRequired>
          <FormLabel mb="8px">Usuario</FormLabel>
          <Input type="text" />

          <FormLabel mb="8px">Nombre</FormLabel>
          <Input type="text" />

          <FormLabel mb="8px">Apellido Materno:</FormLabel>
          <Input type="text" />

          <FormLabel mb="8px">Apellido Paterno:</FormLabel>
          <Input type="text" />

          <FormLabel mb="8px">Email</FormLabel>
          <Input type="email" />

          <FormLabel mb="8px">Password</FormLabel>
          <Input type="password" />

          <Stack direction="row" pt={5}>
            <FormLabel mb="8px">Puede crear ticket</FormLabel>
            <Switch colorScheme="teal" size="lg" />

            <FormLabel mb="8px">Puede cerrar ticket</FormLabel>
            <Switch colorScheme="teal" size="lg" />

            <FormLabel mb="8px">Es administrador</FormLabel>
            <Switch colorScheme="teal" size="lg" />

            <FormLabel mb="8px">¿Esta activo?</FormLabel>
            <Switch colorScheme="teal" size="lg" />
            <Spacer />
            <Button colorScheme="red" variant="outline">
              Descartar
            </Button>
            <Button colorScheme="blue">Guardar</Button>
          </Stack>
        </FormControl>
      </Box>
    </DesktopLayout>
  );
}

export default UsuariosListado;

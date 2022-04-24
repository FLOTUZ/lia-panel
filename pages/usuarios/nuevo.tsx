import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import Router from "next/router";

import {
  FormLabel,
  Input,
  FormControl,
  RadioGroup,
  HStack,
  VStack,
  Radio,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { IUsuario } from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";
import axios from "axios";

function UsuarioNuevo() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("USUARIO");

  const [cargando, setCargando] = useState(false);
  const toast = useToast();

  const altaUsuario = async () => {
    //setCargando(true);
    const data: IUsuario = {
      usuario,
      email,
      password,
      rol,
    };

    const service = new UsuariosService();
    const respuesta = await service.nuevo(data);
    console.log(data);

    if (respuesta.status != 201) {
      setCargando(false);
      toast({
        title: "Error",
        status: "error",
        description: `Error al dar de alta, verifique sus campos`,
      });
    }
    if (respuesta.status == 201) {
      toast({
        title: "Guardado",
        status: "success",
        description: `Se guardo el usuario`,
      });

      Router.back();
    }
  };

  return (
    <DesktopLayout>
      <Header title={"Nuevo Usuario"} />
      <FormControl isRequired>
        <VStack
          m={2}
          padding={5}
          borderRadius={10}
          boxShadow="2xl"
          p="6"
          rounded="md"
          bg="white"
          spacing={2}
          alignItems={"start"}
        >
          <FormLabel htmlFor="usuario">Nombre de usuario</FormLabel>
          <Input
            isRequired
            variant="filled"
            id="usuario"
            placeholder="María"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value.toLowerCase())}
          />

          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            isRequired
            variant="filled"
            id="email"
            type={"email"}
            placeholder="maria@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
          <Input
            variant="filled"
            id="password"
            type={"password"}
            isRequired={true}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormLabel htmlFor="rol">Seleccione Rol</FormLabel>

          <RadioGroup
            id="rol"
            aria-required={true}
            defaultValue="USUARIO"
            onChange={(e) => setRol(e)}
          >
            <HStack spacing="1rem">
              <Radio size={"lg"} value="USUARIO">
                Usuario Comun
              </Radio>

              <Radio size={"lg"} value="TECNICO">
                Es Tecnico
              </Radio>

              <Radio size={"lg"} value="CAPTURISTA">
                Capturista
              </Radio>

              <Radio size={"lg"} value="ADMIN">
                Administrador
              </Radio>
            </HStack>
          </RadioGroup>

          <HStack marginTop={50} spacing={4} w={"100%"}>
            <Spacer />
            <Button
              id="guardar"
              colorScheme="blue"
              variant="solid"
              onClick={altaUsuario}
              isLoading={cargando}
            >
              Agregar
            </Button>

            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => Router.back()}
            >
              Cancelar
            </Button>
          </HStack>
        </VStack>
      </FormControl>
    </DesktopLayout>
  );
}

export default UsuarioNuevo;

import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IUsuario } from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UsuarioVer() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const [data, setData] = useState<IUsuario>();

  const [cargando, setCargando] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const { idUsuario } = router.query;

  useEffect(() => {
    const getUser = async () => {
      const servicio = new UsuariosService();
      const respuesta: IUsuario = await servicio.userById(Number(idUsuario));
      setData(respuesta);
    };
    getUser();
  }, [idUsuario]);

  const actualizaUsuario = async () => {
    setCargando(true);
    const actualizar: IUsuario = {
      usuario,
      email,
      password,
      rol,
      updatedAt: new Date(),
    };

    const service = new UsuariosService();
    const respuesta = await service.update(actualizar, Number(idUsuario));

    if (respuesta === undefined) {
      toast({
        title: "Error",
        status: "error",
        description: `Error al dar de alta, verifique sus campos`,
      });
      setCargando(false);
    } else {
      toast({
        title: "Guardado",
        status: "success",
        description: `${respuesta.usuario} guardado`,
      });
      setData(respuesta);
      console.log(data);

      setCargando(false);
    }
  };

  return (
    <div>
      <DesktopLayout>
        <Header title={`Editar Usuario`} />

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
              defaultValue={data?.usuario}
              onChange={(e) => {
                setUsuario(e.target.value.toLowerCase());
              }}
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              isRequired
              variant="filled"
              id="email"
              type={"email"}
              defaultValue={data?.email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
            <Input
              variant="filled"
              id="password"
              type={"password"}
              defaultValue={data?.password}
              isRequired={true}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormLabel htmlFor="rol">Seleccione Rol</FormLabel>
            <Text fontWeight={"bold"}>Actualmente es: {data?.rol}</Text>
            <RadioGroup
              id="rol"
              aria-required={true}
              defaultValue={data?.rol}
              onChange={(e) => {
                setRol(e);
              }}
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
                onClick={actualizaUsuario}
                isLoading={cargando}
              >
                Actualizar
              </Button>

              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      </DesktopLayout>
    </div>
  );
}

export default UsuarioVer;

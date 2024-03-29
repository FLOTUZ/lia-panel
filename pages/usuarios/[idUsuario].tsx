import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IServicio, IUsuario } from "@/services/api.models";
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
  Switch,
  Flex,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UsuarioVer() {
  const [servicios, setServicios] = useState<string[]>([]);
  const filtradoServicios = (t: IServicio) => {
    const id = t.id || 0;
    const arr = servicios;
    const found = arr.find((e) => e == String(id));

    if (!found) {
      arr.push(String(id));
      setServicios(arr);
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == String(id)) {
          arr.splice(i, 1);
          setServicios(arr);
        }
      }
    }
  };

  const [data, setData] = useState<IUsuario>();

  const [cargando, setCargando] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const { idUsuario } = router.query;

  const getUser = async () => {
    const servicio = new UsuariosService();
    const respuesta = await servicio.getById(Number(idUsuario));
    if (respuesta.status == 200) {
      setData(respuesta.data as IUsuario);
    }
  };
  useEffect(() => {
    getUser();
  }, [idUsuario]);

  const formUsuario = useFormik({
    initialValues: {
      inactivo: data?.inactivo,
      usuario: data?.usuario || "",
      email: data?.email || "",
      password: undefined,
      rol: data?.rol || "",
    },
    enableReinitialize: true,
    onReset: () => {
      getUser();
    },

    onSubmit: async (values: IUsuario) => {
      const data = {
        ...values,
      } as IUsuario;

      const service = new UsuariosService();
      const respuesta = await service.update(data, Number(idUsuario));
      const dataUpdate = respuesta.data as IUsuario;
      setData(dataUpdate);

      if (respuesta.status != 200) {
        toast({
          title: "Oops... Ocurrio un error.",
          status: "error",
          position: "bottom-right",
          description: `Posibles causa: El usuario ya existe, 
          El email ya fué asignado a un usuario.`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Usuario Actualizado",
          position: "bottom-right",
          status: "success",
          description: `Usuario, ${dataUpdate.usuario} actualizado.`,
        });

        router.back();
      }
      //  };
    },
  });

  return (
    <div>
      <DesktopLayout>
        <Header title={`Editar Usuario`} />

        <form onSubmit={formUsuario.handleSubmit}>
          <FormControl>
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
              {formUsuario.values.inactivo ? (
                <Flex
                  w={"100%"}
                  bgColor={"red"}
                  justifyContent="center"
                  borderRadius={"2xl"}
                >
                  <Text color={"white"} fontWeight="bold">
                    Este usuario está inactivo
                  </Text>
                </Flex>
              ) : null}
              <Switch
                name="inactivo"
                onChange={() => {
                  formUsuario.setFieldValue(
                    "inactivo",
                    !formUsuario.values.inactivo
                  );
                }}
                defaultChecked={!formUsuario.values.inactivo}
              >
                Activo
              </Switch>
              <FormLabel htmlFor="usuario">Nombre de usuario</FormLabel>
              <Input
                isRequired
                variant="filled"
                id="usuario"
                maxLength={20}
                placeholder="Nombre de Usuario"
                onChange={formUsuario.handleChange}
                value={formUsuario.values.usuario}
              />

              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                isRequired
                variant="filled"
                maxLength={100}
                id="email"
                type={"email"}
                defaultValue={data?.email}
                onChange={formUsuario.handleChange}
                value={formUsuario.values.email}
              />

              <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
              <Input
                variant="filled"
                id="password"
                maxLength={255}
                minLength={8}
                type={"password"}
                onChange={formUsuario.handleChange}
                value={formUsuario.values.password}
              />
              <FormLabel htmlFor="rol">Seleccione Rol</FormLabel>
              <Text fontWeight={"bold"}>Actualmente es: {data?.rol}</Text>
              <RadioGroup
                id="rol"
                aria-required={true}
                value={formUsuario.values.rol}
                onChange={(e) => {
                  formUsuario.setFieldValue("rol", e);
                }}
              >
                <HStack spacing="1rem">
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
                  type="submit"
                  colorScheme="whatsapp"
                  variant="solid"
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
        </form>
      </DesktopLayout>
    </div>
  );
}

export default UsuarioVer;

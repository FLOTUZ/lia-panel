import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IServicio } from "@/services/api.models";
import { ServiciosService } from "@/services/servicios.service";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Radio,
  RadioGroup,
  HStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ServicioVer() {
  const [data, setData] = useState<IServicio>();

  const [cargando, setCargando] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const { idServicio } = router.query;

  //el error esta aqui no se que sea

  useEffect(() => {
    const getServicio = async () => {
      const servicio = new ServiciosService();
      const respuesta = await servicio.getById(Number(idServicio));
      if (respuesta.status == 200) {
        setData(respuesta.data as IServicio);
      }
    };

    getServicio();
  }, [idServicio]);

  const formServicio = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
      tipo: data?.tipo || "",
    },
    enableReinitialize: true,

    onSubmit: async (values: IServicio) => {
      const data = {
        ...values,
      };

      const service = new ServiciosService();
      const respuesta = await service.update(data, Number(idServicio));
      

      const dataUpdate = respuesta.data as IServicio;
      setData(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Oops... Ocurrio un error.",
          status: "error",
          position:"bottom-right",
          description: `Error al actualizar, verificar los campos.`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Actualización exitosa.",
          position:"bottom-right",
          status: "success",
          description: `La actualización se guardo, exitosamente.`,
        });
      }
    },
  });

  return (
    <div>
      <DesktopLayout>
        <Header title={"Editar Servicio"} />
        <form onSubmit={formServicio.handleSubmit}>
          <FormControl isRequired>
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
              <Stack spacing={1}>
                <FormControl>
                  <FormLabel>Nombre del Servicio</FormLabel>
                  <Input
                    isRequired
                    placeholder="Nombre del servicio"
                    variant="filled"
                    id="nombre"
                    type="nombre"
                    minLength={5}
                    maxLength={100}
                    defaultValue={data?.nombre}
                    onChange={formServicio.handleChange}
                  />
                  <FormLabel padding={1}>Tipo del Servicio</FormLabel>
                  <RadioGroup
                    colorScheme="green"
                    defaultValue={data?.tipo}
                    onChange={(checks) => {
                      formServicio.setFieldValue(
                        'tipo',
                        checks
                      )
                    }}
                  >
                    <Stack
                      padding={2}
                      spacing={[1, 5]}
                      direction={["column", "row"]}
                    >
                      <Radio
                        value="DOMESTICO"
                      >
                        Doméstico
                      </Radio>
                      <Radio
                        value="VIAL"
                      >
                        Vial
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <footer>
                  <HStack
                  spacing={[1, 5]}>
                    <Button
                      id="guardar"
                      type="submit"
                      isLoading={cargando}
                      colorScheme="whatsapp"
                      variant="solid"
                      onClick={() => router.back()}
                    >
                      Guardar
                    </Button>

                    <Button
                      onClick={() => router.back()}
                      colorScheme="red"
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </HStack>
                </footer>
              </Stack>
            </Box>
          </FormControl>
        </form>
      </DesktopLayout>
    </div>
  );
}

export default ServicioVer;

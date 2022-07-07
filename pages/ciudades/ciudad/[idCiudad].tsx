import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  useToast,
  Divider,
  HStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ICiudad } from "@/services/api.models";
import { CiudadesService } from "@/services/ciudades.service";
import { useFormik } from "formik";

function CiudadVer() {

  const toast = useToast();

  const [data, setData] = useState<ICiudad>();

  const router = useRouter();

  const [cargando, setCargando] = useState(false);

  const { idCiudad } = router.query;

  /**ID ESTADO  */

  useEffect(() => {
    const getEstado = async () => {
      const service = new CiudadesService();
      const respuesta = await service.getById(Number(idCiudad));
      if (respuesta.status == 200) {
        setData(respuesta.data as ICiudad);
      }
    };

    getEstado();
  }, [idCiudad]);

  /*ACTUALIZAR EL ESTADO SELECCIONADO FORMIK */

  const formCiudad = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
    },
    enableReinitialize: true,

    onSubmit: async (values: ICiudad) => {
      const data = {
        ...values,
      };

      const service = new CiudadesService();
      const respuesta = await service.update(data, Number(idCiudad));

      const dataUpdate = respuesta.data as ICiudad;
      setData(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Oops... Ocurrio un error.",
          status: "error",
          position: "bottom-right",
          description: `Error al actualizar, verificar los campos.`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Actualización exitosa.",
          status: "success",
          position: "bottom-right",
          description: `La ciudad se actualizó, correctamente.`,
        });
        router.back();
      }
    },
  });

  return (
    <div>
      <DesktopLayout>
        <Header title={"Editar Ciudad"} />
        <form onSubmit={formCiudad.handleSubmit}>
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
            <HStack spacing={4} w={"50%"}>
            </HStack>

            <Stack spacing={4}>
              <InputGroup>
                <FormControl isRequired>
                  <FormLabel htmlFor="nombre">Nombre de la Ciudad</FormLabel>
                  <InputGroup>
                    <Input
                      id="nombre"
                      variant="filled"
                      defaultValue={data?.nombre}
                      placeholder="Ciudad"
                      onChange={(e) => {
                        const nombreM = e.target.value.toUpperCase();
                        formCiudad.setFieldValue("nombre", nombreM);
                      }}
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>

             <Divider paddingTop={5} orientation="horizontal" />
            </Stack>

            <Stack
              marginTop={50}
              direction="row"
              spacing={4}
              align="center"
              paddingLeft={930}
            >
              <Button
                id="guardar"
                type="submit"
                colorScheme="whatsapp"
                variant="solid"
              >
                Actualizar
              </Button>

              <Button
                onClick={() => router.back()}
                colorScheme="red"
                variant="outline"
              >
                Cancelar
              </Button>
            </Stack>

          </Box>
        </form>
      </DesktopLayout>
    </div>
  );
}
export default CiudadVer;

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
  Spacer,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IAsistencia } from "@/services/api.models";
import { AsistenciasService } from "@/services/asistencias.service";
import { useFormik } from "formik";

function AsistenciaVer() {
  const toast = useToast();

  const [data, setData] = useState<IAsistencia>();

  const router = useRouter();

  const [cargando, setCargando] = useState(false);

  const { idAsistencia } = router.query;

  /**ID ESTADO  */

  useEffect(() => {
    const getEstado = async () => {
      const service = new AsistenciasService();
      const respuesta = await service.getById(Number(idAsistencia));
      if (respuesta.status == 200) {
        setData(respuesta.data as IAsistencia);
      }
    };

    getEstado();
  }, [idAsistencia]);

  /*ACTUALIZAR EL ESTADO SELECCIONADO FORMIK */

  const formAsistencia = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
    },
    enableReinitialize: true,

    onSubmit: async (values: IAsistencia) => {
      const data = {
        ...values,
      };

      const service = new AsistenciasService();
      const respuesta = await service.update(data, Number(idAsistencia));

      const dataUpdate = respuesta.data as IAsistencia;
      setData(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Oops... Ocurrio un error.",
          position: "bottom-right",
          status: "error",
          description: `Verificar los campos.`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Actualización exitosa.",
          position: "bottom-right",
          status: "success",
          description: `Asistencia, actualizada correctamente.`,
        });
        router.back();
      }
    },
  });

  return (
    <div>
      <DesktopLayout>
        <Header title={"Editar Asistencia"} />
        <form onSubmit={formAsistencia.handleSubmit}>
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
            <FormControl isRequired>
              <FormLabel htmlFor="nombre">Nombre de la Asistencia</FormLabel>

              <Input
                id="nombre"
                variant="filled"
                defaultValue={data?.nombre}
                placeholder="Asistencia"
                maxLength={50}
                minLength={3}
                onChange={(e) => {
                  const nombreM = e.target.value.toUpperCase();
                  formAsistencia.setFieldValue("nombre", nombreM);
                }}
              />
            </FormControl>

            <Divider paddingTop={5} orientation="horizontal" />

            <HStack>
              <Spacer />
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
            </HStack>
          </Box>
        </form>
      </DesktopLayout>
    </div>
  );
}
export default AsistenciaVer;

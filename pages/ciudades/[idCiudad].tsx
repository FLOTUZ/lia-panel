import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { ICiudad } from "@/services/api.models";
import { CiudadesService } from "@/services/ciudades.service";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, useFormik } from "formik";
import { link } from "fs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CiudadVer() {
  const [data, setData] = useState<ICiudad>();

  const [cargando, setCargando] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const { idCiudad } = router.query;

  useEffect(() => {
    const getUser = async () => {
      const ciudad = new CiudadesService();
      const respuesta = await ciudad.getById(Number(idCiudad));
      if (respuesta.status == 200) {
        setData(respuesta.data as ICiudad);
        console.log(data);
      }
    };

    getUser();
  }, [idCiudad]);

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
          description: `${respuesta.Ciudad} guardado`,
        });
      }
    },
  });

  const [nombreCiudad, setNombreCiudad] = useState("");

  const guardarCiudad = async () => {
    const data: ICiudad = {
      nombre: nombreCiudad,
    };
  };

  return (
    <div>
      <DesktopLayout>
        <Header title={"Editar Ciudad"} />
        <form onSubmit={formCiudad.handleSubmit}>
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
                <InputGroup>
                  <FormControl>
                    <FormLabel>Nombre del la Ciudad</FormLabel>
                    <Input
                      placeholder="Nombre"
                      defaultValue={data?.nombre}
                      onChange={(e) => {
                        formCiudad.handleChange;
                      }}
                    />
                    <footer>
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
                        <Link href={`/ciudades/`}>
                          <Button
                            id="guardar"
                            type="submit"
                            isLoading={cargando}
                            colorScheme="facebook"
                            variant="solid"
                            //onClick={guardarCiudad}
                          >
                            Guardar
                          </Button>
                        </Link>
                        <Button
                          onClick={() => router.back()}
                          colorScheme="red"
                          variant="outline"
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </footer>
                  </FormControl>
                </InputGroup>
              </Stack>
            </Box>
          </FormControl>
        </form>
      </DesktopLayout>
    </div>
  );
}

export default CiudadVer;

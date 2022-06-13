import { LockIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { IoMail } from "react-icons/io5";

import Image from "next/image";
import Logo from "../../public/logo.jpeg";
import { useFormik } from "formik";
import { AuthService } from "@/services/auth.service";
import { ILogin } from "@/services/api.models";
import Router, { useRouter } from "next/router";

export default function Home(): JSX.Element {
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClick = () => setShow(!show);
  const router = useRouter();

  const formLogin = useFormik({
    initialValues: {
      usuario: "",
      password: "",
    },

    onSubmit: async (credenciales: ILogin) => {
      const service = new AuthService();
      (await service.login(credenciales))
        ? router.push("/tickets")
        : setShowError(true);
    },
  });
  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
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
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              height={250}
              width={250}
              src={Logo}
              alt="Logo de grupo lias"
            />

            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={formLogin.handleSubmit}>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="facebook.300"
                        children={<IoMail color="gray.300" />}
                      />
                      <Input
                        id="usuario"
                        placeholder="Usuario"
                        onChange={formLogin.handleChange}
                        value={formLogin.values.usuario}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup size="md">
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<LockIcon color="facebook.300" />}
                      />
                      <Input
                        id="password"
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        onChange={formLogin.handleChange}
                        value={formLogin.values.password}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Ocultar" : "Ver"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right"></FormHelperText>
                  </FormControl>

                  {showError ? (
                    <Button
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      colorScheme="red"
                      width="50"
                    >
                      Error en credenciales
                    </Button>
                  ) : (
                    <Button
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      colorScheme="facebook"
                      width="50"
                    >
                      Ingresar
                    </Button>
                  )}
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}

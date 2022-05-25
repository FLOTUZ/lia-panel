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
import React from "react";
import { IoMail } from "react-icons/io5";

import Image from "next/image";
import Logo from "../../public/logo.jpeg";

export default function Home(): JSX.Element {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
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
              <form>
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
                      <Input type="email" placeholder="Usuario" />
                    </InputGroup>
                  </FormControl>
                  <FormControl paddingEnd={5}>
                    <InputGroup size="md">
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<LockIcon color="facebook.300" />}
                      />
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Ocultar" : "Ver"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right"></FormHelperText>
                  </FormControl>

                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="facebook"
                    width="50"
                  >
                    Ingresar
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}

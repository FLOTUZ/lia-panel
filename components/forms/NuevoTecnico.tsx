import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { IUsuario } from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";

import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  Select,
  Text,
  Center,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NuevoTecnico = () => {
  const getUsuarios = async () => {
    const service = new UsuariosService();
    const respuesta = await service.getAll();
    const data = respuesta.data as IUsuario;
  };
  return (
    <>
      
    </>
  );
};

export default NuevoTecnico;

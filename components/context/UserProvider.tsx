import { IUsuario } from "@/services/api.models";
import { AuthService } from "@/services/auth.service";
import { UsuariosService } from "@/services/usuarios.service";
import UsuarioNoAutorizado from "@/views/UsuarioNoAutorizado.view";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

type IUserContext = {
  usuario: IUsuario | null;
  login: () => void;
  logout: () => void;
};

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface IUserProvider {
  children: JSX.Element | JSX.Element[];
}
const UserProvider = ({ children }: IUserProvider) => {
  const router = useRouter();
  const toast = useToast();
  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  const login = async () => {
    if (usuario == null) {
      const service = new UsuariosService();
      const user = await service.getLogedUser();

      if (user) {
        setUsuario(user);
      } else {
        logout();
        toast({
          title: "La sesion ha caducado",
          description: "Por favor, inicia sesión de nuevo",
          status: "warning",
          duration: 5000,
          position: "bottom-end",
        });
      }
    } else {
      router.push("/login");
    }
  };

  const logout = () => {
    const service = new AuthService();
    setUsuario(null);
    service.logout();
    router.push("/login");
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <UserContext.Provider
      value={{
        usuario,
        login,
        logout,
      }}
    >
      {usuario !== null && usuario.rol != "TECNICO" ? (
        children
      ) : usuario?.rol == "TECNICO" ? (
        <UsuarioNoAutorizado />
      ) : (
        <Center h={"100vh"}>
          <Spinner size="xl" />
        </Center>
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;

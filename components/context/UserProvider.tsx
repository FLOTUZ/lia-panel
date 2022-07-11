import { IUsuario } from "@/services/api.models";
import { AuthService } from "@/services/auth.service";
import { UsuariosService } from "@/services/usuarios.service";
import UsuarioNoAutorizado from "@/views/UsuarioNoAutorizado.view";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useMemo, useState } from "react";

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
  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  const login = async () => {
    const service = new UsuariosService();
    const user = await service.getLogedUser();
    if (user) setUsuario(user);
  };
  const logout = () => {
    const service = new AuthService();
    setUsuario(null);
    service.logout();
    router.push("/login");
  };

  useMemo(() => {
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

import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "@/services/auth.service";
import { GetServerSideProps } from "next";

const colors = {
  lias: {
    primary: "#0070f3",
    secondary: "#1da1f2",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
    link: "#007bff",
  },
};

const theme = extendTheme({ colors });

const service = new AuthService();
service.initAxiosInterceptor();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const showLogin = async () => {
    const token = service.getToken();

    if (token) {
      setIsAuth(true);
      await service.checkToken();
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    showLogin();
  }, []);

  useEffect(() => {
    isAuth ? router.push("/tickets") : router.push("/login");
  }, [isAuth]);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

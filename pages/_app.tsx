import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthService } from "@/services/auth.service";

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

  const showLogin = async () => {
    const token = service.getToken();

    if (token == null || !(await service.checkToken())) {
      router.push("/login");
    }
  };

  useEffect(() => {
    showLogin();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

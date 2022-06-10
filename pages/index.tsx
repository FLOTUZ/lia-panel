import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home(): JSX.Element {
  const router = useRouter();
  const redirectToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    redirectToLogin();
  }, []);

  return <></>;
}

import { Heading } from "@chakra-ui/react";
import Head from "next/head";

interface IHeader {
  title: string;
}

const Header = ({title}: IHeader): JSX.Element => {
  return (
    <>
      <Head>
        <title>LIA - {title} </title>
        <meta name="description" content="Panel de gestión GPO Lias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading ml={1}>{title}</Heading>
    </>
  );
};

export default Header;

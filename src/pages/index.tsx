import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { getSession } from "@auth0/nextjs-auth0";
import { useAppContext } from "../context/AppContext";

import { Container, Button, Popup } from "semantic-ui-react";
import CardMes from "../components/CardMes";
import FormCompra from "../components/FormCompra";

import { useEffect } from "react";
import FormReceita from "../components/FormReceita";

interface IDataProps {
  compras: string[];
  receitas: string[];
}
export default function Home({ compras, receitas }: IDataProps) {
  const { toggleActive, dataFetch, addReceitaFetch, userPurchases } =
    useAppContext();

  useEffect(() => {
    dataFetch(compras);
    addReceitaFetch(receitas);
  }, []);

  return (
    <Container>
      <CardMes />
      <FormCompra />
      <FormReceita />
      <div className="divAnimate">
        <Button
          icon="add"
          size="huge"
          primary
          circular
          onClick={toggleActive}
        />
      </div>
    </Container>
  );
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;
  const session = getSession(req, res);
  if (!session) {
    return {
      redirect: {
        destination: `${process.env.BASE_URL}/api/auth/login`,
        permanent: true,
      },
    };
  }
  const userLogin = session.user.sub;
  const response = await fetch(
    `${process.env.BASE_URL}/api/compras/loadInsert?user=${userLogin}`
  );
  const { data } = await response.json();

  return { props: { compras: data.compras, receitas: data.receitas } };
};

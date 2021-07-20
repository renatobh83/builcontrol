import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { useUser, getSession } from "@auth0/nextjs-auth0";
import { useAppContext } from "../context/AppContext";

import { Container, Button, Popup } from "semantic-ui-react";
import CardMes from "../components/CardMes";
import FormCompra from "../components/FormCompra";

import { useEffect } from "react";
import FormReceita from "../components/FormReceita";

export default function Home({ data }) {
  const { user } = useUser();
  const { isActive, toggleActive, dataFetch, addReceitaFetch } =
    useAppContext();
  console.log(data);
  useEffect(() => {
    dataFetch(data.compras);
    addReceitaFetch(data.receitas);
  }, []);
  if (user) {
    return (
      <Container>
        {/* {!isActive && <CardMes />} */}
        <CardMes />
        <FormCompra />
        <FormReceita />
        <div className="divAnimate">
          <Popup
            content="Lançar compra"
            trigger={
              <Button
                icon="add"
                size="huge"
                primary
                circular
                onClick={toggleActive}
              />
            }
          />
        </div>
      </Container>
    );
  }
  return <div></div>;
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
    `http://localhost:3000/api/compras/loadInsert?user=${userLogin}`
  );
  const { data } = await response.json();

  return { props: { data } };
};

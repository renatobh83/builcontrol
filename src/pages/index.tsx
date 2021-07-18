import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { useUser } from "@auth0/nextjs-auth0";
import { useAppContext } from "../context/AppContext";

import { Container, Button, Popup } from "semantic-ui-react";
import CardMes from "../components/CardMes";
import FormCompra from "../components/FormCompra";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const { isActive, toggleActive } = useAppContext();

  useEffect(() => {}, []);
  if (user) {
    return (
      <Container>
        {!isActive && <CardMes />}
        <FormCompra />
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
  const { req } = context;

  const cookie = req.cookies;
  if (cookie.appSession === undefined) {
    return {
      redirect: {
        destination: `${process.env.BASE_URL}/api/auth/login`,
        permanent: true,
      },
    };
  }
  return { props: {} };
};

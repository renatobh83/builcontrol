import { GetServerSideProps } from "next";

import { useUser } from "@auth0/nextjs-auth0";
import { useAppContext } from "../context/AppContext";

import { Container, Button } from "semantic-ui-react";
import CardMes from "../components/CardMes";
import FormCadastro from "../components/FormCadastro";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const { isActive, toggleActive } = useAppContext();
  if (user) {
    return (
      <Container>
        {!isActive && <CardMes />}
        <FormCadastro />
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
  return <div></div>;
}
export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
  req,
}) => {
  const cookie = req.cookies;
  if (cookie.appSession === undefined) {
    return {
      redirect: {
        destination: `${process.env.BASE_URL}/api/auth/login`,
        permanent: true,
      },
    };
  } else {
    const data = await fetch(`${process.env.BASE_URL}/api/auth/me`, {
      method: "GET",
    });
    const response = await data.json();
    console.log(response);

    return { props: {} };
  }
};

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
    res.statusCode = 302;
    res.setHeader("Location", `http://localhost:3000/api/auth/login`);
  }
  return { props: {} };
};

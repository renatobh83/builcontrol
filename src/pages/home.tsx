import { GetServerSideProps } from "next";
import { Container, Button } from "semantic-ui-react";

import CardMes from "../components/CardMes";
import FormCadastro from "../components/FormCadastro";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { isActive, toggleActive } = useAppContext();

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

// export const getServerSideProps: GetServerSideProps = async () => {
//   const dataFetch = await fetch(
//     "http://192.168.1.172:3000/api/user/isLoggedIn"
//   );
//   if (dataFetch.status !== 200) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: true,
//       },
//     };
//   } else {
//     return {
//       props: {},
//     };
//   }
// };

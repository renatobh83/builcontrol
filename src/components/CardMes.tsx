import { useUser } from "@auth0/nextjs-auth0";
import { useAppContext } from "../context/AppContext";

import {
  Grid,
  Card,
  Header,
  Container,
  Label,
  Segment,
  Button,
} from "semantic-ui-react";

import { Meses } from "../utils/meses";
import Cabecalho from "./Cabecalho";
import DetalhesMes from "./DetalhesMes";
import Itens from "./Item";
import { useCallback, useEffect } from "react";

export default function CardMes() {
  const { detalhes, toggleDetalhes } = useAppContext();
  const meses = Meses();
  const { user, error, isLoading } = useUser();

  const fetchCompras = useCallback(async () => {
    fetch(`/api/compras/loadInsert?user=${user?.sub}`).then((response) => {
      response.json().then((data) => console.log(data));
    });
  }, []);

  useEffect(() => {
    if (user) {
      fetchCompras();
    }
  }, []);
  return (
    <>
      <Cabecalho />
      {/* Map meses */}
      {detalhes &&
        meses.map((mes) => (
          <>
            <Card fluid>
              <Header as="h2" content={mes.value}>
                <Label ribbon content={mes.value} color="red" />
              </Header>
              <Container>
                <Grid columns="equal">
                  <Grid.Column>
                    <Itens type="Receita" />
                    <Itens type="Despesa" />
                  </Grid.Column>
                  <Grid.Column width={7}>Colna 2</Grid.Column>
                </Grid>
                <Segment floated="right" basic>
                  <Button basic color="green">
                    Receita
                  </Button>
                  <Button basic color="teal" onClick={toggleDetalhes}>
                    Detalhes Mes
                  </Button>
                </Segment>
              </Container>
            </Card>
          </>
        ))}
      {/* end map meses */}
      <DetalhesMes />
    </>
  );
}

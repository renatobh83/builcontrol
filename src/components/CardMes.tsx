import { useUser } from "@auth0/nextjs-auth0";
import { useAppContext } from "../context/AppContext";
interface IPropsComprasuser {
  key: Number;
  value: string;
}
import {
  Grid,
  Card,
  Header,
  Container,
  Label,
  Segment,
  Button,
} from "semantic-ui-react";

import Cabecalho from "./Cabecalho";
import DetalhesMes from "./DetalhesMes";
import Itens from "./Item";
import { useCallback, useEffect } from "react";
import { MesCompras } from "../utils/filterDates";

export default function CardMes() {
  const { detalhes, toggleDetalhes, addCompras, compraUser, setSelectAno } =
    useAppContext();

  return (
    <>
      <Cabecalho />
      {/* Map meses */}
      {!detalhes &&
        compraUser.map((mes) => (
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
      {detalhes && <DetalhesMes />}
    </>
  );
}

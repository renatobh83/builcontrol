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
import ItensRigth from "./RigthItens";
import ItensRigthMobile from "./RigthItensMobile";
import { Meses } from "../utils/meses";
import { groupByCompras } from "../utils/filterDates";

export default function CardMes() {
  const {
    detalhes,
    toggleDetalhes,
    toggleReceita,
    setReceitas,
    titleYear,
    userPurchases,
  } = useAppContext();

  async function receitaAdd(mes) {
    const response = await fetch(
      `/api/receitas/receita?mes=${mes}&ano=${titleYear}`
    );
    const receitas = await response.json();
    // console.log(groupByCompras(receitas, anoAtivo));
    // setReceitas(receitas.data);
    toggleReceita();
  }

  return (
    <>
      <Cabecalho />
      {/* Map meses */}
      {!detalhes &&
        Object.keys(userPurchases).map((mes) => (
          <>
            <Card fluid key={mes}>
              <Header as="h2">
                <Label ribbon content={Meses(mes)} color="red" />
              </Header>
              <Container>
                <Grid columns="equal" padded="vertically">
                  <Grid.Row only="computer tablet">
                    <Grid.Column>
                      <Itens type="Receita" valor={mes} />
                    </Grid.Column>
                    <Grid.Column>
                      <Itens type="Despesa" valor={mes} />
                    </Grid.Column>
                    <Grid.Column>
                      {/* <ItensRigth compras={mes.compra.Compras} /> */}
                    </Grid.Column>
                    <Grid.Column>
                      <Segment basic size="mini">
                        <Button
                          basic
                          color="green"
                          onClick={() => receitaAdd(mes)}
                        >
                          Receita
                        </Button>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment basic size="mini">
                        <Button basic color="teal" onClick={toggleDetalhes}>
                          Detalhes
                        </Button>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                  {/* Grid mobile */}
                  <Grid.Row only="mobile">
                    <Grid.Column>
                      <Itens type="Receita" valor={mes} />
                    </Grid.Column>
                    <Grid.Column>
                      <Itens type="Despesa" valor={mes} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2} only="mobile">
                    {/* <ItensRigthMobile compras={mes.compra.Compras} /> */}
                  </Grid.Row>
                  <Grid.Row only="mobile">
                    <Grid.Column>
                      <Segment basic size="mini">
                        <Button basic color="green" onClick={toggleReceita}>
                          Receita
                        </Button>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment basic size="mini">
                        <Button basic color="teal" onClick={toggleDetalhes}>
                          Detalhes
                        </Button>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Card>
          </>
        ))}
      {/* end map meses */}
      {detalhes && <DetalhesMes />}
    </>
  );
}

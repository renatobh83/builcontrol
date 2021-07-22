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
    setReceitaToForm,
    userPurchases,
    objReceita,
  } = useAppContext();

  async function receitaAdd(mes) {
    if (Object.keys(objReceita).length > 0) {
      if (objReceita[mes]) {
        const receitaMes = objReceita[mes];

        setReceitaToForm(receitaMes);
      } else {
        setReceitaToForm([]);
      }
    }
    toggleReceita();
  }

  return (
    <>
      <Cabecalho />
      {/* Map meses */}
      {!detalhes &&
        Object.keys(userPurchases).map((mes) => (
          <>
            <Card fluid key={mes} raised>
              <Header as="h2">
                <Label ribbon content={Meses(mes)} color="red" />
              </Header>
              <Container>
                <Grid columns="equal" padded="vertically">
                  <Grid.Row only="computer tablet">
                    <Grid.Column width="2" textAlign="center">
                      <Itens type="Receita" valor={mes} />
                    </Grid.Column>
                    <Grid.Column width="2" textAlign="center">
                      <Itens type="Despesa" valor={mes} />
                    </Grid.Column>
                    <Grid.Column width="2" textAlign="center">
                      <Itens type="Resto" valor={mes} />
                    </Grid.Column>

                    <Grid.Column textAlign="center">
                      <ItensRigth listCompra={mes} />
                    </Grid.Column>
                    <Grid.Column width="3">
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
                    <Grid.Column textAlign="center" width="3">
                      <Segment basic size="mini">
                        <Button
                          basic
                          color="teal"
                          value={mes}
                          onClick={toggleDetalhes}
                        >
                          Detalhes
                        </Button>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                  {/* Grid mobile */}
                  <Grid.Row only="mobile">
                    <Grid.Column textAlign="center">
                      <Itens type="Receita" valor={mes} />
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Itens type="Despesa" valor={mes} />
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Itens type="Resto" valor={mes} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2} only="mobile">
                    <ItensRigth listCompra={mes} />
                  </Grid.Row>
                  <Grid.Row only="mobile">
                    <Grid.Column textAlign="center">
                      <Segment basic size="mini">
                        <Button basic color="green" onClick={toggleReceita}>
                          Receita
                        </Button>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Segment basic size="mini">
                        <Button
                          basic
                          color="teal"
                          value={mes}
                          onClick={toggleDetalhes}
                        >
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

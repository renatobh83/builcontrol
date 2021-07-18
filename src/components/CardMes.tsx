import { useUser } from "@auth0/nextjs-auth0";
import { useAppContext } from "../context/AppContext";
interface IPropsComprasuser {
  key: Number;
  value: string;
}
import {
  Grid,
  Divider,
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

export default function CardMes() {
  const { detalhes, toggleDetalhes, compraUser } = useAppContext();

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
                  <Grid.Row only="computer tablet">
                    <Grid.Column width={3}>
                      <Itens type="Receita" decript="" />
                      <Itens
                        type="Despesa"
                        decript={mes.compra.total.$numberDecimal}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <ItensRigth compras={mes.compra.Compras} />
                    </Grid.Column>
                    <Grid.Column>
                      <Segment basic size="mini">
                        <Button basic color="green">
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
                      <Itens type="Receita" decript="" />
                    </Grid.Column>
                    <Grid.Column>
                      <Itens
                        type="Despesa"
                        decript={mes.compra.total.$numberDecimal}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2} only="mobile">
                    <ItensRigthMobile compras={mes.compra.Compras} />
                  </Grid.Row>
                  <Grid.Row only="mobile">
                    <Grid.Column>
                      <Segment basic size="mini">
                        <Button basic color="green">
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
                    {/* <ItensRigth compras={mes.compra.Compras} /> */}
                  </Grid.Row>
                </Grid>
                {/* 
                <Divider />
                <Segment floated="right" basic>
                  <Button basic color="green">
                    Receita
                  </Button>
                  <Button basic color="teal" onClick={toggleDetalhes}>
                    Detalhes Mes
                  </Button>
                </Segment> */}
              </Container>
            </Card>
          </>
        ))}
      {/* end map meses */}
      {detalhes && <DetalhesMes />}
    </>
  );
}

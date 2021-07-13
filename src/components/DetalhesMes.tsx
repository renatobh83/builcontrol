import {
  Segment,
  Label,
  Button,
  Header,
  Container,
  Grid,
} from "semantic-ui-react";
export default function DetalhesMes() {
  return (
    <>
      <Label ribbon color="red" content="Dia Compra" />
      <Segment raised>
        <Grid columns="equal" stackable>
          <Grid.Column>1</Grid.Column>
          <Grid.Column width={3}>
            <Button.Group>
              <Button positive>Editar</Button>
              <Button.Or text="Ou" />
              <Button negative>Apagar</Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}

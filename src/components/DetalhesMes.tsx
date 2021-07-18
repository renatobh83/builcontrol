import {
  Segment,
  Label,
  Button,
  Header,
  Divider,
  Grid,
} from "semantic-ui-react";
export default function DetalhesMes() {
  return (
    <>
      <Label ribbon color="red" content="Dia Compra" />

      <Segment raised>
        <Grid columns="equal">
          <Grid.Row only="mobile">
            <Grid.Column>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              <Divider />
              <Button.Group size="mini">
                <Button positive>Editar</Button>
                <Button.Or text="Ou" />
                <Button negative>Apagar</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only="computer tablet">
            <Grid.Column>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            </Grid.Column>
            <Grid.Column width="5">
              <Button.Group>
                <Button positive>Editar</Button>
                <Button.Or text="Ou" />
                <Button negative>Apagar</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
}

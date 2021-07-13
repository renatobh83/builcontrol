import Router from "next/router";
import { useEffect } from "react";
import {
  Button,
  Grid,
  Header,
  Form,
  Input,
  Segment,
  Divider,
  Container,
  Label,
  Icon,
} from "semantic-ui-react";

export default function Home() {
  useEffect(() => {
    Router.push("/home");
  }, []);
  return (
    <Grid columns={3} centered stackable padded>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Header as="h2" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>Login</Header.Content>
            </Header>
            <Divider />
            <Form widths="equal">
              <Form.Field control={Input} placeholder="E-mail" />
              <Form.Field control={Input} type="password" placeholder="Senha" />
              <Label size="mini" as="a">
                Reset
              </Label>
              <Container textAlign="center">
                <Form.Field control={Button} content="Acessar" />
              </Container>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

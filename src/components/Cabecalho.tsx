import Router from "next/router";
import { Header, Segment, Button, Grid } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";

export default function Cabecalho() {
  const { detalhes, toggleDetalhes } = useAppContext();
  const logout = async () => {
    Router.push("/api/auth/logout");
  };
  return (
    <Segment>
      <Grid columns="equal">
        <Grid.Column>
          {!detalhes && (
            <Button
              icon="arrow left"
              size="tiny"
              basic
              onClick={toggleDetalhes}
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <Header
            as="h2"
            color="black"
            content={detalhes ? "2021" : "Mes"}
            textAlign="center"
          />
        </Grid.Column>
        <Grid.Column>
          {!detalhes ? (
            <Button
              icon="ellipsis vertical"
              size="tiny"
              floated="right"
              basic
            />
          ) : (
            <Button
              icon="sign out"
              size="tiny"
              basic
              floated="right"
              onClick={logout}
            />
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

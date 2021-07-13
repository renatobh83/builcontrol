import { Header, Segment, Button, Grid } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
interface IHeaderProps {
  title: string;
}

export default function Cabecalho() {
  const { detalhes, toggleDetalhes } = useAppContext();

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
            <Button icon="sign out" size="tiny" basic floated="right" />
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

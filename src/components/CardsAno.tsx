import {
  Card,
  Header,
  Button,
  Segment,
  Divider,
  Container,
  Item,
} from "semantic-ui-react";
export default function CardsAno() {
  return (
    <Card fluid>
      <Header as="h3" block content="Janeiro" textAlign="center" />
      <Container>
        <Item.Group unstackable>
          <Item>
            {/* <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
            <Item.Content verticalAlign="middle">
              <Item.Header>Receita</Item.Header>
              <Item.Meta>
                <span className="price">$1200</span>
                <span className="stay">1 Month</span>
              </Item.Meta>
              {/* <Item.Description>{paragraph}</Item.Description> */}
            </Item.Content>
          </Item>
          <Item>
            {/* <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
            <Item.Content>
              <Item.Header>Despesa</Item.Header>
              <Item.Meta>
                <span className="price">$1200</span>
                <span className="stay">1 Month</span>
              </Item.Meta>
              <Item.Description>Description</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>

        <Segment floated="right" basic>
          <Button basic color="green">
            Approve
          </Button>
          <Button basic color="red">
            Decline
          </Button>
        </Segment>
      </Container>
    </Card>
  );
}

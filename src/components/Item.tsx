import { Item, Container } from "semantic-ui-react";
interface IItemProps {
  type: string;
}
export default function Itens({ type }: IItemProps) {
  return (
    <Container fluid>
      <Item.Group unstackable>
        <Item>
          <Item.Content>
            <Item.Header>{type}</Item.Header>
            <Item.Meta>Description</Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
}

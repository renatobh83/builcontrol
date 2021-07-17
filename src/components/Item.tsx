import { Item, Container } from "semantic-ui-react";
interface IItemProps {
  type: string;
}
export default function Itens({ type, decript }: IItemProps) {
  return (
    <Container fluid>
      <Item.Group unstackable>
        <Item>
          <Item.Content>
            <Item.Header>{type}</Item.Header>
            <Item.Meta>{decript}</Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
}

import { Item, Container, Label } from "semantic-ui-react";
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
            <Item.Meta>
              {" "}
              <Label
                color={type === "Despesa" ? "red" : "black"}
                size="medium"
                basic
              >
                {decript}
              </Label>
            </Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
}

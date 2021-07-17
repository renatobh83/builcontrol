import { Item, Container, Label } from "semantic-ui-react";
interface IItemProps {
  type: string;
  decript: string;
}
export default function Itens({ type, decript }: IItemProps) {
  return (
    <Container fluid>
      <Item.Group unstackable>
        <Item>
          <Item.Content>
            <Item.Header>{type}</Item.Header>
            <Item.Meta>
              <Label
                color={type === "Despesa" ? "red" : "black"}
                size="medium"
                basic
              >
                R$
                <Label.Detail>{decript || "0"}</Label.Detail>
              </Label>
            </Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
}

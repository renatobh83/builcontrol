import { format } from "date-fns";
import { Item, Container, Label } from "semantic-ui-react";
interface IItemProps {
  compras: any;
}
export default function ItensRigth({ compras }: IItemProps) {
  console.log(compras);
  return (
    // <Container fluid>
    <Item.Group divided>
      {compras.slice(0, 3).map((compra) => (
        <Item key={compra._id}>
          <Item.Content verticalAlign="middle">
            R$ {compra.valor.$numberDecimal} - {compra.descr} -
            {format(new Date(compra.data), "dd/MM")}
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
    // </Container>
  );
}

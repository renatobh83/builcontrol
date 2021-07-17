import { format } from "date-fns";
import { useEffect } from "react";
import { Item, Container, Label } from "semantic-ui-react";
import { load } from "./Cabecalho";
interface IItemProps {
  compras: any;
}
export default function ItensRigth({ compras }: IItemProps) {
  function sorterData() {
    compras.sort(orderDate);
  }

  load(sorterData());

  return (
    <Container fluid>
      <Item.Group divided>
        {compras.slice(0, 4).map((compra) => (
          <Item.Content key={compra._id}>
            <Item.Meta>
              {format(new Date(compra.data), "dd/MM")} R${" "}
              {compra.valor.$numberDecimal}
            </Item.Meta>
          </Item.Content>
        ))}
      </Item.Group>
    </Container>
  );
}

function orderDate(a: any, b: any) {
  if (a.data > b.data) {
    return -1;
  }
  if (a.data < b.data) {
    return 1;
  }
  return 0;
}

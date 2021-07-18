import { Item, Container, Grid } from "semantic-ui-react";
import { format } from "date-fns";
import { load } from "./Cabecalho";
interface IItemProps {
  compras: any;
}
export default function ItensRigthMobile({ compras }: IItemProps) {
  function sorterData() {
    compras.sort(orderDate);
  }

  load(sorterData());

  return (
    <>
      <Grid.Column>
        {compras.slice(0, 2).map((compra) => (
          <Item.Content key={compra._id}>
            <Item.Meta>
              {format(new Date(compra.data), "dd/MM")} R${" "}
              {compra.valor.$numberDecimal}
            </Item.Meta>
          </Item.Content>
        ))}
      </Grid.Column>
      <Grid.Column>
        {compras.slice(2, 4).map((compra) => (
          <Item.Content key={compra._id}>
            <Item.Meta>
              {format(new Date(compra.data), "dd/MM")} R${" "}
              {compra.valor.$numberDecimal}
            </Item.Meta>
          </Item.Content>
        ))}
      </Grid.Column>
    </>
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

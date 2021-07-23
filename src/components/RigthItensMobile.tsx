import { Item, Grid } from "semantic-ui-react";
import { format } from "date-fns";
import { load } from "./CabecalhoOld";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
interface IItemProps {
  compras: any;
}
export default function ItensRigthMobile({ compras }: IItemProps) {
  const { userPurchases } = useAppContext();
  const [compras, setCompras] = useState([]);

  function sorterData() {
    compras.sort(orderDate);
  }

  useEffect(() => {
    setCompras(userPurchases[listCompra]);
  }, [userPurchases]);
  load(sorterData());

  return (
    <>
      <Grid.Column>
        {compras.slice(0, 2).map((compra) => (
          <Item.Content key={compra._id}>
            <Item.Meta>
              {format(new Date(compra.data), "dd/MM")} R$ {compra.valor}
            </Item.Meta>
          </Item.Content>
        ))}
      </Grid.Column>
      <Grid.Column>
        {compras.slice(2, 4).map((compra) => (
          <Item.Content key={compra._id}>
            <Item.Meta>
              {format(new Date(compra.data), "dd/MM")} R$ {compra.valor}
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

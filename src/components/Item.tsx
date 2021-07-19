import { Item, Label } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
interface IItemProps {
  type: string;
  valor: string;
}
export default function Itens({ type, valor }: IItemProps) {
  const { userPurchases, objReceita } = useAppContext();

  let despesaTotal = 0;
  let receitaTotal = 0;
  if (type === "Despesa") {
    if (valor) {
      userPurchases[valor].map((obj: any) => {
        despesaTotal = despesaTotal + Number(obj.valor.$numberDecimal);
      });
    }
  } else {
    if (objReceita[valor]) {
      objReceita[valor].map((obj: any) => {
        receitaTotal = receitaTotal + Number(obj.valor.$numberDecimal);
      });
    }
  }

  return (
    <Item.Group unstackable>
      <Item>
        <Item.Content>
          <Item.Header>{type}</Item.Header>
          <Item.Meta>
            <Label
              id="noBorder"
              color={type === "Despesa" ? "red" : "black"}
              size="large"
              basic
            >
              <Label.Detail>
                {type === "Despesa" ? despesaTotal : receitaTotal}
              </Label.Detail>
            </Label>
          </Item.Meta>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

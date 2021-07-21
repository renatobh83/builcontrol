import { useEffect, useState } from "react";
import { Item, Label } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";

interface IItemProps {
  type: string;
  valor: string;
}

export default function Itens({ type, valor }: IItemProps) {
  const { userPurchases, objReceita } = useAppContext();
  const [despesa, setDespesa] = useState(0);
  const [receita, setReceita] = useState(0);
  let despesaTotal = 0;
  let receitaTotal = 0;
  useEffect(() => {
    switch (type) {
      case "Despesa":
        userPurchases[valor].forEach((obj: any) => {
          despesaTotal = despesaTotal + Number(obj.valor.$numberDecimal);
          setDespesa(despesaTotal);
        });
        break;
      case "Receita":
        if (objReceita[valor]) {
          objReceita[valor].forEach((obj: any) => {
            receitaTotal = receitaTotal + Number(obj.valor.$numberDecimal);
            setReceita(receitaTotal);
          });
        } else {
          setReceita(0);
        }
      default:
        break;
    }
  }, [objReceita, userPurchases]);

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
                {type === "Despesa" ? despesa.toFixed(2) : receita.toFixed(2)}
              </Label.Detail>
            </Label>
          </Item.Meta>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

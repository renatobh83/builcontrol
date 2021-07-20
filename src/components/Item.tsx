import { useEffect, useState } from "react";
import { Item, Label } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import { groupby } from "../utils/filterDates";
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
  let sobra1 = 0;
  let sobra2 = 0;
  useEffect(() => {
    switch (type) {
      case "Despesa":
        userPurchases[valor].map((obj: any) => {
          despesaTotal = despesaTotal + Number(obj.valor.$numberDecimal);
          setDespesa(despesaTotal);
        });
        break;
      case "Receita":
        if (objReceita[valor]) {
          objReceita[valor].map((obj: any) => {
            receitaTotal = receitaTotal + Number(obj.valor.$numberDecimal);

            setReceita(receitaTotal);
          });
        }
      default:
        break;
    }
  }, [objReceita]);

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
                {type === "Despesa" ? despesa : receita}
              </Label.Detail>
            </Label>
          </Item.Meta>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}
